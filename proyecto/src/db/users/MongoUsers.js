import mongoose from "mongoose"
import { users } from "../schema/UserSchema.js"


class UsersDB {

    constructor(URL) {
        this.URL = URL
    }

    async create(userData) {
        try {
            await mongoose.connect(this.URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })

            await users.create({ ...userData })

        } catch (error) {
            throw new Error('Error create User Collection:' + error)

        } finally {
            await mongoose.disconnect()
        }
    }

    async read(username) {
        try {
            await mongoose.connect(this.URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            if (username !== undefined) {
                return await users.find({ username: username })
            } else {
                return await users.find()
            }


        } catch (error) {
            throw new Error('Error read:' + error)

        } finally {
            await mongoose.disconnect()
        }

    }

    async delete() {
        try {
            await mongoose.connect(this.URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })

        } catch (error) {
            throw new Error('Error delete:' + error)

        } finally {
            await mongoose.disconnect()
        }

    }

    async upgrade() {
        try {

        } catch (error) {
            throw new Error('Error upgrade:' + error)

        } finally {
            await mongoose.disconnect()
        }

    }

}


export default UsersDB