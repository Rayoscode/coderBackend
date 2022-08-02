
// REQUIRE

const contenedor = require("./modules/contenedorClass.js");
const express = require("express");
const {Router} = express;
const plantillas = require('./modules/plantillasClass');
const productosRouter = require("./modules/productosREST");
const handlebars = require('express-handlebars');
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");


const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const ContenedorData = new contenedor.contenedor('./Productos.txt');
let objetos;

httpServer.listen(8080,()=>{
        console.log("Se inicio el server")
});
// FUNCIONES

const getObjetos = ()=>{
    
    ContenedorData.getAll().then((res)=>{ objetos = res});
    return objetos;
}
objetos = getObjetos();

// ERROR EVENT

httpServer.on("error",(error)=>{console.log("Error:",error)})

// MIDDLEWARE


app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use('/api',productosRouter);
app.use('/api/plantillas', plantillas);

// View Engine

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/handlebars/layouts',
    partialsDir: __dirname + '/views/handlebars/partials'
}))


app.set('views','./views'); 
app.set('view engine','ejs'); // Para ver pug cambiar a pug y lo mismo para ejs
// app.use('/static',express.static(__dirname + '/public'));
app.use(express.static('public'));
// APP GET

app.get('/',(req,res)=>{
    res.sendFile('./index.html',{root:__dirname });
})

app.get("/chat",(req,res)=>{
    res.sendFile('./public/chat.html',{root:__dirname});
})

app.get('/style.css',(req,res)=>{
    res.sendFile('./style.css');
})

app.get('/productos',(req,res)=>{
    res.sendFile(__dirname + '/Productos.txt');
})

// IO - SOCKET

let mensajes=[];

io.on('connection',async (socket)=>{
    // socket.on('actualizarProductos',async (producto) =>{
    //     ContenedorData.save(producto);
    //     const productos = await ContenedorData.getAll();
    //     await io.sockets.emit('recibidoProductos',productos);
    // })

    socket.on('saveMessage',message =>{
        mensajes.push(message);
        io.sockets.emit('currentChat',mensajes);
    })
    socket.on('nuevoProducto',async (producto)=>{
        ContenedorData.save(producto);
        io.sockets.emit('actualizarProductos',await ContenedorData.getAll());
    })
})

