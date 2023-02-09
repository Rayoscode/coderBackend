import { Router } from "express";
import { fork } from 'child_process'
import os from 'os'
import path from "path";


const processRouter = Router()



processRouter.get('/info', (req, res) => {
    res.json({ argv: process.argv, os: os.platform(), node: process.version, mem: process.memoryUsage(), path: process.cwd(), pid: process.pid, fpath: path.basename(process.execPath), cpus: os.cpus.length })
})

processRouter.get('/random', (req, res) => {
    const cantidad = req.query.cantidad === undefined ? 20000 : res.query.cantidad
    const child = fork(path.resolve(process.cwd(), './src/lib/Random.js'))
    child.on('message', (message) => {

        res.json(message)
    })
    child.send({ cantidad: cantidad })

})

export default processRouter