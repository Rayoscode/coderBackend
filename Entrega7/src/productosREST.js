import options from "../options/mariaDB.js";
import { Router } from "express";
import ProductsDAO from "./ProductsDAO.js";

const router = Router();
const ProductosDB = new ProductsDAO("PRODUCTOS", options);
ProductosDB.createTable();

// ROUTER api

router.get("/productos", async (req, res) => {
    try {
        const objetos = await ProductosDB.selectProductos();
        res.render("ejs/productos.ejs", { objetos });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/productos", async (req, res) => {
    try {
        ProductosDB.insertProduct(req.body);
        res.render("ejs/productos.ejs", { datos });
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
