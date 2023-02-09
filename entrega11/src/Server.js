import cluster from 'cluster'
import os from 'os'
import express from 'express'
import processRouter from './routes/processRouter.js'
import args from './server/args.js'



const cpus = os.cpus().length

if (args.mode === 'FORK') {
    console.log("pasando por aca")
    // const child = fork(path.resolve(process.cwd(), './src/server/ExpressServer.js'))
    server()

} else if (args.mode === 'CLUSTER') {

    console.log('Cluster mode Selected')
    // Father process forks to the expressServer file that executes server, so the childs in this file doesn't do nothing.
    if (cluster.isPrimary) {
        for (let i = 0; i < cpus; i++) {
            cluster.fork()
        }
        cluster.on('exit', Worker => {
            cluster.fork()
        })
    } else {
        server();
    }
} else {
    console.log('Error on argument process: Argument not valid')
    process.exit(-1)
}



function server() {

    const app = express()

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use('/process', processRouter)

    app.listen(args.port, () => {
        console.log('Express Server listening on port 8080 😋')
    })

}
