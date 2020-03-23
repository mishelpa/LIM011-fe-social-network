
import {
  deletePublication, updatePublication,
  createComments, likes, showCommentPublication,
} from '../controllers/post-controller.js';
import { userActive } from '../controllers/profile-controller.js';
import { commentView } from './comments.js';
// import { showComments } from '../models/model-firebase.js';

/* eslint-disable no-console */
export const postView = (publication) => {
  const divElement = document.createElement('div');
  const postInfo = `
    <div class="div-post">
        <div class="post-header">
          <div class="main-header-post">
            <img src="${publication.photo_user}" class="img-user">
            <span class="name-user-publication"><b>${publication.name_user}</b></span>
            <span>
              <i id="btn-edit-${publication.id}" class="fas fa-edit icon-post"></i>
              <i id="btn-save-${publication.id}" class="fas fa-save hide icon-post"></i>
              <i id="btn-delete-${publication.id}" class="fas fa-trash-alt icon-post"></i>
            <span>
          </div>
          <div>
          <span> ${publication.date_post} </span>
          </div>            
        </div>
        <div class="post-body">
            <div id="post-message-${publication.id}" contenteditable="false">${publication.message}</div>
        </div>
        <div class="post-footer">
          <div class ="section-likes">
            <img id="btn-like-${publication.id}" class="icons" src="https://img.icons8.com/flat_round/64/000000/hearts.png">
            <img id="btn-nonlike-${publication.id}" class="icons hide" src="https://img.icons8.com/flat_round/64/000000/hearts.png">
            &nbsp; &nbsp; <p class="count-likes" id="count-likes-${publication.id}">${publication.likeEmail.length}</p>   
          </div>
          <span>    
            <i id="btn-commentView-${publication.id}" class="far fa-comments"></i>
            <span id="commentQty">0</span>
          </span>
            <select name="status" id="post-status-${publication.id}" disabled>
              <option value="publico">Público</option>
              <option value="privado">Privado</option>
            </select>
        </div>
        <div id ="comments-section-${publication.id}" class="comments-section hide">
          <form class ="form-comment">
            <img src="${userActive().photoURL}" class="img-user">
            <textarea class="comment-post" id="comment-post-${publication.id}" cols="30" rows="2" placeholder="Escribe un comentario"></textarea>
            <i id="btn-comment-${publication.id}" class="fas fa-paper-plane"></i>
          </form> 
          <div class="" id="container-${publication.id}">   
          </div>
        </div>
    </div>
    `;
  divElement.innerHTML = postInfo;

  const btnDelete = divElement.querySelector(`#btn-delete-${publication.id}`);
  btnDelete.addEventListener('click', () => {
    deletePublication(publication.id);
  });
  const btnEdit = divElement.querySelector(`#btn-edit-${publication.id}`);
  const btnSave = divElement.querySelector(`#btn-save-${publication.id}`);
  const postMesage = divElement.querySelector(`#post-message-${publication.id}`);
  const postStatus = divElement.querySelector(`#post-status-${publication.id}`);
  // console.log(postStatus.disabled);

  btnEdit.addEventListener('click', () => {
    postMesage.contentEditable = true;
    postStatus.disabled = false;
    postMesage.focus();
    btnEdit.classList.add('hide');
    btnSave.classList.remove('hide');
    console.log(userActive);
  });

  btnSave.addEventListener('click', () => {
    postMesage.contentEditable = false;
    postStatus.disabled = true;
    const newMessage = postMesage.innerHTML;
    const newStatus = postStatus.value;
    const obj = {
      message: newMessage,
      status: newStatus,
    };
    updatePublication(publication.id, obj);
    btnEdit.classList.remove('hide');
    btnSave.classList.add('hide');
    console.log('adios');
  });

  if (publication.id_user !== userActive().uid) {
    btnDelete.classList.add('hide');
    btnEdit.classList.add('hide');
  }
  // console.log(postStatus.value);
  // console.log(postStatus.options[0]);
  if (publication.status === 'publico') {
    postStatus.options[0].selected = true;
  } else {
    postStatus.options[1].selected = true;
  }

  const btnLikes = divElement.querySelector(`#btn-like-${publication.id}`);
  btnLikes.addEventListener('click', () => {
    likes(publication.id, userActive().uid);
  });

  const btnCommentView = divElement.querySelector(`#btn-commentView-${publication.id}`);
  const commentSection = divElement.querySelector(`#comments-section-${publication.id}`);
  btnCommentView.addEventListener('click', () => {
    commentSection.classList.toggle('hide');
  });
  showCommentPublication(publication.id, (data) => {
    const containerComments = divElement.querySelector(`#container-${publication.id}`);
    containerComments.innerHTML = '';
    divElement.querySelector('#commentQty').innerHTML = data.length;
    data.forEach((element) => {
      containerComments.appendChild(commentView(element));
    });
  });
  const btnComment = divElement.querySelector(`#btn-comment-${publication.id}`);
  btnComment.addEventListener('click', () => {
    const comment = divElement.querySelector(`#comment-post-${publication.id}`).value;
    console.log(comment);
    const user = userActive();
    const obj = {
      message: comment,
      id_publication: publication.id,
      name_user: user.displayName,
      photo_user:user.photoURL
    };
    createComments(publication.id, obj);
    divElement.querySelector(`#comment-post-${publication.id}`).value = '';
  });
  return divElement;
};
