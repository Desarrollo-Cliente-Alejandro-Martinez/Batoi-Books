export default class View {
    constructor() {
        this.bookList = document.getElementById('list');
        this.about = document.getElementById('about');
        this.form = document.getElementById('form');
        this.remove = document.getElementById('remove');
        this.bookForm = document.getElementById('bookForm');
        this.messages = document.getElementById('messages');
        this.errores = document.getElementById('errores');
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

                <button>
                    <span class="material-icons">add_shopping_cart</span>
                </button>
                <button>
                    <span class="material-icons">edit</span>
                </button>
                <button>
                    <span class="material-icons">delete</span>
                </button>
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

    renderFormToEditBook(bookID) {
        
        // Cambios en títulos y botones
        document.getElementById('title-form').textContent = "Editar libro";
        document.getElementById('submitButton').textContent = "Cambiar";
        document.getElementById('resetButton').textContent = "Cancelar";
        document.getElementById('campoID').removeAttribute('hidden');

        const card = document.getElementById(bookID);
                
        // Autocompletado de los campos en edit form
        document.getElementById('id').value = bookID;
        document.getElementById('id-module').value = card.querySelector('.card-title').textContent.split(":")[1].split("|")[0].trim();
        document.getElementById('publisher').value = card.querySelector('.name').textContent;
        document.getElementById('price').value = parseFloat(card.querySelector('.card-price').textContent).toFixed(2);
        document.getElementById('pages').value = card.querySelector('.card-pages').textContent.match(/\d+/);
        document.getElementById('comments').value = card.querySelector('.card-comments').textContent;
        
        // Estado del libro
        const statusText = card.querySelector('.card-condition span').textContent.toLowerCase();
        const statusMap = {
            "nuevo": "new",
            "bueno": "good",
            "malo": "bad"
        };
        const statusValue = statusMap[statusText];
        document.querySelector(`input[name="status"][value="${statusValue}"]`).checked = true;        
    }

    renderFormToAddBook() {
        document.getElementById('title-form').textContent = "Añadir libro";
        document.getElementById('submitButton').textContent = "Añadir";
        document.getElementById('resetButton').textContent = "Reset";
        document.getElementById('campoID').setAttribute('hidden', '');

        document.getElementById('id').value = null;
        document.getElementById('id-module').value = null;
        document.getElementById('publisher').value = null;
        document.getElementById('price').value = null;
        document.getElementById('pages').value = null;
        
        const statusInputs = document.querySelectorAll('input[name="status"]');
        if (statusInputs.length > 0) {
            statusInputs[0].checked = true;
        }
        
        document.getElementById('comments').value = null;
    }

    renderEditBook(updatedBook) {
        const bookCard = document.getElementById(updatedBook.id);
        if (bookCard) {
            const sold = updatedBook.soldDate === '' ? "green" : "red";
            const bookStatus = updatedBook.status === "new" ? "blue" : (updatedBook.status === "good") ? "green" : "red";

            bookCard.innerHTML = `
                <img src="${updatedBook.photo || '../../public/default.jpeg'}" alt="Libro: ${updatedBook.id}" class="card-image">
                <div class="card-details">
                    <h3 class="card-title">Código: ${updatedBook.moduleCode} | ID: ${updatedBook.id}</h3>
                    <h4 class="card-publisher">
                        <span class="label">Editorial:</span>
                        <span class="name">${updatedBook.publisher}</span>
                    </h4>
                    <p class="card-pages">Páginas: ${updatedBook.pages}</p>
                    <p class="card-condition">Estado: <span class="${bookStatus}">${updatedBook.status === "new" ? "Nuevo" : updatedBook.status === "good" ? "Bueno" : "Malo"}</span></p>
                    <p class="card-sold ${sold}">${updatedBook.soldDate === '' ? 'En venta' : `Vendido el ${updatedBook.soldDate}`}</p>
                    <p class="card-comments">${updatedBook.comments || 'Sin comentarios adicionales'}</p>
                    <h4 class="card-price ${sold}">${parseFloat(updatedBook.price).toFixed(2)} €</h4>

                    <button>
                        <span class="material-icons">add_shopping_cart</span>
                    </button>
                    <button>
                        <span class="material-icons">edit</span>
                    </button>
                    <button>
                        <span class="material-icons">delete</span>
                    </button>
                </div>`;
        }
    }

    setBookSubmitHandler(callback) {  
        this.bookForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            if (this.validateForm()) {
                const payload = this.getFormData();
                callback(payload);
            }
            // const moduleCode = document.getElementById('id-module').value;
            // const publisher = document.getElementById('publisher').value;
            // const price = document.getElementById('price').value;
            // const pages = parseInt(document.getElementById('pages').value);
            // const status = document.querySelector('input[name="status"]:checked')?.value;
            // const comments = document.getElementById('comments').value;

            // callback({moduleCode, publisher, price, pages, status, comments});
        })
    }

    setBookListEventHandler(callback) {
        this.bookList.addEventListener('click', (event) => {
            const button = event.target.closest('button');
            if (!button) return;
            
            const action = button.querySelector('span.material-icons').textContent;
            const bookCard = button.closest('.card');
            const bookId = bookCard ? bookCard.id : null;

            if (action === 'add_shopping_cart') {
                callback('add', bookId);
            } else if (action === 'edit') {
                callback('edit', bookId);
            } else if (action === 'delete') {
                callback('delete', bookId);
            }
        });
    }
    
    setCancelButtonHandler(callback) {
        document.getElementById('resetButton').addEventListener('click', (event) => {
            event.preventDefault();
            callback();
        });
    }



    // Método para obtener los datos del formulario
    getFormData() {
        return {
            moduleCode: this.bookForm.querySelector("#id-module").value,
            publisher: this.bookForm.querySelector("#publisher").value,
            price: parseFloat(this.bookForm.querySelector("#price").value),
            pages: parseInt(this.bookForm.querySelector("#pages").value),
            status: this.bookForm.querySelector("input[name='status']:checked").value,
            comments: this.bookForm.querySelector("#comments").value,
        };
    }

    // Método de validación de los campos del formulario
    validateForm() {

        const idModule = document.getElementById('id-module');
        const publisher = document.getElementById('publisher');
        const price = document.getElementById('price');
        const pages = document.getElementById('pages');
        const status = document.querySelector('input[name="status"]:checked');

        this.errores.innerHTML = '';
        let valid = true;
        
        // Validación del módulo (requerido)
        if (!idModule.checkValidity()) {
            valid = false;
            this.crearMensajeError("Por favor selecciona un módulo.");
        }

        // Validación de la editorial (requerido)
        if (!publisher.checkValidity()) {
            valid = false;
            this.crearMensajeError("Por favor introduce una editorial.");
        }

        // Validación del precio (requerido, numérico, mayor o igual que 0)
        if (!price.checkValidity()) {
            valid = false;
            this.crearMensajeError("El precio debe ser un número mayor o igual que 0.");
        }

        // Validación de las páginas (requerido, entero, mayor que 0)
        if (!pages.checkValidity()) {
            valid = false;
            this.crearMensajeError("El número de páginas debe ser un número entero mayor que 0.");
        }

        // Validación del estado (requerido)
        if (!status) {
            valid = false;
            this.crearMensajeError("Por favor selecciona un estado.");
        }

        return valid;
    }

    crearMensajeError(mensaje) {
        const error = document.createElement('p');
        error.className = 'error';
        error.textContent = mensaje;
        this.errores.appendChild(error);
    }
}