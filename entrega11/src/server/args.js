import parseArgs from 'yargs'

const yargs = parseArgs(process.argv.slice(2))

const args = yargs.alias({
    m: "mode",
    p: "port"
}).default({
    mode: "FORK",
    port: 8080
}).argv


export default args