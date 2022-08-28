import {Router} from 'express'
import Producto from './producto';
const routerProductos = Router();
const ProductosDAO = require('./daos/producto/ProductosMongoDAO');
const mongoose = require('mongoose');
const ProductosModel = require('./models/ProductoModel')
const ProductosDB = new ProductosDAO("",ProductosModel.productosSchema,mongoose); 

routerProductos.get('/:id?',async (req,res)=>{
    const {id} = req.params;
    let datos;
    if(id === undefined){
        datos = await ProductosDB.readProduct();
        res.json(datos)
    } else {
        datos = await ProductosDB.readProduct(id)
        res.json(datos)
    }   
})

routerProductos.post('/', (req,res)=>{
    const {user} = req.query
    if(user === "Admin"){
    let productoAAgregar:Producto = req.body
    productoAAgregar.timestamp = Date.now()
    let idNew = ProductosDB.readLastID() + 1;
    productoAAgregar.id = idNew;
    console.log(productoAAgregar);
    ProductosDB.insertProduct(productoAAgregar);
    } else{
        res.json({Error:"Permisos denegados"});
    }
    
})

routerProductos.put(':id',(req,res)=>{
    let productoAModificar:Producto = req.body
    const {id} = req.params;
    const {user} = req.query;
    if(user==="Admin"){
    ProductosDB.updateProductByID(id,productoAModificar);
    } else {
        res.json({Error:"Permiso Denegado"});
    }
    
})

routerProductos.delete(':id',(req,res)=>{
    const {id} = req.params;
    const {user} = req.query
    if(user==="Admin"){
        ProductosDB.deleteByID(id);
    } else{
        res.json({Error:"Permiso Denegado"});
    }
})
export default routerProductos