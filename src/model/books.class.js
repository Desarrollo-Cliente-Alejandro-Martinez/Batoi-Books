import Book from './book.class'
import { getDBBooks, getDBBook, addDBBook, removeDBBook, changeDBBook } from "../services/books.api";

export default class Books {

    constructor() {
        this.data = [];
    }

    async populate() {
        this.data = await getDBBooks();
        this.data = this.data.map(libro => new Book(libro));
    }


    async addBook(nuevoLibro) {

        try {

            const lastId = (this.getLastId() + 1);
            const newBook = new Book({ id: String(lastId), ...nuevoLibro });
                        
            await addDBBook(newBook);
 
            this.data.push(newBook);    
            return newBook;

        } catch (error) {
            throw new Error(`Error al añadir el libro: ${nuevoLibro}. Error: ${error}`);
        }
    }

    async removeBook(id) {
    
        // Aquí se debería buscar el libro con el método 'getDBBook()', pero no hay un handler encargado de eso, así que peta.
        const libroABuscar = this.data.find(libro => libro.id === id);
        if (!libroABuscar) {
            throw new Error(`No se ha podido encontrar el libro: ${id}`);
        }

        try {
            
            await removeDBBook(id);
    
            this.data = this.data.filter(libro => libro.id !== id);

        } catch (error) {
            throw new Error(`Error al eliminar el libro con id: ${id}. Error: ${error}`);
        }
    }
    

    async changeBook(libro) {

        const newBook = new Book(libro);
        const indiceLibro = this.data.findIndex(book => book.id == newBook.id);

        if (indiceLibro === -1) {
            throw new Error("El libro que deseas modificar no existe.");
        }

        try {
            const libroModificado = new Book(await changeDBBook(newBook));
            
            this.data[indiceLibro] = libroModificado;
            
            return libroModificado;
        } catch (error) {
            throw new Error(`Error al modificar el libro: ${libro}. Error: ${error}`);
        }
    }


    toString() {
        return this.data.map(libro => 
            `Id: ${libro.id} | UserId: ${libro.userId} | ModuleCode: ${libro.moduleCode} | Publisher: ${libro.publisher} | Price: ${libro.price} | Pages: ${libro.pages} | Status: ${libro.status} | SoldDate: ${libro.soldDate}`
        ).join('\n');
    }



    getLastId() {
        if (this.data.length === 0) return 0;
        return this.data.reduce((maxId, libro) => Math.max(maxId, libro.id), 0);
    }
    

    getBookById(bookId) {
        return this.data.find(libro => libro.id === bookId) || (() => { throw new Error("No se ha encontrado el libro.") })();
    }

    getBookIndexById(bookId) {

        const posicion = this.data.findIndex((libro) => libro.id === bookId);

        if (posicion === -1) throw new Error("No se ha encontrado el libro.");

        return posicion;
    }

    bookExists(userId, moduleCode) {
        return (this.data.some(libro => libro.userId === userId && libro.moduleCode === moduleCode));
    }

    booksFromUser(userId) {
        return (this.data.filter(libro => libro.userId === userId));
    }

    booksFromModule(moduleCode) {
        return (this.data.filter(modulo => modulo.moduleCode === moduleCode));
    }

    booksCheeperThan(price) {
        return (this.data.filter(libro => libro.price <= price));
    }

    booksWithStatus(status) {
        return (this.data.filter(libro => libro.status === status));
    }

    averagePriceOfBooks() {
        if (this.data.length === 0) return "0.00 €";
        return (this.data.reduce((total, libro) => total + libro.price, 0) / this.data.length).toFixed(2) + " €";
    }

    booksOfTypeNotes() {
        return (this.data.filter(libro => libro.publisher === "Apunts"));
    }

    booksNotSold() {
        return (this.data.filter(libro => libro.soldDate === ""));
    }
}