import { signInUser, eventGoogleSignIn, eventFacebookSignIn } from '../controllers/login-controller.js';

export default () => {
  const viewLogin = `
    <div class="login-register-header flex">
      <img class="login-register-img" src="img/fondo.png" alt="Mujeres programadoras">
    </div>
    <div class="login-register-section flex">
      <form action="">
        <div class="login-register-body flex">
          <img class="" src="img/logo6.png" alt="logo CodeGirl" width=170px>
          <h3>¡Bienvenida, coder!</h3>
          <input class="input-log-reg style" required type="email" placeholder=" Correo"></br>
          <input class="input-log-reg style" required type="password" placeholder=" Contraseña"></br>
          <button class="btn-log-reg style" type="submit" id="btn-enter">Log in</a></button>
          <p id="message-error"></p>
        </div>
        <div class="login-footer flex">
          <p id="">o Ingresa con </p>
          <p>
          <i id="btn-facebook"><img class="icon-network" src="https://img.icons8.com/color/48/000000/facebook-new.png"></i>
          <i id="btn-google"><img class="icon-network" src="https://img.icons8.com/color/48/000000/google-plus--v1.png"></i>
          </p>
          <p>¿No tienes una cuenta? <a href="#/register">Registrate</a></p>
        </div>
      </form>
    </div>
    `;
  const divElement = document.createElement('div');
  divElement.classList.add('login-register');
  divElement.innerHTML = viewLogin;
  divElement.querySelector('.btn-log-reg').addEventListener('click', signInUser);

  const google = divElement.querySelector('#btn-google');
  google.addEventListener('click', eventGoogleSignIn);

  const facebook = divElement.querySelector('#btn-facebook');
  facebook.addEventListener('click', eventFacebookSignIn);

  return divElement;
};
