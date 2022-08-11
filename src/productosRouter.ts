import {Router} from 'express'
import Producto from './producto';
import ContenedorProductos from './ProductosFile';
const routerProductos = Router()

const ContenedorDatos = new ContenedorProductos("../productos.txt");

routerProductos.get('/:id?',async (req,res)=>{
    const {id} = req.params;
    if(id === undefined){
        const objetos = await ContenedorDatos.getAll()
        res.json(objetos)
    } else {
        const objeto = await ContenedorDatos.getById(id)
        res.json(objeto)
    }   
})

routerProductos.post('/', (req,res)=>{
    const {user} = req.query
    if(user === "Admin"){
    const productoAAgregar:Producto = req.body
    productoAAgregar.timestamp = Date.now()
    ContenedorDatos.save(productoAAgregar);
    } else{
        res.json({Error:"Permisos denegados"})
    }
    
})

routerProductos.put(':id',(req,res)=>{
    let productoAModificar:Producto = req.body
    const {id} = req.params;
    const {user} = req.query;
    if(user==="Admin"){
    productoAModificar.id=id
    ContenedorDatos.upgradeByID(productoAModificar)
    } else {
        res.json({Error:"Permiso Denegado"})
    }
    
})

routerProductos.delete(':id',(req,res)=>{
    const {id} = req.params;
    const {user} = req.query
    if(user==="Admin"){
        ContenedorDatos.deleteByID(id)
    } else{
        res.json({Error:"Permiso Denegado"})
    }
})

const p1 : Producto = {timestamp:Date.now(),nombre:"Procesador Intel I9",descripcion:"Tiene muchos nucleos",foto:"https://http2.mlstatic.com/D_NQ_NP_940351-MLA48284640865_112021-O.webp",precio:256000,stock:20,codigo:"E-0001"}
ContenedorDatos.save(p1);

export default routerProductos