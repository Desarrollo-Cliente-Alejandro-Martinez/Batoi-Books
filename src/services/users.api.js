const SERVER = import.meta.env.VITE_URL_API;

// Devuelve todos los registros de las tablas
async function getDBUsers() {
    try {
        const response = await fetch(`${SERVER}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status} de la BBDD ${response.statusText}`);
        }

        return await response.json();

    } catch (error) {
        console.error('Error al obtener todos los usuarios: ', error);
    }
}


// Devuelve el registro cuya id coincide con la pasada como parámetro
async function getDBUser(userId) {
    try {
        const response = await fetch(`${SERVER}/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status} de la BBDD ${response.statusText}`);
        }

        return await response.json();

    } catch (error) {
        console.error('Error al obtener el usuario: ', error);        
    }
}


// Recibe un nuevo objeto que añadirá a la tabla
async function addDBUser(usuario) {
    try {
        const response = await fetch(`${SERVER}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });
        
        if (!response.ok) {
            throw new Error(`Error ${response.status} de la BBDD ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error al añadir el usuario: ', error);
    }
}


// Recibe la id de un nuevo objeto y lo borrará de la tabla
async function removeDBUser(userId) {
    try {
        const response = await fetch(`${SERVER}/users/${userId}`, {
            method: 'DELETE'
        });
    
        if (!response.ok) {
            throw new Error(`Error ${response.status} de la BBDD ${response.statusText}`);
        }
    
        return await response.json();
    } catch (error) {
        console.error('Error al eliminar el usuario: ', error);
    }
}


// Recibe un objeto que ya existe en la tabla y lo modifica, usando el método PUT
async function changeDBUser(user) {
    try {
        const response = await fetch(`${SERVER}/users/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
    
        if (!response.ok) {
            throw new Error(`Error ${response.status} de la BBDD ${response.statusText}`);
        }
    
        return await response.json();
    } catch (error) {
        console.error('Error al modificar el usuario: ', error);
    }
}


// Recibe la id de un usuario y sunueva contraseña y lo modifica
async function changeDBUserPassword(userId, newPass) {
    const user = await getDBUser(userId);
    if (user) {
        const response = await fetch(`${SERVER}/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: newPass })
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status} de la BBDD: ${response.statusText}`);
        }

        return response.json();
    } else {
        throw new Error('El usuario no existe en la BBDD.');
    }
}



export { getDBUsers, getDBUser, addDBUser, removeDBUser, changeDBUser, changeDBUserPassword }