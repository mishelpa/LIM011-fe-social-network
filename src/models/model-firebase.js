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
export const addNote = (note, id, obj) => firebase.firestore().collection(note).doc(id).set(obj);
export const getNote = (note) => firebase.firestore().collection(note).get();

export const addPost = (nameCollection, obj) => (
  firebase.firestore().collection(nameCollection).add(obj)
);
export const showPost = () => firebase.firestore().collection('prueba');
export const deletePost = (ide) => firebase.firestore().collection('prueba').doc(ide).delete();
export const updatePost = (ide, obj) => firebase.firestore().collection('prueba').doc(ide).update(obj);

export const saveLikes = (idPost, obj, ide) => firebase.firestore().collection('prueba').doc(idPost).collection('likes')
  .doc(ide)
  .set(obj);
export const showLikes = (idPost) => firebase.firestore().collection('prueba').doc(idPost).collection('likes');

export const addComments = (idPost, obj) => firebase.firestore().collection('prueba').doc(idPost).collection('comments')
  .add(obj);
