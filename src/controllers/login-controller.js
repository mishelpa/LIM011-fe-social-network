/* eslint-disable no-console */
import {
  signIn, googleSignIn, facebookSignIng, signOut, addNote,
} from '../models/model-firebase.js';

export const signInUser = (event) => {
  event.preventDefault(); // para detener al action del form (submit)

  const btnLogin = event.target;
  const email = btnLogin.closest('div').querySelector('[type=email]').value;
  const password = btnLogin.closest('div').querySelector('[type=password]').value;
  const message = btnLogin.closest('div').querySelector('p');
  signIn(email, password)
    .then((newUser) => {
      console.log('hola:', newUser.user.emailVerified);
      if (newUser.user.emailVerified !== true) {
        message.innerHTML = 'VALIDAR CUENTA - REVISA TU CORREO';
      } else {
        // console.log('ingresaste..', newUser);
        window.location.hash = '#/profile';
      }
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

export const eventGoogleSignIn = () => {
  googleSignIn()
    .then((result) => {
      const user = result.user;
      const obj = {
        Name: user.displayName,
        Email: user.email,
        PhotoURL: user.photoURL,
      };
      window.location.hash = '#/profile';
      addNote('user', obj);
    }).catch((error) => {
      const errorMessage = error.message;
      console.log('errorMessage: ', errorMessage);
    });
};

export const eventFacebookSignIn = () => {
  facebookSignIng()
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      const obj = {
        Name: user.displayName,
        Email: user.email,
        PhotoURL: user.photoURL,
      };
      window.location.hash = '#/profile';
      addNote('user', obj);
    }).catch((error) => {
      console.log('error: ', error);
    });
};

export const eventSignOut = () => {
  signOut()
    .then(() => {
      window.location.hash = '#/';
    }).catch((error) => {
    // An error happened.oto
      console.log(error);
    });
};
