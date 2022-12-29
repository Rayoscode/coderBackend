import mongoose, { Schema } from "mongoose";

const carritosCollection = 'carritos'

const carritosSchema = new mongoose.Schema({
    id: Schema.Types.ObjectId,
    timestamp: { type: Number, require: true },
    productos: []
})

export const carrito = mongoose.model(carritosCollection, carritosSchema)