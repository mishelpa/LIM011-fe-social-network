import changeView from './controllers/route.js';
import { initView } from './models/model-auth.js';

const init = () => {
  window.addEventListener('hashchange', () => changeView(window.location.hash));
  // conexion
  const firebaseConfig = {
    apiKey: 'AIzaSyCwb1kWrtsQ_wwLlJCSYm2hoWNCsKoctA8',
    authDomain: 'codegirl-d7480.firebaseapp.com',
    databaseURL: 'https://codegirl-d7480.firebaseio.com',
    projectId: 'codegirl-d7480',
    storageBucket: 'codegirl-d7480.appspot.com',
    messagingSenderId: '736852159815',
    appId: '1:736852159815:web:260090f906476a7c97f062',
    measurementId: 'G-J9Z1N4JM3H',
  };
  firebase.initializeApp(firebaseConfig);
  // changeView(window.location.hash);
  initView();
};

window.addEventListener('load', init);
