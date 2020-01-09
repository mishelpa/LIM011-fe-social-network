import changeView from './controllers/route.js';
import { initView } from './models/model-auth.js';

const init = () => {
  window.addEventListener('hashchange', () => changeView(window.location.hash));
  // conexion
  const firebaseConfig = {
    apiKey: 'AIzaSyC9Lzk9hVLj0qZ17AWjwis0l1B3uyQN8lg',
    authDomain: 'codegirl011.firebaseapp.com',
    databaseURL: 'https://codegirl011.firebaseio.com',
    projectId: 'codegirl011',
    storageBucket: 'codegirl011.appspot.com',
    messagingSenderId: '842165782313',
    appId: '1:842165782313:web:fc7f4b364affd66c55d938',
  };
  firebase.initializeApp(firebaseConfig);
  initView();
};

window.addEventListener('load', init);
