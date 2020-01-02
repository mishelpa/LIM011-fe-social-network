/* eslint-disable no-console */
import { user, getNote } from '../models/model-firebase.js';

export const userActive = () => user();

export const getUser = () => {
  getNote('user')
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc);
        if (doc.id === userActive().uid) {
          document.querySelector('#name-user').textContent = doc.data().name;
          document.querySelector('#name').textContent = doc.data().name;
          document.querySelector('#email').textContent = doc.data().email;
          document.querySelector('#photo').src = doc.data().photoURL;
        }
      });
    });
};
