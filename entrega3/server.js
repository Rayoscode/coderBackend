const express = require("express")
const Contenedor = require("./contenedorClass")

const app = express()

const ContenedorDatos = new Contenedor("./productos.txt")

app.listen(8080,()=>{console.log("Server Iniciado en puerto 8080 🍀")})

app.get('/productos',async (req,res)=>{
    

    const objs = await ContenedorDatos.getAll()
    res.json(objs)
})
app.get('/productosRandom',async (req,res)=>{
    const objs = await ContenedorDatos.getAll();
    const id = Math.floor(Math.random()*objs.length)
    res.json(objs[id ])
})