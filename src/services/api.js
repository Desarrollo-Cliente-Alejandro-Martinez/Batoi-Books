const SERVER = import.meta.env.VITE_URL_API;

// Devuelve todos los registros de las tablas
async function getDBUsers() {
    const response = await fetch(SERVER + '/users');
    
    if (!response.ok) {
        throw new Error(`Error ${response.status} de la BBDD ${response.statusText}`);
    }
    
    return await response.json();
}

async function getDBModules() {
    const response = await fetch(SERVER + '/modules');
    
    if (!response.ok) {
        throw new Error(`Error ${response.status} de la BBDD ${response.statusText}`);
    }
    
    return await response.json();
}

async function getDBBooks() {
    const response = await fetch(SERVER + '/books');
    
    if (!response.ok) {
        throw (`Error ${response.status} de la BBDD ${response.statusText}`);
    }
    
    return response.json();
}


// Devuelve el registro cuya id coincide con la pasada como parámetro
async function getDBUser(userId) {
    const response = await fetch(SERVER + '/users?id=' + userId);
    
    if (!response.ok) {
        throw new Error(`Error ${response.status} de la BBDD ${response.statusText}`);
    }
    
    return await response.json();
}

async function getDBBook(bookId) {
    const response = await fetch(SERVER + '/books?id=' + bookId);
    
    if (!response.ok) {
        throw new Error(`Error ${response.status} de la BBDD ${response.status}`);
    }
    
    return await response.json();
}


// Recibe un nuevo objeto que añadirá a la tabla
async function addDBBook(libro) {
    const response = await fetch(SERVER + '/books', {
        method: 'POST',
        body: JSON.stringify(libro),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`Error ${response.status} de la BBDD ${response.statusText}`);
    }
    
    return await response.json();
}

async function addDBUser(usuario) {
    const response = await fetch(SERVER + '/users', {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    if (!response.ok) {
        throw new Error(`Error ${response.status} de la BBDD ${response.statusText}`);
    }
    
    return await response.json();
}


// Recibe la id de un nuevo objeto y lo borrará de la tabla
async function removeDBBook(bookId) {
    const response = await fetch(SERVER + '/books/' + bookId, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error(`Error ${response.status} de la BBDD ${response.statusText}`);
    }

    return response.ok;
}

async function removeDBUser(userId) {
    const response = await fetch(SERVER + '/users/' + userId, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error(`Error ${response.status} de la BBDD ${response.statusText}`);
    }

    return response.ok;
}


// Recibe un objeto que ya existe en la tabla y lo modifica, usando el método PUT
async function changeDBBook(libro) {
    const response = await fetch(SERVER + '/books', {
        method: 'PUT',
        body: JSON.stringify(libro),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`Error ${response.status} de la BBDD ${response.status}`);
    }

    return await response.json();
}

async function changeDBUser(user) {
    const response = await fetch(SERVER + '/users', {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`Error ${response.status} de la BBDD ${response.statusText}`);
    }

    return await response.json();
}


// Recibe la id de un usuario y sunueva contraseña y lo modifica
async function changeDBUserPassword(userId, newPass) {
    if (getDBUser(userId)) {
        const response = await fetch(SERVER + '/users?id=' + userId, {
            method: 'PATCH',
            body: JSON.stringify({ password: newPass }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status} de la BBDD ${response.statusText}`);
        }

        return await response.json();
    }
}



export {
    getDBUsers,
    getDBModules,
    getDBBooks,
    getDBUser,
    getDBBook,
    addDBBook,
    addDBUser,
    removeDBBook,
    removeDBUser,
    changeDBBook,
    changeDBUser,
    changeDBUserPassword
}