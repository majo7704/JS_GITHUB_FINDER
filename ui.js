class UI {
  constructor() {
    this.profile = document.getElementById('profile');
  }
  showProfile(user, repos) {
    this.profile.innerHTML += `
      <div class="card all-center">
        <h1>${user.name}</h1>
      </div>
      <thead>
      <tr>
        <th>
          Repo name:
            </th>
        <th>
          Description:
            </th>
        <th data-update="updated_at">
          Updated:
            </th>
        <th>
          Repo link:
            </th>
      </tr>
      </thead >
`;
    repos.forEach((repo) => {
      this.profile.innerHTML += `
      <tbody  >
        <tr >
          <td>${repo.name}</td>
          <td>${repo.description}</td>
          <td>${repo.updated_at}</td>
          <td><a class="btn btn-dark my-1" href="${repo.html_url}" target="_blank">
            Link
          </a></td>
        </tr>
      </tbody>
    `;
    });
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
  // showRepos(repos) {
  //   let output = `
  // <table>
  //   <thead >
  //   <tr>
  //     <th class="th repo_name">
  //       Name:
  //         </th>
  //     <th>
  //       Description:
  //         </th>
  //     <th data-update="updated_at">
  //       Updated:
  //         </th>
  //     <th>
  //       URL
  //         </th>
  //   </tr>
  //   </thead >`;
  //   repos.forEach(function (repo) {
  //     output += `

  //   <tbody>
  //     <tr>
  //       <td>${repo.name}</td>
  //       <td>${repo.description}</td>
  //       <td>${repo.updated_at}</td>
  //       <td><a class="btn btn-dark my-1" href="${repo.html_url}" target="_blank">
  //         Link
  //       </a></td>
  //     </tr>
  //   </tbody>
  //   </table>
  //   `;
  //   });
  //   document.getElementById('repos').innerHTML = output;
  // }
}
