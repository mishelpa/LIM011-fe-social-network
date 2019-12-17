import { eventSignOut } from '../controllers/login-controller.js';
import { userActive } from '../controllers/profile-controller.js';

export default () => {
  const viewProfile = `
    <div class="login-register-header flex">
      <div id = "name">${userActive().displayName}</div>
      <div id = "email">${userActive().email}</div>
      <img class="login-register-img" src="${userActive().photoURL}" id = "photo" alt="foto de perfil" width=70px>
    </div>
    <div class="login-register-section flex">
    <div class="login-register-body flex">
    <button class="btn-log-reg style" id="btn-close">Cerrar Sesion</button>
    </div>
    <div class="register-footer flex">
      <p class >modo prueba<p>
    </div>
  </div>
    `;
  const divElement = document.createElement('div');
  divElement.innerHTML = viewProfile;

  divElement.querySelector('#btn-close').addEventListener('click', eventSignOut);

  return divElement;
};
