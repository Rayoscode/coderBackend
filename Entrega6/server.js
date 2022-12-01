const express = require("express")
const plantillas = require('./modules/plantillas')
const productos = require('./modules/productos')
const MensajesFile = require('./modules/mensajesFiles')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const Contenedor = require('./modules/contenedorClass')

const app = express()
const httpServer = HttpServer(app)
const io = new IOServer(httpServer)
const mensajesFile = new MensajesFile("Mensajes.txt")
const contenedorProductos = new Contenedor("productos.txt")
httpServer.listen(8080, () => {
    console.log("Comenzo el server en 8080")
})

app.use(express.static(__dirname + '/public'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/productos', productos)
app.use('/api/plantillas', plantillas)

// app.engine('hbs', handlebars.engine({
//     extname: '.hbs',
//     defaultLayout: 'index.hbs',
//     layoutsDir: __dirname + '/views/handlebars/layouts',
//     partialsDir: __dirname + '/views/handlebars/partials'
// }))


app.set('views', './views');
app.set('view engine', 'ejs');




app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/style', (req, res) => {
    res.sendFile(__dirname + '/public/style.css')
})

io.on('connection', async socket => {

    const mensajes = await mensajesFile.getMessages();
    const productos = await contenedorProductos.getAll();

    if (mensajes.length !== 0) {
        socket.emit('messages', mensajes)
    }
    if (productos.length !== 0) {
        socket.emit('productos', productos)
    }

    socket.on("sendMessage", async (data) => {
        let men = { nombre: data.nombre, mensaje: data.mensaje, date: new Date().toLocaleString() }
        await mensajesFile.saveMessage(men);
        mensajes.push(men);
        io.sockets.emit('messages', mensajes);
    })
    socket.on('newProducto', async (data) => {
        let prod = { title: data.title, thumbnail: data.thumbnail, price: data.price }
        const id = await contenedorProductos.save(prod);
        productos.push({ id: id, ...prod })
        io.sockets.emit('productos', productos)
    })


})