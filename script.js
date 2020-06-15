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
  const userValue = userData.value.split('<repos ');
  let specialChars = "!@#$^%*()+[]/{}|:'<>?,.";

  let myUrl = userValue[1];
  //let nextUrl = myUrl.split('&');
  // console.log(nextUrl);
  for (let i = 0; i < specialChars.length; i++) {
    myUrl = myUrl.replace(new RegExp('\\' + specialChars[i], 'gi'), '');
  }
  const usp = new URLSearchParams(myUrl);

  const userName = usp.get('data-user', 'data-update');
  console.log(userName);
  const repoUpdate = usp.get('data-update');
  console.log(repoUpdate);

  // // Display the key/value pairs
  // for (let pair of usp.entries()) {
  //   console.log(pair[0] + ', ' + pair[1]);
  // }

  // for (const [key, value] of usp) {
  //   console.log(`${key}=${value}`);
  // }
  // console.log(usp.toString());

  if (userValue !== '') {
    github.getUser(`${userName}`, `${repoUpdate}`).then((data) => {
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

clearBtn.addEventListener('click', () => {
  document.getElementById('profile').innerHTML = '';
  userData.value = '';
});
