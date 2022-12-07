import express from 'express'
import * as dotenv from 'dotenv'
import carrito from './routers/carrito.js'
import productos from './routers/productos.js'

dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api/carritos', carrito)
app.use('/api/productos', productos)


app.listen(parseInt(process.env.PORT), () => {
    console.log("Ejecutando Server en puerto: " + process.env.PORT)
})


app.get('*', (req, res) => {
    res.json({ error: -2, descripcion: 'ruta ' + req.url + ' por metodo get, no implementada' })
})


app.post('*', (req, res) => {
    res.json({ error: -2, descripcion: 'ruta ' + req.url + ' por metodo post, no implementada' })
})

app.put('*', (req, res) => {
    res.json({ error: -2, descripcion: 'ruta ' + req.url + ' por metodo put, no implementada' })
})

app.put('*', (req, res) => {
    res.json({ error: -2, descripcion: 'ruta ' + req.url + ' por metodo delete, no implementada' })
})