
import {Router} from 'express';

import CarritoMongoDAO from './daos/carrito/CarritoMongoDAO'
import ProductosMongoDAO from './daos/producto/ProductosMongoDAO'

const ProductosDB = new ProductosMongoDAO("");
const CarritoDB = new CarritoMongoDAO("");

const carritoRouter = Router();


carritoRouter.get('/:id/pruductos',async (req,res)=>{
    const {id} = req.params;
    const carrito = await CarritoDB.readCarrito(Number.parseInt(id));
    res.json(carrito.productos);
    
})

carritoRouter.delete('/:id',(req,res)=>{
    const {id} = req.params;
    CarritoDB.deleteCarrito(Number.parseInt(id));
    
})

carritoRouter.post('/',async(req,res)=>{
    try{
        CarritoDB.createCarrito();
        res.json({status:"Se creo con exito el carrito"})
    }  catch(error){
        res.json(error)
    }  
})


carritoRouter.post("/:id/productos",async (req,res)=>{
    const {id} = req.params;
    const idProducto = req.body;
    const producto = await ProductosDB.readProducts(idProducto);
    // ASUMO QUE SE PASA POR POST EL ID DEL PRODUCTO A AGREGAR
    CarritoDB.insertProductoEnCarrito(Number.parseInt(id),producto);
    
})

carritoRouter.delete("/:id/productos/:id_prod",async (req,res)=>{
    const {id , id_prod} = req.params;
    CarritoDB.deleteProductoEnCarrito(Number.parseInt(id),Number.parseInt(id_prod));
})

export default carritoRouter