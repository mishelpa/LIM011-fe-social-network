
import { createAuth, verificationEmail, signIn } from '../src/models/model-firebase.js';

describe('createAuth', () => {
  it('debería ser una función', () => {
    expect(typeof createAuth).toBe('function');
  });
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
});
