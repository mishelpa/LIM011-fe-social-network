import { createUser } from '../example.js';
export default () => {
    const viewRegister = `
    <input type="email" id="email-register" placeholder="Ingresa tu correo">
    <input type="password" id="password-register" placeholder="Ingresa tu contraseña">
    <button id="btn-register">Registrarme</button>
    <p id="message-reg"></p>
    `;
    const divElement = document.createElement('div');
    divElement.innerHTML = viewRegister;
    return divElement;
}
