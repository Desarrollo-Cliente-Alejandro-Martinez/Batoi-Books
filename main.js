import './style.css';
import logoBatoi from '/logoBatoi.png';
import Controller from './src/controller/controller.class';

document.querySelector('#app').innerHTML = `
  <header>
    <div class="tittle">
      <img src="${logoBatoi}" class="logo" alt="Logo batoi"/>
      <h1>BatoiBooks</h1>
    </div>
    <nav>
      <ul>
        <li><a href="#list">Ver Libros</a></li>
        <li><a href="#form">Añadir Libro</a></li>
        <li><a href="#about">Acerca de</a></li>
      </ul>
    </nav>
  </header>

  <div id="messages"></div>

  <div id="form">
    <form id="bookForm">
      <h1 id="title-form">Añadir libro</h1>

      <div id="campoID" class="input-container" hidden>
        <label for="id">ID:</label>
        <input type="number" id="id" disabled>
      </div>

      <div class="input-container">
        <label for="id-module">Módulo:</label>
        <select id="id-module" required>
          <option value="">- Selecciona un módulo -</option>
        </select>
      </div>

      <div class="input-container">
        <label for="publisher">Editorial:</label>
        <input type="text" id="publisher" required>
      </div>

      <div class="input-container">
        <label for="price">Precio:</label>
        <input type="number" id="price" step="0.01" min="0" max="300" required>
      </div>

      <div class="input-container">
        <label for="pages">Páginas:</label>
        <input type="number" id="pages" required>
      </div>

      <div class="input-container">
        <label>Estado:</label>
        <div class="radio-buttons">
          <label>
            <input type="radio" name="status" value="new" checked required>
            Nuevo
          </label>
          <label>
            <input type="radio" name="status" value="good" required>
            Bueno
          </label>
          <label>
            <input type="radio" name="status" value="bad" required>
            Malo
          </label>
        </div>
      </div>

      <div class="input-container">
        <label for="comments">Comentarios:</label>
        <textarea id="comments"></textarea>
      </div>

      <div class="form-buttons">
        <button type="submit" id="submitButton">Añadir</button>
        <button type="reset" id="resetButton">Reset</button>
      </div>
    </form>
  </div>

  <div id="list"></div>
  <div id="about">
    <p>&copy; 2024 Alejandro Martínez Jiménez, Batoi 2º GSDAW. Todos los derechos reservados.</p>
    <p> El contenido de este sitio web, incluyendo textos, imágenes y gráficos, está protegido por derechos de autor y es propiedad exclusiva de Alejandro Martínez Jiménez.</p>
  </div>
`;


document.addEventListener('DOMContentLoaded', () => {
  const myController = new Controller()
  myController.init()
});