import mongoose, { Schema } from "mongoose";

const productosCollection = 'productos'

const productosSchema = new mongoose.Schema({
    nombre: { type: String, require: true, max: 100 },
    id: Schema.Types.ObjectId,
    descripcion: { type: String, require: true },
    codigo: { type: String, require: true, },
    foto: { type: String, require: true },
    precio: { type: Number, require: true },
    stock: { type: Number, require: true },
    timestamp: { type: Number, require: true }
})

export const productos = mongoose.model(productosCollection, productosSchema)