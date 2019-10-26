/* eslint-disable no-undef */


function togglePreloader(state) {
  const preloader = document.querySelector('#cover');
  preloader.style.display = state;
}

const commentBtn = document.querySelector('.comment-btn button');

if (commentBtn) {
  if (!localStorage.getItem('token')) {
    window.location.href = '/login';
  }

  const api = new ItarjApi('/api/v1');
  const commentField = document.querySelector('#comment-field');
  const commentCount = document.querySelector('#comment-count');
  const comments = document.querySelector('#comments');
  const postMeta = document.querySelector('.post-meta');
  const noComment = document.querySelector('#no-comments');

  const inviteId = postMeta ? postMeta.id : null; // invite id

  const getCommentHTML = (comment) => `<div class="container">
  <p>@${comment.user.username}</p>
  <p>${comment.body}</p> <span>&nbsp;</span>

  <span class="float-right share-icons">
    <a href="#"><i class="fab fa-facebook-f"></i></i></a>
    <a href="https://www.twitter.com/"><i class="fab fa-twitter"></i></a>
    <a href="https://www.instagram.com/"><i class="fab fa-instagram"></i></a>
    <a href="#"><i class="fab fa-whatsapp"></i></a>
  </span>
</div>`;

  commentBtn.addEventListener('click', e => {
    e.preventDefault();
    togglePreloader('block');

    const body = {
      body: commentField.value
    };
    const notification = document.querySelector('.notification');

    api.Post(`comments/${inviteId}`, JSON.stringify(body), true)
      .then(res => {
        comments.innerHTML = getCommentHTML(res.data) + comments.innerHTML;
        noComment.innerHTML = '';

        commentCount.textContent = Number(commentCount.textContent) + 1;
        togglePreloader('none');
      })
      .catch(err => {
        togglePreloader('none');
        notification.innerHTML = `<strong>${err.data.message}:</strong> ${err.data.payload}`;
        notification.className += ' show';
        setTimeout(() => {
          notification.className = 'notification';
        }, 5000);
        console.error(err.data);
      });
  });
}
