import mongoose from "mongoose";


const dbName = 'entrega9'
const usersSchema = new mongoose.Schema({
    username: { type: String, strict: true, max: 20, unique: true },
    password: { type: String, strict: true, max: 20 }

})

export const users = mongoose.model(dbName, usersSchema)