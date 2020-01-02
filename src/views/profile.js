import { eventSignOut } from '../controllers/login-controller.js';
import { getUser } from '../controllers/profile-controller.js';
import { observer } from '../models/model-firebase.js';
import { createPost, mostrar } from '../controllers/post-controller.js';


export default () => {
  const viewProfile = `
        <header>
            <nav>
                <li id="name-user">Usuario</li>
                <li id="btn-close">Cerrar Sesion</li>
            </nav>
        </header>
        <div class="body">
            <div class="profile-section">
                <img class="cover-page" src="/img/fondo.jpg" alt="portada">
                <div class="info-user">
                    <img id="photo" class="avatar" src="" alt="avatar" >
                    <div>
                        <p id="name" class="user" ></p>
                        <p id="email" class="user-description"></p>
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
  divElement.innerHTML = viewProfile;
  const file = divElement.querySelector('#file1');
  file.addEventListener('change', () => {
    divElement.querySelector('#input-value').innerHTML = file.value.replace(/([^\\]*\\)*/, '');
  });

  divElement.querySelector('#btn-close').addEventListener('click', eventSignOut);
  getUser();
  observer();
  divElement.querySelector('#btn-post').addEventListener('click', createPost);
  mostrar();
  return divElement;
};
