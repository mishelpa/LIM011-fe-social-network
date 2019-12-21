import { eventSignOut } from '../controllers/login-controller.js';
import { getUser } from '../controllers/profile-controller.js';
import { observer } from '../models/model-firebase.js';


export default () => {
  const viewProfile = `
        <header>
            <nav>
                <li>Usuario</li>
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
                        <p id="email"></p>
                    </div>
                </div>
            </div>
            <div class="publications-section">
                <form action="">
                    <input type="text" placeholder="¿Que quieres compartir?">
                    <div class="buttons">
                        <button><img src="https://img.icons8.com/android/24/000000/picture.png"></button>
                        <button>Compartir</button>
                    </div>
                </form>
                <div></div>
                <p>Aqui las publicaciones</p>
            </div>
        </div>
    `;
  const divElement = document.createElement('div');
  divElement.innerHTML = viewProfile;

  divElement.querySelector('#btn-close').addEventListener('click', eventSignOut);
  getUser();
  observer();
  return divElement;
};
