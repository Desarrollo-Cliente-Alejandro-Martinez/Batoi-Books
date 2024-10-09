import './style.css'
import logoBatoi from '/logoBatoi.png'
import { booksFromUser, booksFromModule, booksWithStatus, incrementPriceOfbooks } from './src/functions'
import data from './src/services/datos'

document.querySelector('#app').innerHTML = `
  <div class="contenedor">
    <img src="${logoBatoi}" class="logo" alt="Logo batoi"/>
    <h1>BatoiBooks</h1>
    <p>Abre la consola para ver el resutlado por favor</p>
  </div>
`

console.log(booksFromUser(data.books, 4));
console.log(booksWithStatus(booksFromModule(data.books, "5021"), "good"));
console.log(incrementPriceOfbooks(data.books, 0.1));
