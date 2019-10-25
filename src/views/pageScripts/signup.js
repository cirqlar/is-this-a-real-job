/* eslint-disable no-console */
/* eslint-disable no-undef */

if (
  localStorage.getItem('token') !== 'undefined'
  && localStorage.getItem('token')
) {
  window.location.href = '/jobInvites';
}

function togglePreloader(state) {
  const preloader = document.querySelector('#cover');
  preloader.style.display = state;
}

const signupForm = document.forms.signup;
const signupBtn = document.querySelector('#signup-btn');
const notification = document.querySelector('.notification');
signupBtn.addEventListener('click', e => {
  e.preventDefault();
  togglePreloader('block');

  const formData = {};

  for (let i = 0; i < signupForm.length; i++) {
    formData[signupForm[i].name] = signupForm[i].value;
  }

  const api = new ItarjApi('/api/v1');

  api
    .Post('auth/signup', JSON.stringify(formData))
    .then(res => {
      console.log(res);
      togglePreloader('none');
      localStorage.setItem('token', res.data.token);
      window.location.href = '/jobInvites';
    })
    .catch(error => {
      togglePreloader('none');
      notification.innerHTML = error.data.message;
      notification.className += ' show';
      setTimeout(() => {
        notification.className = 'notification';
      }, 5000);
    });
});
