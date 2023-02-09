import express from 'express'
import processRouter from '../routes/processRouter.js'

function server() {

    const app = express()

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use('/process', processRouter)

    app.listen(8080, () => {
        console.log('Express Server listening on port 8080 😋')
    })

}

server();