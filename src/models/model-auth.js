import changeView from '../controllers/route.js';

export const initView = () => firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    changeView(window.location.hash);
  } else {
    changeView('#/');
  }
});
