import { Router } from "express";


const undefinedRoutes = Router()


undefinedRoutes.get('/', (req, res) => {
    res.json({ error: -2, descripcion: 'ruta ' + req.url + ' por metodo get, no implementado' })
})


undefinedRoutes.post('/', (req, res) => {
    res.json({ error: -2, descripcion: 'ruta ' + req.url + ' por metodo post, no implementado' })
})

undefinedRoutes.put('/', (req, res) => {
    res.json({ error: -2, descripcion: 'ruta ' + req.url + ' por metodo put, no implementado' })
})

undefinedRoutes.put('/', (req, res) => {
    res.json({ error: -2, descripcion: 'ruta ' + req.url + ' por metodo delete, no implementado' })
})


export default undefinedRoutes