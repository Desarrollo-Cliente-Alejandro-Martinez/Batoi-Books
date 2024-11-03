const SERVER = import.meta.env.VITE_URL_API;

// Devuelve todos los registros de las tablas
async function getDBBooks() {
    try {
        const response = await fetch(`${SERVER}/books`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw (`Error ${response.status} de la BBDD ${response.statusText}`);
        }
        
        return await response.json();

    } catch (error) {
        console.error('Error al obtener todos los libros: ', error);
        throw error;
    }
}


// Devuelve el registro cuya id coincide con la pasada como parámetro
async function getDBBook(bookId) {
    try {
        const response = await fetch(`${SERVER}/books/${bookId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Error ${response.status} de la BBDD: ${response.statusText}`);
        }
        
        return await response.json();

    } catch (error) {
        console.error('Error al obtener el libro: ', error);
        throw error;
    }
}


// Recibe un nuevo objeto que añadirá a la tabla
async function addDBBook(libro) {
    try {
        const response = await fetch(`${SERVER}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(libro)
        });
    
        if (!response.ok) {
            throw new Error(`Error ${response.status} de la BBDD ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error al añadir el libro: ', error);
        throw error;
    }
}


// Recibe la id de un nuevo objeto y lo borrará de la tabla
async function removeDBBook(bookId) {
    try {
        const response = await fetch(`${SERVER}/books/${bookId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status} de la BBDD ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error al eliminar el libro: ', error);
        throw error;
    }
}


// Recibe un objeto que ya existe en la tabla y lo modifica, usando el método PUT
async function changeDBBook(libro) {
    try {
        const response = await fetch(`${SERVER}/books/${libro.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(libro)
        });
    
        if (!response.ok) {
            throw new Error(`Error ${response.status} de la BBDD ${response.status}`);
        }
    
        return await response.json();
    } catch (error) {
        console.error('Error al modificar el libro: ', error);
        throw error;
    }
}


export { getDBBooks, getDBBook, addDBBook, removeDBBook, changeDBBook }