import { Router } from "express";
import Service from "../services/serviceLogic.js";


const service = new Service()

const productos = Router();

productos.get('/:id?', async (req, res) => {
    const { id } = req.params
    res.json(await service.obtenerProductos(id))
})

productos.post('/', async (req, res) => {
    const { user } = req.query
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body
    const state = await service.altaProducto(nombre, descripcion, codigo, foto, precio, stock, user)
    if (state === -1) {
        res.json({ error: -1, descripcion: "ruta " + req.url + " metodo: post, no autorizada" })
    } else {
        res.json({ status: "ok" })
    }
})

productos.put('/:id', async (req, res) => {
    const { id } = req.params
    const { user } = req.query

    const { nombre, descripcion, codigo, foto, precio, stock } = req.body
    const state = await service.modificarProducto(nombre, descripcion, codigo, foto, precio, stock, parseInt(id), user)
    if (state === -1) {
        res.json({ error: -1, descripcion: "ruta " + req.url + " metodo: put, no autorizada" })
    } else {
        res.json({ status: "ok" })
    }

})

productos.delete('/:id', async (req, res) => {
    const { id } = req.params
    const { user } = req.query
    const state = await service.borrarProducto(parseInt(id), user)
    if (state === -1) {
        res.json({ error: -1, descripcion: "ruta " + req.url + " metodo: delete, no autorizada" })
    } else {
        res.json({ status: "ok" })
    }
})



export default productos