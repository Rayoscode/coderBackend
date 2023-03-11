import * as fs from 'fs/promises'

class ProductosPersistence {

    #filename
    constructor(filename) {

        this.#filename = filename
    }

    async getAll() {
        try {
            // Abre para comprobar si existe el file, si no existe en el catch se crea el file, si lo encuentra luego se cierra el descriptor.
            await (await fs.open(this.#filename)).close()
        } catch (error) {
            await fs.writeFile(this.#filename, JSON.stringify([], null, 2));
        }
        try {
            const data = await fs.readFile(this.#filename, 'utf-8');
            return JSON.parse(data);

        } catch (error) {
            throw new Error("Error de lectura:" + error)
        }
    }

    async save(Newproducto) {
        try {
            const productos = await this.getAll()
            const id = productos.length !== 0 ? productos[productos.length - 1] + 1 : 1
            productos.push({ ...Newproducto, id: id, timeStamp: Date.now() })
            await fs.writeFile(this.#filename, JSON.stringify(productos, null, 2))
            return id;
        } catch (error) {
            throw new Error("Error de creacion nuevo Producto" + error)
        }

    }

    async getById(id) {
        try {
            const productos = await this.getAll()
            let res = null
            productos.forEach(producto => {
                if (parseInt(producto.id) === parseInt(id)) {
                    res = producto
                }
            });
            return res;
        } catch (error) {
            throw new Error("Error Obtener id, " + id + ": " + error)
        }
    }

    async upgradeById(productoToChange) {
        try {
            const productos = await this.getAll()
            const index = productos.findIndex(producto => parseInt(producto.id) === productoToChange.id)
            productos[index] = productoToChange
            fs.writeFile(this.#filename, JSON.stringify(productos, null, 2))

        } catch (error) {
            throw new Error("Error Upgrade id, " + id + ": " + error)
        }
    }

    async deleteById(id) {
        try {
            const productos = await this.getAll()
            const index = productos.findIndex(producto => parseInt(producto.id) === id)
            productos.splice(index, 1)
            fs.writeFile(this.#filename, JSON.stringify(productos, null, 2))
        } catch (error) {
            throw new Error("Error Delete id," + id + ": " + error)
        }
    }

    async deleteAll() {
        try {
            fs.writeFile(this.#filename)
        } catch (error) {
            throw new Error("Error delete All: " + error)
        }
    }

}


export default ProductosPersistence