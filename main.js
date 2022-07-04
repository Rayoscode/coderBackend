
const contenedor = require("./contenedorClass.js");
const express = require("express");


const app = express();
const server = app.listen(8080, ()=>{
        console.log("Se inició el server")
})

const ContenedorData = new contenedor.contenedor('./Productos.txt');
let objetos;

// Funciones

const getIntRandomArray = (length) =>{
    return    Number.parseInt(Math.random()*length);
}

const getObjetos = ()=>{
    
    ContenedorData.getAll().then((res)=>{ objetos = res});
    return objetos;
}
objetos = getObjetos();
// Event Error

server.on("error",(error)=>{console.log("Error:",error)})

// APP GET

app.get('/',(req,res)=>{
    res.send({mensaje:"Hola"})
})
app.get('/productos',(req,res)=>{
    res.send(objetos)

})

app.get('/productosRandom',(req,res)=>{
    const index =getIntRandomArray(objetos.length)
    res.send(objetos[index]);
})
