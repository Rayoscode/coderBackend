import mongoose from "mongoose";
import { productos } from "../schemas/productosSchema.js";
import mongoDBConfig from "../config/mongoDBConfig.js";

class ProductosMongoDBContainer {
    constructor() {
        this.URL = mongoDBConfig.URL;

    }

    async create(producto) {
        try {
            mongoose.connect(this.URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            await productos.create({ ...producto });
            mongoose.disconnect();
        } catch (error) {
            mongoose.disconnect();
            throw new Error("Error al Create: " + error);
        }
    }

    async read(id) {
        let res = null;
        try {
            mongoose.connect(this.URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            if (id === null || id === undefined) {
                res = await productos.find({});
            } else {
                res = await productos.find({ _id: id });
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
            await productos.updateOne({ _id: id, $set: { ...data } });
            mongoose.disconnect();
        } catch (error) {
            mongoose.disconnect();
            throw new Error("Error al Upgrade: " + error);
        }
    }

    async delete(id) {
        try {
            mongoose.connect(this.URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            await productos.deleteOne({ _id: id });
            mongoose.disconnect();
        } catch (error) {
            mongoose.disconnect();
            throw new Error("Error al Delete: " + error);
        }
    }
}

export default ProductosMongoDBContainer;
