import { deleteCommentPublication, updateCommentPublication } from '../controllers/comments-controller.js';

export const commentView = (comment) => {
  const divElement = document.createElement('div');
  const commentInfo = `
  <div class="div-allcomments">
      <div class="div-comment">
          <div class="comment-header">
            <img src="${comment.photo_user}" class="img-user">
            <p id="comment-message-${comment.id}" class="comment-message" contenteditable="false">
              <span class="name-user-comment"><b>${comment.name_user}</b></span>
              <span>${comment.message}</span>
            </p>
            <p class="icons-comment">
              <i id="btn-edit-${comment.id}" class="fas fa-edit icon-post"></i>
              <i id="btn-save-${comment.id}" class="fas fa-save hide icon-post"></i>
              <i id="btn-delete-${comment.id}" class="fas fa-trash-alt icon-post"></i>
            </p>
          </div>
      </div>
    </div>
      `;
  // const allComments = document.querySelector(`#${comment.id_publication}`);
  divElement.innerHTML = commentInfo;
  // allComments.appendChild(divElement);

  const btnDelete = divElement.querySelector(`#btn-delete-${comment.id}`);
  btnDelete.addEventListener('click', () => {
    deleteCommentPublication(comment.id_publication, comment.id);
  });

  const btnEdit = divElement.querySelector(`#btn-edit-${comment.id}`);
  const btnSave = divElement.querySelector(`#btn-save-${comment.id}`);
  const message = divElement.querySelector(`#comment-message-${comment.id}`);
  btnEdit.addEventListener('click', () => {
    message.contentEditable = true;
    message.focus();
    btnEdit.classList.add('hide');
    btnSave.classList.remove('hide');
  });

  btnSave.addEventListener('click', () => {
    message.contentEditable = false;
    const newMessage = message.innerHTML;
    const obj = {
      message: newMessage,
      id_publication: comment.id_publication,
      name_user: comment.name_user,
      photo_user:comment.photoURL
    };
    updateCommentPublication(comment.id_publication, comment.id, obj);
    btnEdit.classList.remove('hide');
    btnSave.classList.add('hide');
  });

  return divElement;
};
