/* eslint-disable no-undef */

/* eslint-disable max-len */

export const createAuth = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);

export const verificationEmail = () => firebase.auth().currentUser.sendEmailVerification();

export const signIn = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

export const googleSignIn = () => {
  // Crea una instancia del objeto del proveedor de Google.
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export const facebookSignIng = () => {
  // Crea una instancia del objeto del proveedor de Facebook.
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};
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
