import { createAuth, verificationEmail, addNote } from '../models/model-firebase.js';

const createUser = (event) => {
  const btnRegister = event.target;
  const name = btnRegister.closest('div').querySelector('[type = text]').value;
  const email = btnRegister.closest('div').querySelector('[type = email]').value;
  const password = btnRegister.closest('div').querySelector('[type = password]').value;
  const message = btnRegister.closest('div').querySelector('p');
  if (email !== '' || password !== '') {
    createAuth(email, password)
      .then((newUser) => {
        verificationEmail();
        const obj = {
          Name: name,
          Email: newUser.user.email,
          PhotoURL: null,
        };
        addNote('user', obj);
        window.location.hash = '#/';
      })
      .catch((error) => {
      // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        switch (errorCode) {
          case 'auth/invalid-email':
            message.innerHTML = 'La dirección de correo electrónico no es valida';
            break;
          case 'auth/email-already-in-use':
            message.innerHTML = 'La dirección de correo electrónico ya esta en uso';
            break;
          case 'auth/weak-password':
            message.innerHTML = 'La contraseña debe tener al menos 6 caracteres.';
            break;
          default:
            message.innerHTML = 'Se produjo un error';
        }
      });
  } else {
    message.innerHTML = 'Ingresar todos los campos';
  }
};

export default createUser;
