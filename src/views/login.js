export default () => {
    const viewLogin = `
      <div class="login-header">
        <figure>
          <img class="login-img" src="../src/img/fondo.jpg" alt="">
        </figure>
      </div>
      <div class="login-section">
      <div class="login-body">
          <input type="email" id="email" placeholder="Ingresa tu correo"></br>
          <input type="password" id="password" placeholder="Ingresa tu contraseña">
          <button id="btn-enter"><a href="#/profile">Ingresar</a></button>
          <p id="message-error"></p>
      </div>
      <div class="login-footer">
          <ul>
            <li>
              <a href="">Facebook</a>
            </li>
            <li>
                <a href="">Gmail</a>
              </li>
            </ul>   
          <p><a href="">¿Olvidaste tu contraseña?</a></p>
          <p>¿No tienes una cuenta?<a href="#/register">Registrate</a></p>
      </div>
      </div>
    `;
    const divElement = document.createElement('div');
    divElement.classList.add('view-login-flex');
    divElement.innerHTML = viewLogin;
    return divElement;
}