// Register
export const createAuth = (email, password) => (
  firebase.auth().createUserWithEmailAndPassword(email, password)
);

//Log In
export const signIn = (email, password) => (
  firebase.auth().signInWithEmailAndPassword(email, password)
);

export const googleSignIn = () => (
  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
);

export const facebookSignIng = () => (
  firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
);

export const user = () => firebase.auth().currentUser;

//Log Out
export const signOut = () => firebase.auth().signOut();

//CRU user
export const addNote = (note, id, obj) => firebase.firestore().collection(note).doc(id).set(obj);
export const getNote = (note) => firebase.firestore().collection(note).get();
export const updateNote = (id, doc) => firebase.firestore().collection('user').doc(id).update(doc);

//CRUD post
export const addPost = (nameCollection, obj) => (
  firebase.firestore().collection(nameCollection).add(obj)
);

export const showPost = (callback) => firebase.firestore().collection('post').where('status', '==', 'publico').orderBy('date_post', 'desc')
  .onSnapshot((querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    callback(data);
  });

export const showPostUser = (id, callback) => firebase.firestore().collection('post').where('id_user', '==', id).orderBy('date_post', 'desc')
  .onSnapshot((querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    callback(data);
  });

export const updatePost = (ide, obj) => firebase.firestore().collection('post').doc(ide).update(obj);

export const deletePost = (ide) => firebase.firestore().collection('post').doc(ide).delete();

//CRUD comments
export const addComments = (idPost, obj) => firebase.firestore().collection('post').doc(idPost).collection('comments')
  .add(obj);

export const showComments = (idPost, show) => firebase.firestore().collection('post').doc(idPost).collection('comments')
  .onSnapshot((querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    show(data);
  });

export const updateComment = (idPost, id, obj) => firebase.firestore().collection('post').doc(idPost).collection('comments')
  .doc(id)
  .update(obj);

export const deleteComment = (idPost, id) => firebase.firestore().collection('post').doc(idPost).collection('comments')
  .doc(id)
  .delete();












export const getLike = (id) => firebase.firestore().collection('post').doc(id).get();
// Agregar Array.
export const addEleArray = (idPost, emailUser) => (
  firebase.firestore().collection('post').doc(idPost)
    .update({ likeEmail: firebase.firestore.FieldValue.arrayUnion(emailUser) })
);

// Eliminar Array.
export const deleteEleArray = (idPost, emailUser) => (
  firebase.firestore().collection('post').doc(idPost)
    .update({ likeEmail: firebase.firestore.FieldValue.arrayRemove(emailUser) })
);
