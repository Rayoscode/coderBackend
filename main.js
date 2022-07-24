
// REQUIRE

const contenedor = require("./modules/contenedorClass.js");
const express = require("express");
const {Router} = express;
const plantillas = require('./modules/plantillasClass');
const productosRouter = require("./modules/productosREST");
const handlebars = require('express-handlebars');


const app = express();
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
app.use('/api',productosRouter);
app.use('/api/plantillas', plantillas);

// View Engine

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/handlebars/layouts',
    partialsDir: __dirname + '/views/handlebars/partials'
}))



app.set('views','./views'); // PARA VER PUG Y EJS SE CAMBIA A ./views
app.set('view engine','hbs');

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

app.get('/datos',(req,res)=>{
    res.render('ejemplo');
})

