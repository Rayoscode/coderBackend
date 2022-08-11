
import {Router} from 'express';
import ContenedorCarritos from './CarritoFile';
import Carrito from './carrito'
import Producto from './producto';
import ContenedorProductos from './ProductosFile';
const carritoRouter = Router();

const CarritosData = new ContenedorCarritos('../carritos.txt');
const ProductosData = new ContenedorProductos('../productos.txt');

carritoRouter.get('/:id/pruductos',async (req,res)=>{
    const {id} = req.params
    const carrito = await CarritosData.getById(id)
    res.json(carrito)

})

carritoRouter.delete('/:id',(req,res)=>{
    const {id} = req.params
    CarritosData.deleteByID(id)
})

carritoRouter.post('/',async(req,res)=>{
    let carritoNuevo : Carrito = {timestamp:Date.now(),productos:[] };
    carritoNuevo.id = await CarritosData.save(carritoNuevo);
    
})


carritoRouter.post("/:id/productos",async (req,res)=>{
    const {id} = req.params
    let carrito : Carrito = await CarritosData.getById(id)
    let producto : Producto = await ProductosData.getById(req.body.idToAdd)
    carrito.productos.push(producto)
    CarritosData.upgradeByID(carrito)
    
})
carritoRouter.delete("/:id/productos/:id_prod",async (req,res)=>{
    const {id , id_prod} = req.params
    let carrito: Carrito = await CarritosData.getById(id)
    for(let i=0;i< carrito.productos.length ; i++){
        if(carrito.productos[i] === id_prod){
            carrito.productos.splice(i,1)
        }
    }
    CarritosData.upgradeByID(carrito)
})

export default carritoRouter