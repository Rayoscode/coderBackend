import express from 'express'
import { faker } from '@faker-js/faker'
import MensajesDB from './db/mongoDBPersistence.js';
import { Server as ServerIO } from "socket.io";
import { Server } from "http";
import { normalize, schema } from 'normalizr';

const app = express();
const httpServer = new Server(app);
const io = new ServerIO(httpServer);
const chatDB = new MensajesDB()

httpServer.listen(8080, () => {
    console.log("Server Started at: 8080 🤑")
})

app.use(express.static("public"));
app.use(express.json())
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("ejs/ingresoProducto.ejs")
})

app.get('/api/productos-test', (req, res) => {

    res.json([
        { title: faker.commerce.productName(), price: faker.commerce.price(), thumnail: faker.image.imageUrl() },
        { title: faker.commerce.productName(), price: faker.commerce.price(), thumnail: faker.image.imageUrl() },
        { title: faker.commerce.productName(), price: faker.commerce.price(), thumnail: faker.image.imageUrl() },
        { title: faker.commerce.productName(), price: faker.commerce.price(), thumnail: faker.image.imageUrl() },
        { title: faker.commerce.productName(), price: faker.commerce.price(), thumnail: faker.image.imageUrl() }])
})

io.on("connection", async (socket) => {

    const mensajes = await chatDB.read();

    if (mensajes.length !== 0) {
        socket.emit('messages', mensajes)
    }

    socket.on("sendMessage", async (message) => {

        await chatDB.save({ author: { id: message.id, nombre: message.nombre, apellido: message.apellido, edad: message.edad, alias: message.alias, avatar: message.avatar }, text: message.mensaje });
        let men = { id: "Mensajes Prueba", mensajes: [... await chatDB.read()] };
        const schemaMessage = new schema.Entity('text');
        const schemaAuthors = new schema.Entity('author', { 'text': schemaMessage }, { idAttribute: "id" })

        const schemaChat = new schema.Entity('chat', {
            'mensajes': [schemaMessage],
            'author': schemaAuthors,
            'mensaje': schemaMessage,
        })
        let normalizedmen = normalize(men, schemaChat);
        console.log(normalizedmen);
        io.sockets.emit("messages", normalizedmen);
    });
})