import admin from 'firebase-admin'
import * as fireBaseDBConfig from '../config/backendcoder-f473e-firebase-adminsdk-7itja-e4d182298b.json'

class ProductosFireBaseContainer {
    // Defino los atributos privados para las instancias de firebase 
    #db
    #query
    constructor() {

        admin.initializeApp({
            credential: admin.credential.cert(fireBaseDBConfig),
            databaseURL: "" // DB URL
        })

        this.#db = admin.firestore()
        this.#query = this.#db("Productos")
    }

    async create(dataProducto) {
        try {
            const doc = this.#query.doc()
            await doc.create({ ...dataProducto })
        } catch (error) {
            throw new Error('Error creando Firebase element:' + error)
        }
    }

    async read(id) {
        try {
            if (id === undefined || id === null) {
                const snapShotFB = await this.#query.get()
                const res = snapShotFB.docs;
                let element = res.map((doc) => ({ id: doc.id, nombre: doc.nombre, descripcion: doc.descripcion, codigo: doc.codigo, foto: doc.foto, precio: doc.precio, stock: doc.stock, timestamp: doc.timestamp }))
                return element
            } else {
                const doc = await this.#query.doc(id)
                const response = doc.get()
                const element = response.data()
                return element;
            }

        } catch (error) {
            throw new Error('Error Lectura elemento: ' + error)
        }

    }

    async upgrade(id, dataProductoAModificar) {
        if (id === null || id === undefined) {
            console.log('Error id no definido')
        } else {
            try {
                const doc = await this.#query.doc(id)
                await doc.update({ ...dataProductoAModificar })
            } catch (error) {
                throw new Error("Error actualizar elemento" + error);
            }
        }

    }

    async delete(id) {
        try {
            const doc = this.#query.doc(id)
            await doc.delete();
        } catch (error) {
            throw new Error("Error al borrar elemento:" + error)
        }
    }

}

export default ProductosFireBaseContainer