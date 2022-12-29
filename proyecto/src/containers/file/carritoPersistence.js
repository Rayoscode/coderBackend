import * as fs from 'fs/promises'


class CarritosPersistence {
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

    async newCarrito() {
        try {
            const carritos = await this.getAll()
            const id = carritos.length !== 0 ? carritos[carritos.length - 1] + 1 : 1
            carritos.push({ id: id, timeStamp: Date.now(), productos: [] })
            fs.writeFile(this.#filename, JSON.stringify(carritos, null, 2))
            return id;
        } catch (error) {
            throw new Error("Error al Agregar nuevo Carrito: " + error)
        }
    }

    async getCarrito(id) {
        try {

            const carritos = await this.getAll();
            let res = null
            carritos.forEach(carrito => {
                if (parseInt(carrito.id) === id) {
                    res = carrito;
                }
            });
            return res

        } catch (error) {
            throw new Error("Error obtener carrido id: " + id + ", Error: " + error)
        }
    }

    async deleteCarrito(id) {
        try {
            const carritos = await this.getAll();
            const index = carritos.findIndex(carrito => parseInt(carrito.id) === id)
            carritos.splice(index, 1)
            fs.writeFile(this.#filename, JSON.stringify(carritos, null, 2))

        } catch (error) {
            throw new Error("Error obtener carrido id: " + id + ", Error: " + error)
        }
    }

    async addProductoToCarrito(id, producto) {
        try {
            const carritos = await this.getAll();
            const index = carritos.findIndex(carrito => parseInt(carrito.id) === parseInt(id))
            console.log(index)
            carritos[index].productos.push(producto)
            await fs.writeFile(this.#filename, JSON.stringify(carritos, null, 2))
        } catch (error) {
            throw new Error("Error agregar producto en carrito id:" + id + "Error: " + error)
        }
    }

    async deleteProductoFromCarrito(idCarrito, idProd) {
        try {
            const carritos = await this.getAll();
            const index = carritos.findIndex(carrito => parseInt(carrito.id) === parseInt(idCarrito))
            const indexProd = carritos[index].productos.findIndex(producto => parseInt(producto.id) === parseInt(idProd))
            carritos[index].productos.splice(indexProd, 1)
            await fs.writeFile(this.#filename, JSON.stringify(carritos, null, 2))
        } catch (error) {
            throw new Error("Error eliminar producto: " + idProd + " en carrito id:" + idCarrito + "Error: " + error)
        }
    }
}

export default CarritosPersistence