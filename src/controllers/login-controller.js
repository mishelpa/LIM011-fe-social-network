/* eslint-disable no-console */
import {
  signIn, googleSignIn, facebookSignIng, signOut, observer,
} from '../models/model-firebase.js';

export const signInUser = () => {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const message = document.querySelector('#message-error');
  signIn(email, password)
    .then((newUser) => {
      console.log('hola:', newUser.user.emailVerified);
      if (newUser.user.emailVerified !== true) {
        message.innerHTML = 'VALIDAR CUENTA - REVISA TU CORREO';
      } else {
        // console.log('ingresaste..', newUser);
        window.location.hash = '#/profile';
        observer();
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
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      window.location.hash = '#/profile';
      console.log(result);
      console.log(token);
      console.log(user);
      observer();
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      console.log('errorCode: ', errorCode);
      console.log('errorMessage: ', errorMessage);
      console.log('email: ', email);
      console.log('credential: ', credential);
    });
};

export const eventFacebookSignIn = () => {
  facebookSignIng()
    .then((result) => {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
      window.location.hash = '#/profile';
      console.log('FB result: ', result);
      console.log('FB token: ', token);
      console.log('FB user: ', user);
      observer();
    }).catch((error) => {
      /* // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential; */
      console.log('error: ', error);
    });
};

export const eventSignOut = () => {
  signOut()
    .then(() => {
      window.location.hash = '#/';
      observer();
    }).catch((error) => {
    // An error happened.
      console.log(error);
    });
};
