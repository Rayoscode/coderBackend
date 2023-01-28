import UsersDB from "../db/MongoUsersDB.js"
// import UsersLoggedDB from "../db/MongoUsersLogged.js"

class UserService {

    constructor() {
        this.users = new UsersDB('mongodb://localhost:27017/entrega8')
        // this.usersLogged = new UsersLoggedDB('mongodb://localhost:27017/entrega8')
    }

    async register(username, password) {

        try {
            await this.users.create(username, password)

        } catch (error) {
            throw new Error("Error Registro Usuario: " + error)
        }

    }

    async authenticate(username, password) {
        try {

            const userdata = await this.users.read(username);
            if (username === userdata[0].username && password === userdata[0].password) {
                return true
            } else {
                return false
            }
        } catch (error) {
            throw new Error('Error de Autenticacion: ' + error)
        }

    }

    async checkLogged(username) {



    }

    async deleteLogged(username) {

    }

}





export default UserService