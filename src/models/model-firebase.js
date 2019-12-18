/* eslint-disable no-console */

export const createAuth = (email, password) => (
  firebase.auth().createUserWithEmailAndPassword(email, password)
);

export const verificationEmail = () => firebase.auth().currentUser.sendEmailVerification();

export const signIn = (email, password) => (
  firebase.auth().signInWithEmailAndPassword(email, password)
);

export const googleSignIn = () => (
  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
);
// Crea una instancia del objeto del proveedor de Google.

export const facebookSignIng = () => (
  firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
);
// Crea una instancia del objeto del proveedor de Facebook.

// Cerrar Sesion.
export const signOut = () => firebase.auth().signOut();

// Observador - "Estado de autenticación y obtén datos del usuario".
export const observer = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      const displayName = user.displayName;
      const email = user.email;
      const emailVerified = user.emailVerified;
      const photoURL = user.photoURL;
      const isAnonymous = user.isAnonymous;
      const uid = user.uid;
      const providerData = user.providerData;
      console.log('Datos del Usuario:', displayName, email, emailVerified, photoURL, isAnonymous, uid, providerData);
    } else {
      console.log('FIN DE SESIÒN');
    }
  });
};

export const user = () => firebase.auth().currentUser;
export const addNote = (note, objeto) => firebase.firestore().collection(note).add(objeto);
export const getNote = (note) => firebase.firestore().collection(note).get();
