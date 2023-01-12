import mongoose from "mongoose";

const dbName = 'entrega8'

const mensajesSchema = new mongoose.Schema({
    author: {
        id: String,
        nombre: String,
        apellido: String,
        edad: Number,
        alias: String,
        avatar: String

    },
    text: String

})

export const mensajes = mongoose.model(dbName, mensajesSchema)