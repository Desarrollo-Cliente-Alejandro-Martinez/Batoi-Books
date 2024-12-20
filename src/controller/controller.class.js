import Books from "../model/books.class";
import Modules from "../model/modules.class";
import Users from "../model/users.class";
import View from "../view/view.class";
import Cart from "../model/cart.class";
import Router from "../services/Router";

export default class Controller {
    
    constructor() {

        this.model = {
            books: new Books(),
            modules: new Modules(),
            users: new Users(),
            cart: new Cart()
        };

        this.view = new View();
        this.router = new Router(this.view);
    }

    async init() {
        
        try {
            await Promise.all ([
                this.model.books.populate(),
                this.model.modules.populate(),
                this.model.users.populate(),
                this.model.cart.populate()
            ]);

            this.view.renderModulesSelect(this.model.modules.data);
            this.model.books.data.forEach(book => this.view.renderBook(book))
        
            this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this))
            this.view.setBookListEventHandler(this.handleBookButtonClicked.bind(this));
            this.view.setCancelButtonHandler(this.handleCancelEdit.bind(this));

        } catch (error) {
            document.getElementById("messages").textContent = "Error: " + error.message;
        }
    }

    async validateModuleDuplication(userId, moduleCode) {
        try {
            // Realizamos la petición GET a la API para comprobar si existe un libro con ese módulo
            const response = await fetch(`http://localhost:3000/books?userId=${userId}&moduleCode=${moduleCode}`);
            const data = await response.json();
            // Si la respuesta tiene libros, significa que ya existe el libro en la base de datos
            return data.length > 0;
        } catch (error) {
            console.error('Error en la validación del módulo:', error);
            return false; // En caso de error, asumimos que no hay duplicados
        }
    }

    async handleSubmitBook(payload) {
        
        try {

            const bookId = document.getElementById('id').value;
            const userId = 4;
            const moduleCode = payload.moduleCode;

            this.view.errores.innerHTML = '';
            const exists = await this.validateModuleDuplication(userId, moduleCode);
            if (exists) {
                
                const error = document.createElement('p');
                error.className = 'error';
                error.textContent = "Ya tienes un libro de este módulo en venta.";
                this.view.errores.appendChild(error);
                
                return;
            }
            
            if (bookId) {
                // Si hay un ID, significa que estamos editando un libro
                const originalBook = this.model.books.getBookById(bookId);
                
                if (this.areBooksEqual(originalBook, payload)) {
                    this.view.renderUserMessage("info", "No se han detectado cambios en el libro.");
                    return;
                }
                
                payload.id = bookId;
                const updatedBook = await this.model.books.changeBook(payload);
                this.view.renderEditBook(updatedBook);
                this.view.renderFormToAddBook();
            } else {
                // Si no hay ID, significa que estamos añadiendo un libro nuevo
                const newBook = await this.model.books.addBook(payload);
                this.view.renderBook(newBook);
                this.view.renderFormToAddBook();
            }
        } catch (error) {
            this.view.renderUserMessage("error", error.message);
            console.error(error);
        }
    }

    handleChangeBook(bookID, updatedBookData) {
        this.model.books.changeBook(updatedBookData)
            .then(updatedBook => {
                this.view.renderBook(updatedBook);
                this.view.renderFormToAddBook();
            })
            .catch(error => {
                this.view.renderUserMessage("error", error.message);
            });
    }

    handleCancelEdit() {        
        this.view.renderFormToAddBook();
        window.history.pushState({}, '', '#list');
        this.router.onHashChange();
    }

    async bookChanges(libro) {

        const bookInBD = getBookById(libro.id);
        console.log(bookInBD);
        
        return false;
    }

    async handleRemoveBook(id) {
        
        try {
            
            await this.model.books.removeBook(id);
            this.view.renderRemovedBook(id);
        
        } catch (error) {
            this.view.renderUserMessage("error", "Error al eliminar el libro.");
        }
    }

    handleBookButtonClicked(action, bookID) {

        const options = {
            add: (id) => this.addToCart(id),
            edit: (id) => this.editBook(id),
            delete: (id) => this.removeBook(id),
            default: () => console.error("Invalid action")
        };

        return (options[action] || options['default'])(bookID);
    }

    addToCart(bookId) {
        this.model.cart.addItem(bookId);
        console.log(`Libro con ID: ${bookId} añadido correctamente.`);
    }

    editBook(bookId) {
        this.view.renderFormToEditBook(bookId);

        window.history.pushState({}, '', '#form');
        this.router.onHashChange();

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    removeBook(bookId) {
        this.handleRemoveBook(bookId);
    }

    areBooksEqual(originalBook, newBookData) {
        return (
            originalBook.moduleCode === newBookData.moduleCode &&
            originalBook.publisher === newBookData.publisher &&
            parseFloat(originalBook.price).toFixed(2) === parseFloat(newBookData.price).toFixed(2) &&
            parseInt(originalBook.pages) === parseInt(newBookData.pages, 10) &&
            originalBook.status === newBookData.status &&
            originalBook.comments === newBookData.comments
        );
    }    
}