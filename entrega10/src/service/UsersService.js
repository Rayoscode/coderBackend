import UsersDB from "../db/MongoUsersDB.js"
import bcrypt from 'bcrypt'

class UserService {

    constructor() {
        this.users = new UsersDB('mongodb://localhost:27017/entrega8')
    }

    async register(username, password) {

        try {

            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds)
            const pwdHash = await bcrypt.hash(password, salt)
            await this.users.create(username, password, pwdHash)

        } catch (error) {
            throw new Error("Error Registro Usuario: " + error)
        }

    }

    async authenticate(username, password) {
        try {

            const userdata = await this.users.read(username);
            const hashResult = await bcrypt.compare(password, userdata[0].hash)
            if (hashResult && username === userdata[0].username && password === userdata[0].password) {
                return true
            } else {
                return false
            }
        } catch (error) {
            throw new Error('Error de Autenticacion: ' + error)
        }

    }


}





export default UserService