import './style.css'
import logoBatoi from '/logoBatoi.png'
import data from './src/services/datos'
import Modules from './src/model/modules.class'
import Users from './src/model/users.class'
import Books from './src/model/books.class'

// import { booksFromUser, booksFromModule, booksWithStatus, incrementPriceOfbooks } from './src/functions'
// import data from './src/services/datos'

document.querySelector('#app').innerHTML = `
  <div class="contenedor">
    <img src="${logoBatoi}" class="logo" alt="Logo batoi"/>
    <h1>BatoiBooks</h1>
    <p>Abre la consola para ver el resutlado por favor</p>
  </div>
`

const myModules = new Modules();
myModules.populate(data.modules);

const myUsers = new Users();
myUsers.populate(data.users);

const myBooks = new Books();
myBooks.populate(data.books);

console.log(`Resultado de data.books: ${data.books}`);


console.log(myBooks.toString());
console.log(myBooks.booksFromModule("5021"));
console.log(myBooks.booksWithStatus("new"));
console.log(myBooks.incrementPriceOfbooks(0.1));