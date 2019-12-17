
const auth1 = () => ({
  createUserWithEmailAndPassword: (email1, password1) => new Promise((resolve) => {
    resolve({
      email: email1,
      password: password1,
    });
  }),

  signInWithEmailAndPassword: (email1, password1) => new Promise((resolve) => {
    resolve({
      email: email1,
      password: password1,
    });
  }),

  signOut: () => new Promise((resolve) => {
    resolve('Fin de sesion');
  }),
});

const firebase = {
  auth: auth1,
};

export default jest.fn(() => firebase);
