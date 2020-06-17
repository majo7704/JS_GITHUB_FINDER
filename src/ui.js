/**
 * Class to create new instance of UI
 * @class
 */
class UI {
  constructor() {
    this.profile = document.getElementById('profile');
  }
  /**
   * @property {Function} - method that renders user name plus header of the table
   * @param {Object} user - User fetched from github api
   */
  showProfile(user) {
    const { name, login } = user;
    this.profile.innerHTML += `
      <div class="card all-center">
        ${user.name !== null ? `<h1>${name}</h1>` : `<h1>${login}</h1>`}
      </div>
    <table>
    <thead >
    <tr>
      <th >
        Name:
          </th>
      <th>
        Description:
          </th>
      <th data-update="updated_at">
        Updated:
          </th>
      <th>
        URL
          </th>
    </tr>
    </thead >
    </table>
`;
  }
  /**
   *Show alert method renders dynamically an alert box with a message based on the className parameter
   * @param {string} message
   * @param {string} className
   */
  showAlert(message, className) {
    //Clear remaining alerts
    this.clearAlert();
    //create div
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    //Add text
    div.appendChild(document.createTextNode(message));
    //Get parent
    const container = document.querySelector('.searchContainer');
    const search = document.querySelector('.form-text');
    container.insertBefore(div, search);
    /**
     * JavaScript method which executes function of removing an alert after 3s
     */
    //Timeout after 3000
    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 3000);
  }
  /**
   * Clear alert method
   */
  clearAlert() {
    const currentAlert = document.querySelector('.alert');
    if (currentAlert) {
      currentAlert.remove();
    }
  }
  /**
   * Clear profile method
   */
  clearProfile() {
    this.profile.innerHTML = '';
  }
  /**
   *Show repos method renders user repos fetched from github api based on the entered data
   * @param {Object} repos
   */
  showRepos(repos) {
    this.profile.innerHTML += `
  
    `;
  }
}
