import express from 'express'
import { faker } from '@faker-js/faker'
import MensajesDB from './db/mongoDBPersistence.js';
import { Server as ServerIO } from "socket.io";
import { Server } from "http";
import { normalize, schema } from 'normalizr';
import userLoginRoutes from './router/userRouter.js';
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import processRouter from './router/processRouter.js'
import parseArgs from 'yargs/yargs'

const yargs = parseArgs(process.argv.slice(2))

const { port } = yargs.alias({ p: "port" }).default({ port: 8080 }).argv

dotenv.config()
const app = express();
const httpServer = new Server(app);
const io = new ServerIO(httpServer);
const chatDB = new MensajesDB()

app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        mongoUrl: process.env.DBURL,

    }),
    secret: "entrega123",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 360000 }
}))

app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', userLoginRoutes)
app.use('/api/process', processRouter)

app.set("views", "./views");
app.set("view engine", "ejs");

httpServer.listen(port, () => {
    console.log("Server running at port:" + port + " 🥳")
})

app.get('/api/productos-test', (req, res) => {

    res.json([
        { title: faker.commerce.productName(), price: faker.commerce.price(), thumnail: faker.image.imageUrl() },
        { title: faker.commerce.productName(), price: faker.commerce.price(), thumnail: faker.image.imageUrl() },
        { title: faker.commerce.productName(), price: faker.commerce.price(), thumnail: faker.image.imageUrl() },
        { title: faker.commerce.productName(), price: faker.commerce.price(), thumnail: faker.image.imageUrl() },
        { title: faker.commerce.productName(), price: faker.commerce.price(), thumnail: faker.image.imageUrl() }])
})

app.get("/", (req, res) => {
    res.render("ejs/login.ejs")
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