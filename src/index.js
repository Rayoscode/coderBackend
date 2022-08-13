const express = require ('express');
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");


const app = express();
const httpServer = new HttpServer(app);

const PORT = 8080;


httpServer.listen(PORT,()=>{
        console.log("Se inicio el server")
});



io.on('connection',async (socket)=>{

    socket.on('saveMessage',message =>{
        mensajes.push(message);
        io.sockets.emit('currentChat',mensajes);
    })
    socket.on('nuevoProducto',async (producto)=>{
        ContenedorData.save(producto);
        io.sockets.emit('actualizarProductos',await ContenedorData.getAll());
    })
})
