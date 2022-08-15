const express = require ('express');
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const productosRouter = require('./productosREST')
const chatDAO = require('./ChatDAO')
let {options} = require('../options/sqliteDB')
const ProductsDAO = require('./ProductsDAO');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const chatDB = new chatDAO('MENSAJES',options)
chatDB.createTable();
const mod = require('../options/mariaDB');
const ProductosDB = new ProductsDAO('PRODUCTOS',mod.options);

const PORT = 8080;


httpServer.listen(PORT,()=>{
        console.log("Se inicio el server");
});


app.use('/api',productosRouter);
app.use(express.static('public'));
app.use(express.static('pages'))
app.get('/',(req,res)=>{
    res.sendFile( '/index.html')
})



app.get('/mensajes',async(req,res)=>{
    const mensajes = await chatDB.selectMessage();
    res.json(mensajes);
})

io.on('connection',async (socket)=>{

    socket.on('saveMessage',message =>{
        io.sockets.emit('currentChat',message);
        chatDB.insertMessage(message.mensaje,message.nombre)        
    })
    socket.on('nuevoProducto',async (producto)=>{
        ProductosDB.insertProduct(producto);
        io.sockets.emit('actualizarProductos',producto);
    })
})
