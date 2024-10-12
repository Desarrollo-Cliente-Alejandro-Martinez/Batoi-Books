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

    // changeBook(libro) {

    //     const newBook = libro instanceof Book ? libro : new Book(libro);
    //     const indiceLibro = this.data.findIndex(book => book.id == newBook.id);

    //     if (indiceLibro === -1) {
    //         throw new Error("El libro que deseas modificar no existe.");
    //     }

    //     this.data[indiceLibro] = newBook;
        
    //     return newBook;
    // }



    changeBook(libro) {

        const newBook = libro instanceof Book ? libro : new Book(libro);
        
        console.log('Buscando libro con ID:', newBook.id);
        

        const indiceLibro = this.data.findIndex(book => book.id == newBook.id); 
        
        // Si no encuentra el libro, lanza un error
        if (indiceLibro === -1) {
            console.error("No se encontró el libro con ID:", newBook.id);
            throw new Error("El libro que deseas modificar no existe.");
        }
    
        // Actualiza el libro en el índice encontrado
        this.data[indiceLibro] = newBook;
            
        return newBook;
    }
    


    toString() {

    }
}