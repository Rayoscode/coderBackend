

const express = require('express');
const { Router } = express;
const Contenedor = require("./contenedorClass");

const ContenedorData = new Contenedor('./Productos.txt');
const router = Router();


router.get('/pug/productos', (req, res) => {
    res.render('pug/formProductos.pug');
});


router.post('/pug/productos', async (req, res) => {
    const datos = await ContenedorData.getAll();
    let idnew = await ContenedorData.save(req.body);
    datos.push({ id: idnew, ...req.body })
    res.render('pug/productos.pug', { datos });
})

router.get('/ejs/productos', (req, res) => {
    res.render('ejs/ingresoProducto.ejs');
})


router.post('/ejs/productos', async (req, res) => {

    const datos = await ContenedorData.getAll();
    let idnew = await ContenedorData.save(req.body);
    datos.push({ id: idnew, ...req.body })
    res.render('ejs/productos.ejs', { datos });
})

router.get('/handlebars/productos', (req, res) => {
    res.render('handlebars/main.hbs');
})

router.post('/handlebars/productos', async (req, res) => {

    const datos = await ContenedorData.getAll();
    let idnew = await ContenedorData.save(req.body);
    datos.push({ id: idnew, ...req.body })
    res.render('handlebars/productos.hbs', { datos });
})


module.exports = router; 