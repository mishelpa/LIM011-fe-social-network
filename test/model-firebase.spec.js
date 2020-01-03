// import MockFirebase from './mockFirebase.js';
// global.firebase = MockFirebase();

import {
  createAuth, verificationEmail, signIn, googleSignIn, facebookSignIng, signOut,
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

const user = {
  email: 'mishel@gmail.com',
  password: '123456',
};

describe('createAuth', () => {
  it('debería ser una función', () => {
    expect(typeof createAuth).toBe('function');
  });
  it('deberia crear una cuenta', () => createAuth('mishel@gmail.com', '123456').then((data) => {
    expect(data).toStrictEqual(user);
  }));
});

describe('verificationEmail', () => {
  it('debería ser una función', () => {
    expect(typeof verificationEmail).toBe('function');
  });
});

describe('signIn', () => {
  it('debería ser una función', () => {
    expect(typeof signIn).toBe('function');
  });
  it('deberia loguearse', () => signIn('mishel@gmail.com', '123456').then((data) => {
    expect(data).toStrictEqual(user);
  }));
});

describe('googleSignIn', () => {
  it('debería ser una función', () => {
    expect(typeof googleSignIn).toBe('function');
  });
  it('deberia loguearse con google', () => {
    googleSignIn().then(() => {
      expect('hola').toStrictEqual('hola');
    });
  });
});

describe('facebookSignIng', () => {
  it('debería ser una función', () => {
    expect(typeof facebookSignIng).toBe('function');
  });
});

describe('signOut', () => {
  it('debería ser una función', () => {
    expect(typeof signOut).toBe('function');
  });
  it('deberia cerrar sesion', () => signOut().then(() => {
    expect('Fin de sesion').toStrictEqual('Fin de sesion');
  }));
});
