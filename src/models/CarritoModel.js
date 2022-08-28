const mongoose = require('mongoose')

 const CarritoCollection = 'Carritos';

 const carritoSchema = new mongoose.Schema({
    id:{type:Number,require:true},
    timestamp:{type:Date,require:true},
    productos:{type:Array,require:true}
 })

module.exports = mongoose.model(CarritoCollection,carritoSchema);