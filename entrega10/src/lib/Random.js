
process.on('message', (message) => {
    // Instancia un diccionario
    const map = new Map()
    // const numberArray = []
    // Inicio los contadores en 0
    for (let i = 0; i < 1000; i++) {
        map.set(i, 0)
        // numberArray.push(0)
    }

    // Cuento cuantos numeros aleatorios aparecen por la cantidad pasada por paramentro
    for (let i = 0; i < message.cantidad; i++) {
        // Genero el numero aleatorio
        const RandomNumber = parseInt(Math.random() * 1000);
        // Incremento la cantidad de veces que ese numero apareceio
        map.set(RandomNumber, (map.get(RandomNumber) + 1))
        // numberArray[RandomNumber]++
    }
    const res = {}
    map.forEach((value, key) => {
        res[key] = value
    })
    process.send(res)
    process.exit()
})



