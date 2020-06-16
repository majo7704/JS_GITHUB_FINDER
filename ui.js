class UI {
  constructor() {
    this.profile = document.getElementById('profile');
  }
  showProfile(user) {
    this.profile.innerHTML += `
      <div class="card all-center">
        <h1>${user.name}</h1>
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

  //Show alert
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
    //Timeout after 3000
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  }
  //Clear alet
  clearAlert() {
    const currentAlert = document.querySelector('.alert');
    if (currentAlert) {
      currentAlert.remove();
    }
  }
  //Clear Profile
  clearProfile() {
    this.profile.innerHTML = '';
  }

  //Show repos
  showRepos(repos) {
    this.profile.innerHTML += `
  
    `;
  }
}
