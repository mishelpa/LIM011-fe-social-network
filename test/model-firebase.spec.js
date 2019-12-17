import MockFirebase from '../src/mockFirebase.js';

import {
  createAuth, verificationEmail, signIn, googleSignIn, facebookSignIng, signOut, observer,
} from '../src/models/model-firebase.js';


global.firebase = MockFirebase();

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

describe('observer', () => {
  it('debería ser una función', () => {
    expect(typeof observer).toBe('function');
  });
});
