// @ts-nocheck
/**
 * Initialize Github, new instance
 * See {@link Github}
 */
const github = new Github();
/**
 * Initialize UI, new instance
 * See {@link UI}
 */
const ui = new UI();

/**
 * Search form variables
 *@type {Object}
 */
const form = document.getElementById('form');
const userData = document.getElementById('userData');
const clearBtn = document.getElementById('clear');

/**
 * Function isValidDate that verifies the validity of date entered by user in date-attribute; Used during the form submition
 */
function isValidDate(dateString) {
  /**
   * First check for the pattern
   */
  let regex_date = /^\d{4}\-\d{1,2}\-\d{1,2}$/;

  if (!regex_date.test(dateString)) {
    return false;
  }
  /**
   * Parse the date parts to integers
   */
  let parts = dateString.split('-');
  let day = parseInt(parts[2], 10);
  let month = parseInt(parts[1], 10);
  let year = parseInt(parts[0], 10);
  /**
   * Check the ranges of month and year
   */
  if (year < 1000 || year > 3000 || month == 0 || month > 12) {
    return false;
  }
  let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  /**
   * Adjust for leap years
   */
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
    monthLength[1] = 29;
  }
  /**
   * Check the range of the day
   */
  return day > 0 && day <= monthLength[month - 1];
}

/**
 * Search input event listener which will fetch profile and repos data from the API and output them to the DOM.
 */
form.addEventListener('submit', (e) => {
  e.preventDefault();
  /**
   * Checking if the search value is not empty and if the string <repos exists, otherwise show alert
   */
  // @ts-ignore
  if (!userData.value.trim() || userData.value.indexOf('<repos ') == -1) {
    ui.showAlert('Please enter data', 'alert--danger');
    // @ts-ignore
    userData.value = '';
    return;
  }
  /**
   * Spliting a string into an array of substrings and returning new array userValue
   */
  // @ts-ignore
  const userValue = userData.value.toLowerCase().split('<repos ');
  /**
   * Substring with index 1 has been clean up by replacing all special characters with nothing.
   */
  let specialChars = '!@#$^%*()+[]{}|:"<>?,.';
  let myUrl = userValue[1];
  for (let i = 0; i < specialChars.length; i++) {
    myUrl = myUrl.replace(new RegExp('\\' + specialChars[i], 'gi'), '');
  }
  /**
   * Usp is the URLSearchParams new object(entered code is treated as params to pull out needed values)
   */
  const usp = new URLSearchParams(myUrl.replace(' ', '&'));
  /**
   * User name value
   * @type {string}
   */
  const userName = usp.get('data-user');
  /**
   * Repo update value
   * @type {string}
   */
  const repoUpdate = usp.get('data-update');

  if (userValue !== '') {
    /**
     * After instanstiating the new instance of github - getting user data based on values of user name and updated repos
     * See {@link Github}
     */
    github.getUser(`${userName}`, `${repoUpdate}`).then((data) => {
      const dateEntered = `${repoUpdate}`;

      if (data.profile.message === 'Not Found') {
        /**
         * Showing alert with a message if no user was found
         */
        ui.showAlert('User not found', 'alert--danger');
        userData.value = '';
      } else {
        /** Rendering profile data by using method of UI class
         * See {@link UI}
         * @type {Object}
         */
        ui.showProfile(data.profile);

        /**
         * Checking for validity of a date in date-update attribute
         */
        if (!isValidDate(dateEntered)) {
          ui.showAlert(
            'Please enter correct date yyyy-mm-dd ',
            'alert--danger'
          );
          return;
        }

        /**
         * Filtering throught fetched repos of the user
         * @returns {Object} - Rendering only fetched repos from github api which are older than the date-update
         */
        const filtered = data.repos.filter((filteredDates) => {
          const { name, description, updated_at, html_url } = filteredDates;
          /**
           * Formating dates and parsing them to miliseconds which allows to
           * compare the dates; The code below uses build-in function of
           * date-fns library to format date and to check if the repos were
           * updated after the date-update attribute-
           * const formatFilteredDates = dateFns.format(
           * filteredDates.updated_at,'YYYY-MM-DD')
           * if (dateFns.isAfter(formatFilteredDates, dateEntered)) {}
           */

          if (
            Date.parse(
              new Date(filteredDates.updated_at).toLocaleDateString('en-US')
            ) >= Date.parse(dateEntered)
          ) {
            return (document.getElementById('profile').innerHTML += `
      <tbody  >
        <tr >
          <td>${name}</td>
          <td>${description}</td>
          <td>${dateFns.format(new Date(updated_at), 'YYYY-MM-DD')}</td>
          <td><a class="btn btn--dark my-1" href="${html_url}" target="_blank">
            Link
          </a></td>
        </tr>
      </tbody>
    `);
          }
        });
        /**
         * Rendering only filtered repos of a user based on the data-user and data-update values
         * See {@link UI}
         */
        ui.showRepos(filtered);
        // @ts-ignore
        userData.value = '';
      }
    });
  } else {
    ui.showAlert('Please enter data correctly', 'alert--danger');
    ui.clearProfile();
  }
});
/**
 * Event listener that cleares the fetched profiles and repos
 */
clearBtn.addEventListener('click', () => {
  document.getElementById('profile').innerHTML = '';
  // @ts-ignore
  userData.value = '';
});
