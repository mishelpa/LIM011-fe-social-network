/* eslint-disable no-console */
import {
  signIn, googleSignIn, facebookSignIng, signOut, addNote,
} from '../models/model-firebase.js';

export const signInUser = (event) => {
 /*  event.preventDefault(); // para detener al action del form (submit) */
  const btnLogin = event.target;
  const email = btnLogin.closest('div').querySelector('[type=email]').value;
  const password = btnLogin.closest('div').querySelector('[type=password]').value;
  const message = btnLogin.closest('div').querySelector('p');
  signIn(email, password)
    .then((newUser) => {
      if (newUser.user.emailVerified !== true) {
        message.innerHTML = 'Es necesario validar tu cuenta, se envio un email de verificacion a tu correo';
      } else {
        window.location.hash = '#/profile';
      }
    })
    .catch((error) => {
      const errorCode = error.code;
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
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };
      addNote('user', user.uid, obj)
        .then(() => {
          window.location.hash = '#/profile';
        });
    }).catch((error) => {
      const errorMessage = error.message;
      console.log('errorMessage: ', errorMessage);
    });
};

export const eventFacebookSignIn = (event) => {
  const btnRegister = event.target;
  const message = btnRegister.closest('div').querySelector('p');
  facebookSignIng()
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      const obj = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };
      window.location.hash = '#/profile';
      addNote('user', user.uid, obj)
        .then(() => {
          window.location.hash = '#/profile';
        });
    }).catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        message.innerHTML = 'La dirección de correo electrónico ya esta en uso';
      }
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
