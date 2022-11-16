const express = require("express")

const productos = require('./modules/productos')
const app = express()



app.listen(8080, () => { console.log("Server Iniciado en puerto 8080 🍀") })


app.use(express.static(__dirname + '/public'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/productos', productos)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})