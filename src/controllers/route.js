/* eslint-disable consistent-return */

import components from '../views/components.js';
import { showPost, showPostUser, user } from '../models/model-firebase.js';
import { getUser } from './profile-controller.js';

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
      return showPostUser(user().uid, (arrDeData) => {
        document.querySelector('#container').innerHTML = '';
        container.appendChild(components.userProfile(arrDeData, getUser()));
      });
    }
    case '#/profile': {
      return showPost((arrDeData) => {
        document.querySelector('#container').innerHTML = '';
        container.appendChild(components.profile(arrDeData, getUser()));
      });
    }
    default:
      break;
  }
};

export default changeView;
