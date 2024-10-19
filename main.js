import './style.css'
import logoBatoi from '/logoBatoi.png'
import Books from './src/model/books.class'
import Users from './src/model/users.class'
import Modules from './src/model/modules.class'

document.querySelector('#app').innerHTML = `
  <div class="contenedor">
    <img src="${logoBatoi}" class="logo" alt="Logo batoi"/>
    <h1>BatoiBooks</h1>
    <p>Abre la consola para ver el resutlado por favor</p>
  </div>
`

const myBooks = new Books();
const myUsers = new Users();
const myModules = new Modules();

await myBooks.populate();
await myUsers.populate();
await myModules.populate();

// Mostrar todos los datos por consola para ver que populate funciona.
// console.log(myBooks.toString());
// console.log(myUsers.toString());
// console.log(myModules.toString());

console.log('Libros del módulo 5021:\n', myBooks.booksFromModule('5021'));
console.log('Libros con estado "new":\n', myBooks.booksWithStatus('new'));