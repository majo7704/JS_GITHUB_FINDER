//Initialize Github
const github = new Github();
//Initialize UI
const ui = new UI();

//Search input
const form = document.getElementById('form');
const userData = document.getElementById('userData');
const clearBtn = document.getElementById('clear');

// window.onload = getQueryVariable = () => {
//   let url_string = window.location.href.toLowerCase();
//   let url = new URL(url_string);
//   let name = url.searchParams.get('q').search('data-user');

//   console.log(name);
// };
//Search input event listener
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const userValue = userData.value;

  const queryStr = userValue;
  const usp = new URLSearchParams(queryStr);

  const userName = usp.get('data-user');
  const updateAt = usp.get('data-update');
  console.log(`${userName} ${updateAt}`);

  for (const [key, value] of usp) {
    console.log(`${key}=${value}`);
  }
  console.log(usp.toString());

  // const paramValue = getQueryVariable('data-user');
  if (userValue !== '') {
    github.getUser(`${userName}`).then((data) => {
      if (data.profile.message === 'Not Found') {
        //show alert
        ui.showAlert('User not found', 'btn-light');
      } else {
        //show profile
        ui.showProfile(data.profile, data.repos);
      }
    });
  } else {
    ui.clearProfile();
  }
});
// form.addEventListener('submit', (e) => {
//   let userValue = userData.value;
//   if (userValue !== '') {
//     let user_data = userValue.find('data-user'.value);
//     let update_data = userValue.find('data-update'.value);
//     github.getRepos(user_data, update_data).then((data) => {
//       ui.showRepos(data.repos);
//     });
//   }
// });

clearBtn.addEventListener('click', () => {
  document.getElementById('profile').innerHTML = '';
  userData.value = '';
});
