/* eslint-disable no-undef */

/* eslint-disable max-len */

export const createAuth = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);

export const verificationEmail = () => firebase.auth().currentUser.sendEmailVerification();

export const signIn = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);
