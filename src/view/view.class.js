export default class View {
    constructor() {
        this.bookList = document.getElementById('list');
        this.about = document.getElementById('about');
        this.form = document.getElementById('fomr');
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
        
        newBook.innerHTML = `
            <img src="${book.photo}" alt="Libro: ${book.id}">
            <div>
                <h3>${book.moduleCode} (${book.id})</h3>
                <h4>${book.publisher}</h4>
                <p>${book.pages}</p>
                <p>Estado: ${book.status}</p>
                <p>En venta // Vendido el 21/12/2023 ${book.soldDate}</p>
                <p>${book.comments}</p>
                <h4>${book.price.toFixed(2)}</h4>
            </div>`;
        
        this.bookList.appendChild(newBook);
    }

    renderRemovedBook() {

    }

    renderUserMessage(type, message) {
        
        const newMessage = document.createElement('div');
        newMessage.className = type + ' alert alert-danger alert-dimissible';
        
        newMessage.innerHTML = `
                ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="this.parentElement.remove()">x</button>`;

        this.messages.appendChild(newMessage);
    }


    setBookSubmitHandler(callback) {  
        this.bookForm.addEventListener('submit', (event) => {
            event.preventDefault()
            
            const moduleCode = document.getElementById('id-module').value;
            const publisher = document.getElementById('publisher').value;
            const price = document.getElementById('price').value;
            const pages = document.getElementById('pages').value;
            const status = document.getElementById('input[name="status"]:checked')?.value;
            const comments = document.getElementById('comments').value;

            callback(moduleCode, publisher, price, pages, status, comments);
        })
    }
    
    setBookRemoveHandler(callback) {
        this.remove.addEventListener('click', () => {

            const idToRemove = document.getElementById("id-remove").value;

            callback(idToRemove);
        })
    }
}