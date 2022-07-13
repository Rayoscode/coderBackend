
// REQUIRE

const contenedor = require("./contenedorClass.js");
const express = require("express");
const {Router} = express;


const app = express();
const router = Router();
const server = app.listen(8080, ()=>{
        console.log("Se inició el server")
})

const ContenedorData = new contenedor.contenedor('./Productos.txt');
let objetos;

// FUNCIONES

const getIntRandomArray = (length) =>{
    return    Number.parseInt(Math.random()*length);
}

const getObjetos = ()=>{
    
    ContenedorData.getAll().then((res)=>{ objetos = res});
    return objetos;
}
objetos = getObjetos();

// ERROR EVENT

server.on("error",(error)=>{console.log("Error:",error)})

// MIDDLEWARE

app.use('/static',express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use('/api',router);

// APP GET

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/index.html')
    
})
app.get('/style.css', function(req, res) {
    res.sendFile(__dirname + "/public/style.css");
});

app.get('/productos',async (req,res)=>{
    const objetos = await ContenedorData.getAll();
    res.send(objetos);

})

app.get('/productosRandom',(req,res)=>{
    const index =getIntRandomArray(objetos.length)
    res.send(objetos[index]);
})

// ROUTER api

router.get('/productos',(req,res)=>{
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


