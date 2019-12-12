
import { createAuth } from '../src/models/model-firebase.js';

describe('example', () => {
  it('debería ser una función', () => {
    expect(typeof createAuth).toBe('function');
  });
});
