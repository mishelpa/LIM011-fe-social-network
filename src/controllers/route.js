
import components from '../views/components.js';

const changeView = (route) => {
  const container = document.querySelector('#container');
  container.innerHTML = '';
  let result;
  switch (route) {
    case '':
    case '#':
    case '#/': {
      result = container.appendChild(components.login());
      break;
    }
    case '#/register': {
      result = container.appendChild(components.register());
      break;
    }
    case '#/profile': {
      result = container.appendChild(components.profile());
      break;
    }
    default:
      break;
  }
  return result;
};

export default changeView;
