import { Router } from "express";
import Service from "../services/serviceLogic.js";


const service = new Service()

const carrito = Router()

carrito.get('/:id/productos', async (req, res) => {
    const { id } = req.params
    const carritoToSend = await service.obtenerCarrito(parseInt(id))
    if (carritoToSend === -1) {
        res.json({ error: "Carrito Not found" })
    } else {
        res.json(carritoToSend)
    }

})

carrito.post('/', async (req, res) => {
    const id = await service.nuevoCarrito()
    res.json({ id: id })

})

carrito.delete('/:id', (req, res) => {
    const { id } = req.params
    service.borrarCarrito(id)
    res.json({ status: 'ok' })
})


carrito.post('/:id_carrito/productos/:id_prod', (req, res) => {
    const { id_prod, id_carrito } = req.params
    service.agregarProductoACarrito(id_carrito, id_prod)

})

carrito.delete('/:id/productos/:id_prod', (req, res) => {
    const { id, id_prod } = req.params
    service.borrarProductoDeCarrito(id, id_prod)
})

export default carrito