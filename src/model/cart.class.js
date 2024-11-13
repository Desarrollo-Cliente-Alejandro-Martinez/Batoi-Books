import Books from "./books.class";

export default class Cart {

    constructor() {
        this.data = [];
    }


    populate() {
    
    }

    getBookById(id) {

        try {
            libroConId = Books.getBookById(id);
            return libroConId;
        } catch (error) {
            return "{}";
        }
    }

    addItem(book) {

        try {

            const newReferencedBook = book;
            
            if (this.data.find(referencedBook => referencedBook === newReferencedBook)) {
                throw new Error("El libro ya está en el carrito.");
            }

            this.data.push(newReferencedBook);    
            
        } catch (error) {
            throw new Error("El libro ya está en el carrito.");
        }
    }

    removeItem(id) {
        try {

            const index = this.data.findIndex(referencedBook => referencedBook.id === id);
    
            if (index === -1) {
                throw new Error("El libro no está en el carrito.");
            }
    
            this.data.splice(index, 1);
    
        } catch (error) {
            throw new Error("Error al intentar eliminar el libro del carrito.");
        }
    }
    

    toString() {
        return this.data.length > 0
            ? this.data.map(book => book.toString()).join('\n')
            : "El carrito está vacío.";
    }
}