//Initialize Github
const github = new Github();
//Initialize UI
const ui = new UI();

//Search input
const form = document.getElementById('form');
const userData = document.getElementById('userData');
const clearBtn = document.getElementById('clear');

//Search input event listener
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (userData.value === '') {
    ui.showAlert('Please enter data', 'alert-danger');
    return;
  }
  const userValue = userData.value.split('<repos ');
  let specialChars = '!@#$^%*()+[]{}|:"<>?,.';

  let myUrl = userValue[1];
  console.log(myUrl);
  //let nextUrl = myUrl.split('&');
  // console.log(nextUrl);
  for (let i = 0; i < specialChars.length; i++) {
    myUrl = myUrl.replace(new RegExp('\\' + specialChars[i], 'gi'), '');
  }
  const usp = new URLSearchParams(myUrl.replace(' ', '&'));

  const userName = usp.get('data-user', 'data-update');
  console.log(userName);
  const repoUpdate = usp.get('data-update');
  console.log(repoUpdate);

  if (userValue !== '') {
    github.getUser(`${userName}`, `${repoUpdate}`).then((data) => {
      const dateEntered = `${repoUpdate}`;

      // const dateArray = data.repos.map(function (el) {
      //   return new Date(el.updated_at).toLocaleDateString();
      // });
      if (data.profile.message === 'Not Found') {
        //show alert
        ui.showAlert('User not found', 'alert-danger');
      } else {
        //Show profile
        ui.showProfile(data.profile);
        const filtered = data.repos.filter((filteredDates, el) => {
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
          <td><a class="btn btn-dark my-1" href="${
            filteredDates.html_url
          }" target="_blank">
            Link
          </a></td>
        </tr>
      </tbody>
    `);
          }
        });
        //show repos
        ui.showRepos(filtered);
        userData.value = '';
      }
    });
  } else {
    ui.clearProfile();
  }
});

clearBtn.addEventListener('click', () => {
  document.getElementById('profile').innerHTML = '';
  userData.value = '';
});
