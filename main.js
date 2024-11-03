import './style.css';
import logoBatoi from '/logoBatoi.png';
import Controller from './src/controller/controller.class';

document.querySelector('#app').innerHTML = `
  <div class="contenedor">
    <img src="${logoBatoi}" class="logo" alt="Logo batoi"/>
    <h1>BatoiBooks</h1>
  </div>

  <nav>
    <ul>
      <li><a href="#list">Ver Libros</a></li>
      <li><a href="#form">Añadir Libro</a></li>
      <li><a href="#about">Acerca de...</a></li>
    </ul>
  </nav>

  <div id="messages"></div>
  <div id="list"></div>

  <div id="form">
    <div>
      <label for="id-remove">Id:</label>
      <input type="number" id="id-remove">
      <button id="remove">Borrar libro</button>
    </div>

    <form id="bookForm">
      <div>
        <label for="id-module">Módulo:</label>
        <select id="id-module">
          <option>- Selecciona un módulo -</option>
        </select>
      </div>

      <div>
        <label for="publisher">Editorial:</label>
        <input type="text" id="publisher" required>
      </div>

      <div>
        <label for="price">Precio:</label>
        <input type="number" id="price" required>
      </div>

      <div>
        <label for="pages">Páginas:</label>
        <input type="number" id="pages" required>
      </div>

      <div>
        <label>Estado:</label>
        <input type="radio" name="status" value="new" checked required>Nuevo
        <input type="radio" name="status" value="good" required>Bueno
        <input type="radio" name="status" value="bad" required>Malo
      </div>

      <div>
        <label for="comments">Comentarios:</label>
        <textarea id="comments"></textarea>
      </div>

      <button type="submit">Añadir</button>
      <button type="reset">Reset</button>
    </form>
  </div>
`;


document.addEventListener('DOMContentLoaded', () => {
  const myController = new Controller()
  myController.init()
});