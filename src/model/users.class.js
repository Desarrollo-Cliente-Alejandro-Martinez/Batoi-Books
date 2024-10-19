import User from './user.class'
import { getDBUsers, getDBUser, addDBUser, removeDBUser, changeDBUser, changeDBUserPassword } from "../services/users.api";

export default class Users {

    constructor() {
        this.data = [];
    }

    async populate() {
        this.data = await getDBUsers();
        this.data = this.data.map(usuario => new User(usuario.id, usuario.nick, usuario.email, usuario.password));
    }

    
    async addUser(nuevoUsuario) {

        try {

            const newUser = new User(nuevoUsuario.id, nuevoUsuario.nick, nuevoUsuario.email, nuevoUsuario.password);
            
            await addDBUser(newUser);
 
            this.data.push(newUser);    
            return newUser;

        } catch (error) {
            console.error(`Error al añadir el usuario: ${nuevoUsuario}. Error: ${error}`);
        }
    }

    async removeUser(id) {

        // Aquí se debería buscar el usuario con el método 'getDBUser()', pero no hay un handler encargado de eso, así que peta.
        const usuarioABuscar = this.data.find(usuario => usuario.id === id);
        if (!usuarioABuscar) {
            throw new Error(`Error, no se ha encontrado el libro ${id}`);
        }

        try {
            
            await removeDBUser(id);
            
            this.data = this.data.filter(usuario => usuario.id !== id);
        
        } catch (error) {
            console.error(`Error al eliminar el usuario con id: ${id}. Error: ${error}`);
        }
    }

    async changeUser(usuario) {

        const newUsusario = new User(usuario.id, usuario.nick, usuario.email, usuario.password);        
        const indiceUsuario = this.data.findIndex(usuario => usuario.id == newUsusario.id);
                
        if (indiceUsuario === -1) {
            throw new Error("El usuario que deseas modificar no existe.");
        }

        try {

            const { id, nick, email, password } = await changeDBUser(newUsusario);
            const usuarioModificado = new User(id, nick, email, password);
            
            this.data[indiceUsuario] = usuarioModificado;
            
            return usuarioModificado;
        } catch (error) {
            console.error(`Error al modificar el usuario: ${usuario}. Error: ${error}`);
        }
    }

    async changeUserPassword(id, newPass) {

        // Aquí se debería buscar el usuario con el método 'getDBUser()', pero no hay un handler encargado de eso, así que peta.
        const indiceUsuario = this.data.findIndex(u => u.id == id);

        if (indiceUsuario === -1) {
            throw new Error("El usuario que deseas modificar no existe.");
        }

        try {

            const userModiff = await changeDBUserPassword(id, newPass);
            const userInstance = new User(userModiff.id, userModiff.nick, userModiff.email, userModiff.password);
            
            this.data[indiceUsuario] = userInstance;

            return userInstance;
        } catch (error) {
            console.error(`Error al modificar la contraseña del usuario con id: ${id}. Error: ${error}`);
        }
    }


    toString() {
        return this.data.map(usuario => 
            `Id: ${usuario.id}. email: ${usuario.email}. nick: ${usuario.nick}. password: ${usuario.password}.`
        ).join('\n');
    }



    getUserById(userId) {
        return this.data.find(usuario => usuario.id === userId) || (() => { throw new Error("El usuario no existe.") })(); 
    }

    getUserIndexById(userId) {
        
        const indexUsuario = this.data.findIndex(usuario => usuario.id === userId);

        if (indexUsuario === -1) throw new Error("El usuario no existe.")

        return indexUsuario;
    }

    getUserByNickName(nick) {
        
        const usuario = this.data.find(usuario => usuario.nick === nick);

        if (!usuario) throw new Error("El usuario con el nickname " + nick + " no existe.");
        
        return usuario;
    }
}