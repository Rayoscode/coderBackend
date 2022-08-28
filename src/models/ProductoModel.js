const mongoose = require('mongoose');

const ProductosCollection = 'Productos';


const ProductosSchema = new mongoose.Schema({
    id:{type:Number,require:true},
    timestamp:{type:Date,require:true},
    nombre:{type:String,require:true,max:30},
    description:{type:String,require:true,max:100},
    codigo:{type:String,require:true,max:10},
    foto:{type:String,require:true,max:100},
    precio:{type:Number,require:true},
    stock:{type:Number,require:true}
})


module.exports = mongoose.model(ProductosCollection,ProductosSchema)


