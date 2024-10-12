import User from './user.class'

export default class Users {

    constructor() {
        this.data = [];
    }

    populate(datos) {
        this.data = datos.map(dato => new User(dato.id, dato.nick, dato.email, dato.password));
    }

    addUser(nuevoUsuario) {
        
        nuevoUsuario.id = (this.data.length > 0 ? Math.max(...this.data.map(usuario => usuario.id)) : 0) + 1;
        
        const newUser = new User(nuevoUsuario.id, nuevoUsuario.nick, nuevoUsuario.email, nuevoUsuario.password);

        this.data.push(newUser);

        return newUser;
    }

    removeUser(id) {

        if (!this.data.find(usuario => usuario.id === id)) {
            throw new Error("El usuario con id " + id + " no existe.");
        }

        this.data = this.data.filter(usuario => usuario.id !== id);
    }

    changeUser(usuario) {

        const newUsusario = usuario instanceof User ? usuario : new User(usuario.id, usuario.nick, usuario.email, usuario.password);
        const indiceUsuario = this.data.findIndex(usuario => usuario.id == newUsusario.id);
                
        if (indiceUsuario === -1) {
            throw new Error("El usuario que deseas modificar no existe.");
        }

        this.data[indiceUsuario] = newUsusario;
        
        return newUsusario;
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