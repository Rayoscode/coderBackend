import mongoose from "mongoose";
import { carrito } from "../schemas/carritoSchema.js";
import mongoDBConfig from "../config/mongoDBConfig.js";

class CarritoMongoDBContainer {
    constructor() {
        this.URL = mongoDBConfig.URL;
    }

    async create(dataCarrito) {
        try {
            mongoose.connect(this.URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            await carrito.create(dataCarrito);
            mongoose.disconnect();
        } catch (error) {
            mongoose.disconnect();
            throw new Error("Error Create:" + error);
        }
    }

    async read(id) {
        try {
            mongoose.connect(this.URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            let res = null;
            if (id === null || id === undefined) {
                res = await carrito.find({});
            } else {
                res = await carrito.find({ _id: id });
            }
            mongoose.disconnect();
            return res;
        } catch (error) {
            mongoose.disconnect();
            throw new Error("Error al Find: " + error);
        }
    }

    async upgrade(id, data) {
        try {
            mongoose.connect(this.URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            await carrito.updateOne({ _id: id, $set: { ...data } });
            mongoose.disconnect();
        } catch (error) {
            mongoose.disconnect();
            throw Error("Error Upgrade: " + error);
        }
    }

    async delete(id) {
        try {
            mongoose.connect(this.URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            await carrito.deleteOne({ _id: id });
            mongoose.disconnect();
        } catch (error) {
            mongoose.disconnect();
            throw Error("Error Delete");
        }
    }
}



export default CarritoMongoDBContainer;
