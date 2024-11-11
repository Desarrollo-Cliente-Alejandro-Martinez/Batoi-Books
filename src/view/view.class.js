export default class View {
    constructor() {
        this.bookList = document.getElementById('list');
        this.about = document.getElementById('about');
        this.form = document.getElementById('form');
        this.remove = document.getElementById('remove');
        this.bookForm = document.getElementById('bookForm');
        this.messages = document.getElementById('messages');
    }

    renderModulesSelect(modules) {

        const select = document.getElementById("id-module");

        modules.forEach((module) => {
            const option = document.createElement("option");
            option.value = module.code;
            option.textContent = module.cliteral;
            select.appendChild(option);
        })
    }

    renderBook(book) {
        
        const newBook = document.createElement('div');
        newBook.className = 'card';
        newBook.id = book.id;

        const sold = book.soldDate === '' ? "green" : "red";
        const bookStatus = book.status === "new" ? "blue" : (book.status === "good") ? "green" : "red";

        newBook.innerHTML = `
            <img src="${book.photo || '../../public/default.jpeg'}" alt="Libro: ${book.id}" class="card-image">
            <div class="card-details">
                <h3 class="card-title">Código: ${book.moduleCode} | ID: ${book.id}</h3>
                <h4 class="card-publisher">
                    <span class="label">Editorial:</span>
                    <span class="name">${book.publisher}</span>
                </h4>
                <p class="card-pages">Páginas: ${book.pages}</p>
                <p class="card-condition">Estado: <span class="${bookStatus}">${(book.status === "new") ? "Nuevo" : (book.status === "good") ? "Bueno" : "Malo"}</span></p>
                <p class="card-sold ${sold}">${book.soldDate === '' ? 'En venta' : `Vendido el ${book.soldDate}`}</p>
                <p class="card-comments">${book.comments || 'Sin comentarios adicionales'}</p>
                <h4 class="card-price ${sold}">${parseFloat(book.price).toFixed(2)} €</h4>
            </div>`;

        this.bookList.appendChild(newBook);
    }

    renderRemovedBook(bookId) {
        const bookToRemove = document.getElementById(bookId);
        this.bookList.removeChild(bookToRemove);
    }

    renderUserMessage(type, message) {
        
        const newMessage = document.createElement('div');
        newMessage.className = type;
        
        newMessage.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="this.parentElement.remove()">x</button>`;

        this.messages.appendChild(newMessage);

        if (type !== "error") {
            setTimeout(() => newMessage.remove(), 3000);
        }
    }


    setBookSubmitHandler(callback) {  
        this.bookForm.addEventListener('submit', (event) => {
            event.preventDefault()
            
            const moduleCode = document.getElementById('id-module').value;
            const publisher = document.getElementById('publisher').value;
            const price = document.getElementById('price').value;
            const pages = document.getElementById('pages').value;
            const status = document.querySelector('input[name="status"]:checked')?.value;
            const comments = document.getElementById('comments').value;

            callback({moduleCode, publisher, price, pages, status, comments});
        })
    }
    
    setBookRemoveHandler(callback) {
        this.remove.addEventListener('click', () => {

            const idToRemove = document.getElementById("id-remove").value;

            callback(idToRemove);
        })
    }
}