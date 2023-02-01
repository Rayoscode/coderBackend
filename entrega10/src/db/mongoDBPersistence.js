import mongoose from "mongoose";
import { mensajes } from "./schema/mensajesSchema.js";

const URL = 'mongodb://localhost:27017/entrega8'

class MensajesDB {
    constructor() { }

    async read(id) {

        try {
            await mongoose.connect(URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            if (id === undefined) {
                return await mensajes.find({})
            } else {
                return await mensajes.find({ id: id })
            }
        } catch (error) {
            throw new Error('Error read:' + error)
        } finally {
            await mongoose.disconnect()
        }

    }
    async save(mensaje) {
        try {
            await mongoose.connect(URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            await mensajes.create({ ...mensaje })
        } catch (error) {
            throw new Error('Error save:' + error)

        } finally {
            await mongoose.disconnect()
        }
    }
}

export default MensajesDB