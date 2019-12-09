export default () => {
    const viewProfile = `
    <p id="">Bienvenido</p>
    `;
    const divElement = document.createElement('div');
    divElement.innerHTML = viewProfile;
    return divElement;
}