// eslint-disable-next-line import/no-cycle
import {
  deletePublication, updatePublication, saveLikePublication,
  createComments, showCommentPublication, showLikePublication,
} from '../controllers/post-controller.js';
import { userActive } from '../controllers/profile-controller.js';

/* eslint-disable no-console */
export const postView = (publication) => {
  const divElement = document.createElement('div');
  const postInfo = `
    <div class="div-post">
        <div class="post-header">
            <p>Publicado por 
              <span> ${publication.data().name_user}</span>
            </p>
            <select name="status" id="post-status" disabled>
              <option value="publico">Público</option>
              <option value="privado">Privado</option>
            </select>
            <span class="btn-delete" id="btn-delete">&times;</span>
        </div>
        <div class="post-body">
            <div id="post-message" contenteditable="false">${publication.data().message}</div>
        </div>
        <div class="post-footer">
          <div class ="section-likes">
            <img id="btn-like-${publication.id}" class="icons" src="https://img.icons8.com/flat_round/64/000000/hearts.png">
            <img id="btn-nonlike-${publication.id}" class="icons hide" src="https://img.icons8.com/flat_round/64/000000/hearts.png">
            &nbsp; &nbsp; <p class="count-likes" id="count-likes-${publication.id}"> </p>   
          </div>    
            <img id="btn-commentView" class="icons" src="https://img.icons8.com/doodle/48/000000/filled-topic.png">
            <img id="btn-edit" class="icons" src="https://img.icons8.com/flat_round/64/000000/edit-file.png">
            <img id="btn-save" class="icons hide" src="https://img.icons8.com/cute-clipart/64/000000/save-close.png">
        </div>
        <div id ="comments-section" class="comments-section hide">
          <form class ="form-comment">
            <textarea class="comment-post" id="comment-post" cols="30" rows="2" placeholder="Escribe un comentario"></textarea>
            <img id="btn-comment" class="icons" src="https://img.icons8.com/color/96/000000/telegram-app.png">
          </form> 
          <div class="" id="${publication.id}">   
          </div>
        </div>
    </div>
    `;
  const allPublications = document.querySelector('#all-publications');
  divElement.innerHTML = postInfo;
  allPublications.appendChild(divElement);

  const btnDelete = divElement.querySelector('#btn-delete');
  btnDelete.addEventListener('click', () => {
    deletePublication(publication.id);
  });
  const btnEdit = divElement.querySelector('#btn-edit');
  const btnSave = divElement.querySelector('#btn-save');
  const postMesage = divElement.querySelector('#post-message');
  const postStatus = divElement.querySelector('#post-status');
  // console.log(postStatus.disabled);

  btnEdit.addEventListener('click', () => {
    postMesage.contentEditable = true;
    postStatus.disabled = false;
    postMesage.focus();
    btnEdit.classList.add('hide');
    btnSave.classList.remove('hide');
    console.log('hola');
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

  if (publication.data().id_user !== userActive().uid) {
    btnDelete.classList.add('hide');
    btnEdit.classList.add('hide');
  }
  // console.log(postStatus.value);
  // console.log(postStatus.options[0]);
  if (publication.data().status === 'publico') {
    postStatus.options[0].selected = true;
  } else {
    postStatus.options[1].selected = true;
  }

  const btnLikes = divElement.querySelector(`#btn-like-${publication.id}`);
  // const btnNonLikes = divElement.querySelector('#btn-nonlike');
  btnLikes.addEventListener('click', () => {
    const obj = {
      user: userActive().displayName,
      like: '1',
    };
    saveLikePublication(publication.id, obj, userActive().uid);
  });
  showLikePublication(publication.id);

  const btnCommentView = divElement.querySelector('#btn-commentView');
  const commentSection = divElement.querySelector('#comments-section');
  btnCommentView.addEventListener('click', () => {
    commentSection.classList.toggle('hide');
    showCommentPublication(publication.id);
  });
  const btnComment = divElement.querySelector('#btn-comment');
  btnComment.addEventListener('click', () => {
    const comment = divElement.querySelector('#comment-post').value;
    console.log(comment);
    const user = userActive();
    const obj = {
      message: comment,
      id_publication: publication.id,
      name_user: user.displayName,
    };
    createComments(publication.id, obj);
    divElement.querySelector('#comment-post').value = '';
    showCommentPublication(publication.id);
  });
  return divElement;
};
