import express from "express";
import { Server } from "http";
import { Server as ServerIO } from "socket.io";
import productosRouter from "./productosREST.js";
import ChatDAO from "./ChatDAO.js";
import options from "../options/sqliteDB.js";
import ProductsDAO from "./ProductsDAO.js";
import optionsProd from "../options/mariaDB.js";
import dotenv from 'dotenv'

dotenv.config()
const app = express();
const httpServer = new Server(app);
const io = new ServerIO(httpServer);
const chatDB = new ChatDAO("MENSAJES", options);
chatDB.createTable();
const ProductosDB = new ProductsDAO("PRODUCTOS", optionsProd);

const PORT = process.env.PORT;

httpServer.listen(PORT, () => {
    console.log("Se inicio el server");
});

app.use("/api", productosRouter);
app.use(express.static("public"));
app.use(express.static("pages"));

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("ejs/ingresoProducto.ejs");
});

io.on("connection", async (socket) => {

    const mensajes = await chatDB.selectMessage();
    const productos = await ProductosDB.selectProductos();

    if (mensajes.length !== 0) {
        socket.emit('messages', mensajes)
    }
    if (productos.length !== 0) {
        socket.emit('productos', productos)
    }

    socket.on("sendMessage", async (message) => {

        await chatDB.insertMessage(message.mensaje, message.nombre);
        let men = await chatDB.selectMessage()
        io.sockets.emit("messages", men);
    });
});
