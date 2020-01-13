/* eslint-disable consistent-return */

import components from '../views/components.js';
import { showPost, showPostUser, user } from '../models/model-firebase.js';
import { getUser } from './profile-controller.js';

let fnUnsuscribeHome;
let fnUnsuscribeUser;

const changeView = (route) => {
  const container = document.querySelector('#container');
  container.innerHTML = '';
  switch (route) {
    case '':
    case '#':
    case '#/': {
      return container.appendChild(components.login());
    }
    case '#/register': {
      return container.appendChild(components.register());
    }
    case '#/userProfile': {
      fnUnsuscribeHome = showPostUser(user().uid, (arrDeData) => {
        document.querySelector('#container').innerHTML = '';
        container.appendChild(components.userProfile(arrDeData, getUser()));
      });
      fnUnsuscribeUser();
      break;
    }
    case '#/profile': {
      fnUnsuscribeUser = showPost((arrDeData) => {
        document.querySelector('#container').innerHTML = '';
        container.appendChild(components.profile(arrDeData, getUser()));
      });
      fnUnsuscribeHome();
      break;
    }
    default:
      break;
  }
};

export default changeView;
