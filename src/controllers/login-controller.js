/* eslint-disable no-console */
import { signIn } from '../models/model-firebase.js';

export const signInUser = () => {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const message = document.querySelector('#message-error');
  signIn(email, password)
    .then(() => {
      window.location.hash = '#/profile';
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      console.log(errorCode);
      switch (errorCode) {
        case 'auth/wrong-password':
          message.innerHTML = 'La contraseña es invalida o el usuario no tiene una contraseña';
          break;
        case 'auth/user-not-found':
          message.innerHTML = 'No hay registro de usuario correspondiente a este identificador. El usuario puede haber sido eliminado';
          break;
        case 'auth/invalid-email':
          message.innerHTML = 'La dirección de correo electrónico no es valida';
          break;
        default:
          message.innerHTML = 'Se produjo un error';
      }
    });
};
