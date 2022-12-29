import express from 'express'
import * as dotenv from 'dotenv'
import carrito from './routers/carrito.js'
import productos from './routers/productos.js'
import ProductosMongoDBContainer from './containers/productos/ProductosMongoContainer.js'
import CarritoMongoDBContainer from './containers/carritos/CarritoMongoContainer.js'
dotenv.config()
const app = express()


let productoContainer = new ProductosMongoDBContainer()
let carritoContainer = new CarritoMongoDBContainer()


console.log(process.env.DBAAS)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api/carritos', carrito)
app.use('/api/productos', productos)


app.listen(parseInt(process.env.PORT), () => {
    console.log("Ejecutando Server en puerto: " + process.env.PORT)
})


app.get('*', (req, res) => {
    res.json({ error: -2, descripcion: 'ruta ' + req.url + ' por metodo get, no implementado' })
})


app.post('*', (req, res) => {
    res.json({ error: -2, descripcion: 'ruta ' + req.url + ' por metodo post, no implementado' })
})

app.put('*', (req, res) => {
    res.json({ error: -2, descripcion: 'ruta ' + req.url + ' por metodo put, no implementado' })
})

app.put('*', (req, res) => {
    res.json({ error: -2, descripcion: 'ruta ' + req.url + ' por metodo delete, no implementado' })
})

console.log(productoContainer)
console.log(carritoContainer)
// productoContainer.create({ nombre: "Cosa", descripcion: "Esta en cualquier", precio: 111, stock: 5, codigo: "C-0002", foto: "url1", timestamp: Date.now() }).then(() => { console.log('creado') })

productoContainer.read(null).then((res) => {
    console.log(res)
    productoContainer.upgrade(res[0].id, { nombre: "Escalera" })
})


