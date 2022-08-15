
const express = require('express');
const {options} = require('../options/mariaDB')
const {Router} = express;
const ProductsDAO = require('./ProductsDAO')
const router = Router();
const ProductosDB = new ProductsDAO('PRODUCTOS',options);
ProductosDB.createTable();

// ROUTER api

router.get('/productos',async (req,res)=> {
    const objetos = await ProductosDB.selectProductos();
    res.json(objetos);
})

router.get('/productos/:id',(req,res)=>{
    const {id} = req.params;
})

// TODO: Agregar select by id y devolverlo como respuesta

router.post('/productos', async (req,res)=>{
    try{
        ProductosDB.insertProduct(req.body);
        res.sendStatus(200);
    } catch(error){
        res.status(500).send(error)
    }
    
})

// TODO:Agregar Actualizar by id en el DAO

router.put('/productos/:id',(req,res)=>{
    const {id} = req.params;
    ContenedorData.getById(id).then((resp)=>{
        if(resp == undefined){
            res.send({error:"producto no encontrado"})
        } else{
            const object = {...req.body,id};
            ContenedorData.upgradeByID(object)
            res.json(object);
        }
    })
})

// TODO: Agregar delete by id

router.delete('/productos/:id',(req,res)=>{
    const {id} = req.params;
    ContenedorData.getById(id).then((resp)=>{
        if(resp == undefined){
            res.send({error:"producto no encontrado"})
        } else{

            ContenedorData.deleteByID(id);
            res.json({result:'ok'})
        }
    })
})

module.exports = router;