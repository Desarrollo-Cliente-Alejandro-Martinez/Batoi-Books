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
        }
    }

    handleSubmitBook(payload) {
        alert('Formulario enviado');
        console.log(payload);
    }

    handleRemoveBook(id) {
        alert('Libro borrado');
        console.log(id);
    }
}