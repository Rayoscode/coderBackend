
const contenedor = require("./contenedorClass.js");
const express = require('express');
const {Router} = express;

const router = Router();
const ContenedorData = new contenedor.contenedor('./Productos.txt');
// ROUTER api

router.get('/productos',async (req,res)=> {
    const objetos = await ContenedorData.getAll();
    res.json(objetos);
})

router.get('/productos/:id',(req,res)=>{
    const {id} = req.params;
    ContenedorData.getById(id).then((obj)=>{res.json({result:'ok', objeto:obj})})
})

router.post('/productos', async (req,res)=>{
    ContenedorData.save(req.body).then(idN => { res.json({ nuevo : req.body, id:idN,result:'ok' })})
})

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