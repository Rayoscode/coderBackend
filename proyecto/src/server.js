import express from 'express'
import * as dotenv from 'dotenv'
import carrito from './routers/carrito.js'
import productos from './routers/productos.js'
import undefinedRoutes from './routers/undefinedRoutes.js'
import { session } from 'passport'
import sessionConfig from './config/passportConfig.js'
dotenv.config()

const app = express()

app.use(session(sessionConfig))
app.use()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api/carritos', carrito)
app.use('/api/productos', productos)
app.use('*',undefinedRoutes)

app.listen(parseInt(process.env.PORT), () => {
    console.log("Ejecutando Server en puerto: " + process.env.PORT)
})