import Book from './book.class'

export default class Books {

    constructor() {
        this.data = [];
    }

    populate(datos) {
        this.data = datos.map(dato => new Book(dato));
    }

    addBook(nuevoLibro) {
        
        const highestId = this.data.length > 0 ? Math.max(...this.data.map(book => book.id)) : 0;
        nuevoLibro.id = highestId + 1;
        
        const newBook = new Book(nuevoLibro);

        this.data.push(newBook);

        return newBook;
    }

    removeBook(id) {

        if (!this.data.find(book => book.id === id)) {
            throw new Error("El libro con id " + id + " no existe.");
        }

        this.data = this.data.filter(book => book.id !== id);
    }

    changeBook(libro) {

        const newBook = libro instanceof Book ? libro : new Book(libro);
        const indiceLibro = this.data.findIndex(book => book.id == newBook.id);

        if (indiceLibro === -1) {
            throw new Error("El libro que deseas modificar no existe.");
        }

        this.data[indiceLibro] = newBook;
        
        return newBook;
    }

    toString() {
        return this.data.map(libro => 
            `Id: ${libro.id}. userId: ${libro.userId}. moduleCode: ${libro.moduleCode}. publisher: ${libro.publisher}. price: ${libro.price}. pages: ${libro.pages}. status: ${libro.status}. soldDate: ${libro.soldDate}`
        ).join('\n');
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

    incrementPriceOfbooks(percentage) {
        return (this.data.map(libro => ({ ...libro, price: libro.price * percentage})));
    }    
}