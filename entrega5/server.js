const express = require("express")
const plantillas = require('./modules/plantillas')
const productos = require('./modules/productos')
const app = express()



app.listen(8080, () => { console.log("Server Iniciado en puerto 8080 🍀") })


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