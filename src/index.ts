import express from "express";
import {Router} from 'express'
import carritoRouter from "./carritoRouter";
import routerProductos from "./productosRouter";

const app = express();


app.listen(8080, ()=>{
    console.log("Se inicio el server en el puerto: 8080");
})

app.on("Error",(error)=>{
    console.log("Ocurrio un error:" + error)
})


app.use(express.static('public'))
app.use('/api/productos',routerProductos)
// app.use('/api/carrito',carritoRouter)



app.get('/',(req,res)=>{
    res.sendFile('./index.html')
})

app.get('/style.css',(req,res)=>{
    res.sendFile('style.css')
})