
import admin from 'firebase-admin'
import * as fireBaseDBConfig from '../config/backendcoder-f473e-firebase-adminsdk-7itja-e4d182298b.json'

class CarritoFireBaseContainer {

    #db
    #query
    constructor() {

        admin.initializeApp({
            credential: admin.credential.cert(fireBaseDBConfig),
            databaseURL: "" // DB URL
        })

        this.#db = admin.firestore()
        this.#query = this.#db("Carritos")
    }

    async create(dataCarrito) {
        try {
            const doc = this.#query.doc();
            await doc.create({ ...dataCarrito })
        } catch (error) {
            throw new Error("Error al crear un carrito Nuevo" + error)
        }
    }

    async read(id) {
        try {
            if (id === undefined || id === null) {
                const snapShotFB = await this.#query.get();
                const res = snapShotFB.docs;
                let element = res.map((doc) => ({ id: doc.id, timestamp: doc.timestamp, productos: doc.productos }))
                return element
            } else {
                const doc = await this.#query.doc(id)
                const response = doc.get()
                const element = response.data();
                return element;
            }
        } catch (error) {
            throw new Error('Error read carritos' + error)
        }
    }

    async upgrade(id, carritoDataAModificar) {
        if (id === undefined || id === null) {
            console.log("Error upgrade carrito")
        } else {
            try {
                const doc = await this.#query.doc(id)
                await doc.update({ ...carritoDataAModificar })
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

export default CarritoFireBaseContainer