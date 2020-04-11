import { eventSignOut } from '../controllers/login-controller.js';
import { createPost } from '../controllers/post-controller.js';
import { postView } from './posts.js';

export default (posts) => {
  const viewUser = `
    <header>
      <nav>
      <a class="go-profile" href="#/profile"><li id="">Ir a Inicio</li></a>
      <li id="name-user" class="hide">Inicio</li>
      <li><img class="" src="img/logo6.png" alt="logo CodeGirl" width=120px></li>
      <li id="btn-close">Cerrar Sesion</li>
      </nav>
    </header>
    <div class="body">
        <div class="profile-section">
            <div class="info-user-profile">
                <img id="photo" class="avatar-user-profile" src="" alt="avatar" >
                <p id="name" class="user user-profile"></p>
                <p id="email" class="user-description user-profile"></p>
            </div>
            <div class="statistics">
            <div>
              <span><b>Mis Post Públicos</b></span>
              <span id="qtyPublic">${posts.length}</span>
            </div>
            <div>
              <span><b>Mis Post Privados</b></span>
              <span id="qtyPrivate"></span>
            </div>
            <div>
              <span><b>Likes en mis Posts</b></span>
              <span id="qtyLikes"></span>
            </div>
            </div>
        </div>
        <div class="publications-section">
        <form class="form">
            <textarea class="message-post" id="message-post" cols="30" rows="4" placeholder="¿Que quieres compartir?"></textarea>
            <div class="buttons">
                <div class="file">
                    <label for="file1">
                        <img class="post-image" src="https://img.icons8.com/color/48/000000/image.png">
                    </label>
                    <input id="file1" class="hide" type="file">
                    <div id="input-value" class="input-value"></div>
                </div>
                <select name="status" id="status-post">
                    <option value="publico">Público</option>
                    <option value="privado">Privado</option>
                </select>
                <button id="btn-post" class="btn-post">Compartir</button>
            </div>
        </form>
        <div id="all-publications" class="all-publications">
        </div>
    </div>
            </div>
            
`;
  const divElement = document.createElement('div');
  divElement.innerHTML = viewUser;
  const file = divElement.querySelector('#file1');
  file.addEventListener('change', () => {
    divElement.querySelector('#input-value').innerHTML = file.value.replace(/([^\\]*\\)*/, '');
  });
  const allPublications = divElement.querySelector('#all-publications');
  let publicationPublic = 0;
  let publicationPrivate = 0;
  let likeByUserActive = 0;
  posts.forEach((element) => {
    allPublications.appendChild(postView(element));
    if (element.status ==="publico") publicationPublic += 1;
    if (element.status ==="privado") publicationPrivate += 1;
    likeByUserActive += element.likeEmail.length;
  });
  divElement.querySelector('#qtyPrivate').innerHTML = publicationPrivate;
  divElement.querySelector('#qtyPublic').innerHTML = publicationPublic;
  divElement.querySelector('#qtyLikes').innerHTML = likeByUserActive;
  divElement.querySelector('#btn-close').addEventListener('click', eventSignOut);
  divElement.querySelector('#btn-post').addEventListener('click', createPost);

  return divElement;
};
