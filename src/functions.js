// < books: array
// < bookId: number
// > return Object
function getBookById(books, bookId) {
    let libro = books.find(libro => libro === bookId);

    if (!libro) {
        throw new Error("No se ha encontrado el libro.");
    }

    return libro;
}

// < books: array
// < bookId: number
// > return Number
function getBookIndexById(books, bookId) {
    let posicion = books.findIndex(libro => libro === bookId);

    if (!posicion) {
        throw new Error("No se ha encontrado el libro.");
    }

    return posicion;
}

// < books: array
// < userId: number
// < moduleCode: number
// > return Boolean
function bookExists(books, userId, moduleCore) {
    
    if (false) {
        throw new Error("El usuario aún no tiene un libro con ese código.");
    }

    return false;
}

// < books: array
// < userId: number
// > return Array
function booksFromUser(books, userId) {
    
}

// < books: array
// < moduleCode: string
// > return Array
function booksFromModule(books, moduleCourse) {
    
}

// < books: array
// < price: number
// > return Array
function booksCheeperThan(books, price) {
    
}

// < books: array
// < status: string
// > return Array
function booksWithStatus(books, status) {
    
}

// < books: array
// > return String
function averagePriceOfBooks(books) {
    
}

// < books: array
// > return Array
function booksOfTypeNotes(books) {
    
}

// < books: array
// > return Array
function booksNotSold(books) {
    
}

// < books: array
// < percentage: number
// > return Array
function incrementPriceOfbooks(books, percentage) {
    
}

// < users: array
// < userId: number
// > return Object
function getUserById(users, userId) {
    
}

// < users: array
// < userId: number
// > return Number
function getUserIndexById(users, userId) {
    
}

// < users: array
// < nick: string
// > return Object
function getUserByNickName(users, nick) {
    
}

// < modules: array
// < modeuleCode: string
// > return Object
function getModuleByCode(modules, moduleCore) {
    
}