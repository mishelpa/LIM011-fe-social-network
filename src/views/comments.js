import { deleteCommentPublication, updateCommentPublication } from '../controllers/comments-controller.js';

export const commentView = (comment) => {
  const divElement = document.createElement('div');
  const commentInfo = `
  <div class="div-allcomments">
      <div class="div-comment">
          <div class="comment-header">
                <span>${comment.name_user}</span>
                <img id="btn-edit-${comment.id}" class="icons" src="https://img.icons8.com/flat_round/64/000000/edit-file.png">
                <img id="btn-save-${comment.id}" class="icons hide" src="https://img.icons8.com/cute-clipart/64/000000/save-close.png">
                <span class="btn-delete" id="btn-delete-${comment.id}">&times;</span>
          </div>
          <div class="comment-body">
              <p id="comment-message-${comment.id}" class="comment-message" contenteditable="false">${comment.message}</p>
          </div>
      </div>
    </div>
      `;
  const allComments = document.querySelector(`#${comment.id_publication}`);
  divElement.innerHTML = commentInfo;
  allComments.appendChild(divElement);

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
    };
    updateCommentPublication(comment.id_publication, comment.id, obj);
    btnEdit.classList.remove('hide');
    btnSave.classList.add('hide');
  });

  return divElement;
};
