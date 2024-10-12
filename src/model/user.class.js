export default class User {

    constructor(id, nick, email, password) {
        this.id = id;
        this.nick = nick;
        this.email = email;
        this.password = password;
    }

    toString() {
        return `Usuario: ${this.id} - ${this.nick} - ${this.email} - ${this.password}`;
    }
}