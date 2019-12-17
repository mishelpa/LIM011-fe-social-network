/* eslint-disable no-console */
import { user } from '../models/model-firebase.js';

export const userActive = () => user();

/* import { addNote, user, getNote } from '../models/model-firebase.js'; */

/*
export const addUser = () => {
  const name = document.querySelectorAll('#email');
  const note = 'user';
  addNote(note, userData())
    .then((docRef) => {
      console.log('usuario registrado con ID: ', docRef.id);
      name.innerHTML = user.displayName;
      getNote(note)
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (docRef.id === doc.id) {
              console.log(`${doc.id} => ${doc.data().Name}`);
              document.querySelector('#name').textContent = doc.data().Name;
              document.querySelector('#email').textContent = doc.data().Email;
              document.querySelector('#photo').src = doc.data().PhotoURL;
              window.location.hash = '#/profile';
            }
          });
        });
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};
 */
