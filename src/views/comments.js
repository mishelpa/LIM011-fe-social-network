/* eslint-disable no-console */
export const commentView = (comment) => {
  const divElement = document.createElement('div');
  const commentInfo = `
      <div class="div-comment">
          <div class="comment-header">
                <span>${comment.data().name_user}</span>
                <span class="btn-delete" id="btn-delete">&times;</span>
                <img id="btn-edit" class="icons" src="https://img.icons8.com/flat_round/64/000000/edit-file.png">
                <img id="btn-save" class="icons hide" src="https://img.icons8.com/cute-clipart/64/000000/save-close.png">
          </div>
          <div class="post-body">
              <p id="post-message" contenteditable="false">${comment.data().message}</p>
          </div>
      </div>
      `;
  const allComments = document.querySelector(`#${comment.data().id_publication}`);
  divElement.innerHTML = commentInfo;
  allComments.appendChild(divElement);

  return divElement;
};
