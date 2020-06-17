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
      } else {
        /** Rendering profile data by using method of UI class
         * See {@link UI}
         * @type {Object}
         */
        ui.showProfile(data.profile);

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
           * updated after the date-update attribute
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

clearBtn.addEventListener('click', () => {
  document.getElementById('profile').innerHTML = '';
  // @ts-ignore
  userData.value = '';
});
