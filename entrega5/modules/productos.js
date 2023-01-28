
const express = require('express')
const Contenedor = require("./contenedorClass")



const routerProductos = express.Router()
const ContenedorDatos = new Contenedor("./productos.txt")


routerProductos.get('/', async (req, res) => {
    const objs = await ContenedorDatos.getAll()
    res.json(objs)
})


routerProductos.get('/:id', async (req, res) => {
    const { id } = req.params
    const obj = await ContenedorDatos.getById(parseInt(id))
    res.json(obj)

})

routerProductos.post('/', async (req, res) => {
    console.log(req.body)
    const { title, price, thumbnail } = req.body
    const id = await ContenedorDatos.save({ title: title, thumbnail: thumbnail, price: price })
    res.json(id)

})

routerProductos.put('/:id', (req, res) => {
    const { id } = req.params
    const { title, price, thumbnail } = req.body
    ContenedorDatos.upgradeById({ title: title, thumbnail: thumbnail, price: price, id: parseInt(id) })


})

routerProductos.delete('/:id', (req, res) => {

    const { id } = req.params
    ContenedorDatos.deleteByID(parseInt(id))
})

routerProductos.get('/random', async (req, res) => {
    const objs = await ContenedorDatos.getAll();
    const id = Math.floor(Math.random() * objs.length)
    res.json(objs[id])
})





module.exports = routerProductos