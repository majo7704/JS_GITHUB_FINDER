/** Initialize Github, new instance
 *
 */
const github = new Github();
/** Initialize UI, new instance
 *
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
 * Search input event listener
 */
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // @ts-ignore
  if (userData.value === '' || userData.value.indexOf('<repos ') == -1) {
    ui.showAlert('Please enter data', 'alert--danger');
    // @ts-ignore
    userData.value = '';
    return;
  }
  // @ts-ignore
  const userValue = userData.value.toLowerCase().split('<repos ');
  let specialChars = '!@#$^%*()+[]{}|:"<>?,.';

  let myUrl = userValue[1];

  for (let i = 0; i < specialChars.length; i++) {
    myUrl = myUrl.replace(new RegExp('\\' + specialChars[i], 'gi'), '');
  }
  /**
   * Usp is the URLSearchParams new object
   */
  const usp = new URLSearchParams(myUrl.replace(' ', '&'));
  /**
   * User name value
   * @type {string}
   */
  const userName = usp.get('data-user');
  /**
   * Repo update
   * @type {string}
   */
  const repoUpdate = usp.get('data-update');

  if (userValue !== '') {
    /**
     * After instanstiating new instance of github - getting user data based on the user name and updated repos
     */
    github.getUser(`${userName}`, `${repoUpdate}`).then((data) => {
      const dateEntered = `${repoUpdate}`;

      if (data.profile.message === 'Not Found') {
        /**
         * Showing alert with a message if no user was found
         */
        ui.showAlert('User not found', 'alert--danger');
      } else {
        /**
         * @type {Object}
         */
        ui.showProfile(data.profile);

        /**
         * Filtering throught fetched repos of the user
         * @returns {Object} - Rendering only fetched repos from github api which are older than the date-update
         */
        const filtered = data.repos.filter((filteredDates) => {
          if (
            Date.parse(
              new Date(filteredDates.updated_at).toLocaleDateString()
            ) >= Date.parse(dateEntered)
          ) {
            return (document.getElementById('profile').innerHTML += `
      <tbody  >
        <tr >
          <td>${filteredDates.name}</td>
          <td>${filteredDates.description}</td>
          <td>${new Date(filteredDates.updated_at).toLocaleDateString(
            'en-GB'
          )}</td>
          <td><a class="btn btn--dark my-1" href="${
            filteredDates.html_url
          }" target="_blank">
            Link
          </a></td>
        </tr>
      </tbody>
    `);
          }
        });
        /**
         * Showing only filtered repos of a user based on the data-user and data-update values
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
