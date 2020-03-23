import { eventSignOut } from '../controllers/login-controller.js';
import { createPost } from '../controllers/post-controller.js';
import { postView } from './posts.js';
import {
  editInfo, saveInfo, editUser, saveUser,
} from '../controllers/userProfile-controller.js';
import { user } from '../models/model-firebase.js';

export default (posts) => {
  const viewUser = `
    <header>
        <nav>
        <a class="go-profile" href="#/profile"><li id="">Ir a Inicio</li></a>
        <li id="name-user" class="hide">Inicio</li>
            <li id="btn-close">Cerrar Sesion</li>
        </nav>
    </header>
    <div class="body">
        <div class="user-center">
            <div class="info-user-profile">
                <img id="photo" class="avatar-user-profile" src="" alt="avatar" >
            </div>
            <p id="name" class="user"></p>
            <p id="email" class="user-description"></p>
            <p id="info-user">Agrega una breve descripcion para que las personas sepan mas sobre ti</p>
            <button id="btn-edit-user" class="btn-post">Editar datos</button>
            <button id="btn-save-user" class="btn-post hide" >Guardar</button>
            <button id="btn-edit-info" class="btn-post">Agregar descripción</button>
            <button id="btn-save-info" class="btn-post hide" >Guardar</button>
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
  posts.forEach((element) => {
    allPublications.appendChild(postView(element));
  });
  divElement.querySelector('#btn-close').addEventListener('click', eventSignOut);
  divElement.querySelector('#btn-post').addEventListener('click', createPost);
  divElement.querySelector('#btn-edit-user').addEventListener('click', editUser);
  divElement.querySelector('#btn-save-user').addEventListener('click', () => {
    saveUser(user().uid);
  });
  divElement.querySelector('#btn-edit-info').addEventListener('click', editInfo);
  divElement.querySelector('#btn-save-info').addEventListener('click', () => {
    saveInfo(user().uid);
  });
  return divElement;
};
