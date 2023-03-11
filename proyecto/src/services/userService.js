import UsersDB from "../db/MongoUsers.js"
import bcrypt from 'bcrypt'

class UserService {

    constructor() {
        this.users = new UsersDB(process.env.MONGO_URL)
    }

    async register(dataUser) {

        try {

            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds)
            const pwdHash = await bcrypt.hash(dataUser.password, salt)
            await this.users.create({passwordHash: pwdHash,...dataUser} )

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
