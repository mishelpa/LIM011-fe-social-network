/* eslint-disable no-console */
import { user, getNote } from '../models/model-firebase.js';

export const userActive = () => user();

export const getUser = () => {
  getNote('user')
    .then((querySnapshot) => {
      console.log(user().uid);
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        if (doc.data().email === user().email) {
          document.querySelector('#name').textContent = doc.data().name;
          document.querySelector('#email').textContent = doc.data().email;
          document.querySelector('#photo').src = doc.data().photoURL;
        }
      });
    });
};
