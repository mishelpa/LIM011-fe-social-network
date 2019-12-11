import { components} from '../views/components.js'
export const changeView = (route) => {
    const container = document.querySelector('#container');
    container.innerHTML='';
    switch (route) {
        case '':
        case '#':
        case '#/': { return container.appendChild(components.login())}
        case '#/register': { return container.appendChild(components.register())}
        case '#/profile': { return container.appendChild(components.profile())}
        default:
            break;
    }
}