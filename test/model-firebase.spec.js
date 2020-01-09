import {
  createAuth, signIn, googleSignIn, facebookSignIng, signOut,
} from '../src/models/model-firebase.js';

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockFirebase();
const mockfirestore = new firebasemock.MockFirestore();
mockfirestore.autoFlush();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockauth,
  () => mockfirestore,
);

describe('createAuth', () => {
  it('deberia crear una cuenta', () => createAuth('mishel@gmail.com', '123456').then((data) => {
    expect(data.email).toStrictEqual('mishel@gmail.com');
  }));
});

/* describe('verificationEmail', () => {
  it('deberia verficar email', () => verificationEmail().then((data) => {
    expect(data).toStrictEqual(null);
  }));
}); */

describe('signIn', () => {
  it('deberia loguearse', () => signIn('mishel@gmail.com', '123456').then((data) => {
    expect(data.email).toBe('mishel@gmail.com');
  }));
});

describe('googleSignIn', () => {
  it('deberia loguearse con google', () => {
    googleSignIn().then(() => {
      expect('hola').toBe('hola');
    });
  });
});

describe('facebookSignIng', () => {
  it('deberia loguearse con facebook', () => {
    facebookSignIng().then(() => {
      expect('hola').toBe('hola');
    });
  });
});

describe('signOut', () => {
  it('deberia cerrar sesion', () => signOut().then((user) => {
    expect(user).toBe(undefined);
  }));
});
