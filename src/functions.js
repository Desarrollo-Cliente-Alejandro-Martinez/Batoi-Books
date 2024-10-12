'use strict';

// < books: array
// < bookId: number
// > return Object
function getBookById(books, bookId) {
    
    let libro = books.find(libro => libro.id === bookId);

    if (!libro) {
        throw new Error("No se ha encontrado el libro.");
    }

    return libro;
}

// < books: array
// < bookId: number
// > return Number
function getBookIndexById(books, bookId) {
    
    let posicion = books.findIndex(libro => libro.id === bookId);

    if (posicion === -1) {
        throw new Error("No se ha encontrado el libro.");
    }

    return posicion;
}

// < books: array
// < userId: number
// < moduleCode: number
// > return Boolean
function bookExists(books, userId, moduleCode) {
    return (books.some(libro => libro.userId === userId && libro.moduleCode === moduleCode));
}

// < books: array
// < userId: number
// > return Array
function booksFromUser(books, userId) {
    return (books.filter(libro => libro.userId === userId));
}

// < books: array
// < moduleCode: string
// > return Array
function booksFromModule(books, moduleCode) {
    return (books.filter(libro => libro.moduleCode === moduleCode));
}

// < books: array
// < price: number
// > return Array
function booksCheeperThan(books, price) {
    return (books.filter(libro => libro.price <= price));
}

// < books: array
// < status: string
// > return Array
function booksWithStatus(books, status) {
    return (books.filter(libro => libro.status === status));
}

// < books: array
// > return String
function averagePriceOfBooks(books) {
    
    if (books.length === 0) {
        return "0.00 €";
    }

    return (books.reduce((total, libro) => total + libro.price, 0) / books.length).toFixed(2) + " €"; 
}

// < books: array
// > return Array
function booksOfTypeNotes(books) {
    return (books.filter(libro => libro.publisher  === "Apunts"));
}

// < books: array
// > return Array
function booksNotSold(books) {
    return (books.filter(libro => libro.soldDate === ""));
}

// < books: array
// < percentage: number
// > return Array
function incrementPriceOfbooks(books, percentage) {
    return books.map(libro => ({ ...libro, price: libro.price + libro.price * percentage}));
}

// < users: array
// < userId: number
// > return Object
function getUserById(users, userId) {
    
    let usuario = users.find(usuario => usuario.id === userId);
    
    if (!usuario) {
        throw new Error("El usuario no existe.");
    }

    return usuario;
}

// < users: array
// < userId: number
// > return Number
function getUserIndexById(users, userId) {
    
    let indexUsuario = users.findIndex(usuario => usuario.id === userId);
    
    if (indexUsuario === -1) {
        throw new Error("El usuario no existe.");
    }

    return indexUsuario;
}

// < users: array
// < nick: string
// > return Object
function getUserByNickName(users, nick) {
    
    let usuario = users.find(usuario => usuario.nick === nick);
    
    if (!usuario) {
        throw new Error("El usuario con nickname " + nick + " no se ha encontrado.");
    }

    return usuario;
}

// < modules: array
// < modeuleCode: string
// > return Object
function getModuleByCode(modules, moduleCode) {
    
    let modulo = modules.find(modulo => modulo.code === moduleCode);
    
    if (!modulo) {
        throw new Error("El módulo con código: " + moduleCode + " no se ha encontrado.");
    }

    return modulo;
}


export {
    getBookById,
    getBookIndexById,
    bookExists,
    booksFromUser,
    booksFromModule,
    booksCheeperThan,
    booksWithStatus,
    averagePriceOfBooks,
    booksOfTypeNotes,
    booksNotSold,
    incrementPriceOfbooks,
    getUserById,
    getUserIndexById,
    getUserByNickName,
    getModuleByCode
  }
  