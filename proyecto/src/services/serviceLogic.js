import CarritosPersistence from "../db/file/carritoPersistence.js"
import ProductosPersistence from "../db/file/productosPersistence.js";



class Service {
    #CarritosFile
    #ProductosFile
    constructor() {
        this.#CarritosFile = new CarritosPersistence('Carritos.txt');
        this.#ProductosFile = new ProductosPersistence('Productos.txt')
    }

    async obtenerProductos(id) {
        if (id !== undefined) {
            return await this.#ProductosFile.getById(id)
        } else {
            return await this.#ProductosFile.getAll()

        }

    }
    async altaProducto(nombre, descripcion, codigo, foto, precio, stock, user) {
        if (parseInt(user) === 1) {
            this.#ProductosFile.save({ nombre: nombre, descripcion: descripcion, codigo: codigo, foto: foto, precio: precio, stock: stock })
            return 0
        } else {
            return -1;
        }
    }

    async modificarProducto(nombre, descripcion, codigo, foto, precio, stock, id, user) {
        if (parseInt(user) === 1) {
            await this.#ProductosFile.upgradeById({ nombre: nombre, descripcion: descripcion, codigo: codigo, foto: foto, precio: precio, stock: stock, id: id })
            return 0;
        } else {
            return -1;
        }
    }

    async borrarProducto(id, user) {
        if (parseInt(user) === 1) {
            await this.#ProductosFile.deleteById(id)
            return 0
        } else {
            return -1
        }
    }

    async obtenerCarrito(id) {
        const carrito = await this.#CarritosFile.getCarrito(id)
        return carrito === null ? -1 : carrito;
    }

    async nuevoCarrito() {
        return await this.#CarritosFile.newCarrito()
    }

    async borrarCarrito(id) {
        await this.#CarritosFile.deleteCarrito(id)
    }

    async agregarProductoACarrito(idCarrito, idProd) {
        const producto = await this.#ProductosFile.getById(idProd)
        this.#CarritosFile.addProductoToCarrito(idCarrito, producto)
    }

    async borrarProductoDeCarrito(id, id_prod) {
        this.#CarritosFile.deleteProductoFromCarrito(id, id_prod)

    }
}

export default Service