import { eventSignOut } from '../controllers/login-controller.js';

export default () => {
  const viewProfile = `
    <p id="">Bienvenido</p>
    <button class="btn-log-reg style" id="btn-close">Cerrar Sesion</button>
    <img src="" alt="">
    `;
  const divElement = document.createElement('div');
  divElement.innerHTML = viewProfile;

  divElement.querySelector('#btn-close').addEventListener('click', eventSignOut);

  return divElement;
};
