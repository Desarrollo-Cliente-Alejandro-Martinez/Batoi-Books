import Books from "../model/books.class";
import Modules from "../model/modules.class";
import Users from "../model/users.class";
import View from "../view/view.class";
import Cart from "../model/cart.class";

export default class Controller {
    
    constructor() {

        this.model = {
            books: new Books(),
            modules: new Modules(),
            users: new Users(),
            cart: new Cart()
        };

        this.view = new View();
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

    async handleSubmitBook(payload) {
        
        try {
            
            const bookId = document.getElementById('id').value;
            
            if (bookId) {
                // Si hay un ID, significa que estamos editando un libro
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
        
        switch (action) {
            case 'add':
                this.addToCart(bookID);
                break;
            case 'edit':
                this.editBook(bookID);
                break;
            case 'delete':
                this.removeBook(bookID);
                break;
            default:
                break;
        }
    }

    addToCart(bookId) {
        this.model.cart.addItem(bookId);
        console.log(`Libro con ID: ${bookId} añadido correctamente.`);
    }

    editBook(bookId) {
        this.view.renderFormToEditBook(bookId);
    }

    removeBook(bookId) {
        this.handleRemoveBook(bookId);
    }
}