
import mongoose from "mongoose";


const dbName = 'users'
const usersSchema = new mongoose.Schema({
    username: { type: String, strict: true, max: 20, unique: true },
    password: { type: String, strict: true, max: 20 },
    hash: { type: String },
    name:{type:String,strict:true,max:30},
    number:{type:String,strict:true,max:10},
    age:{type:String,strict:true},
    emai:{type:String,strict:true}

})

export const users = mongoose.model(dbName, usersSchema)
