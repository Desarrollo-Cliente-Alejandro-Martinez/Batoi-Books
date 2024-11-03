import Books from "../model/books.class";
import Modules from "../model/modules.class";
import Users from "../model/users.class";
import View from "../view/view.class";

export default class Controller {
    
    constructor() {

        this.model = {
            books: new Books(),
            modules: new Modules(),
            users: new Users()
        };

        this.view = new View();
    }

    async init() {
        
        try {
            await Promise.all ([
                this.model.books.populate(),
                this.model.modules.populate(),
                this.model.users.populate()
            ]);

            this.view.renderModulesSelect(this.model.modules.data);
            this.model.books.data.forEach(book => this.view.renderBook(book))
        
            this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this))
            this.view.setBookRemoveHandler(this.handleRemoveBook.bind(this))

        } catch (error) {
            console.log(error);
            document.getElementById("messages").textContent = "Error: " + error.message; // Cambia aquí para incluir el mensaje de error
        }
    }

    async handleSubmitBook(payload) {
        
        try {

            const newBook = await this.model.books.addBook(payload);
            this.view.renderBook(newBook);
            
        } catch (error) {
            this.view.renderUserMessage("error", error.message);            
            console.log(error);
        }
        
    }

    async handleRemoveBook(id) {

        try {
            
            await this.model.books.removeBook(id);
            this.view.renderRemovedBook(id);

        } catch (error) {
            this.view.renderUserMessage("error", "Error al eliminar el libro.");
        }
    }
}