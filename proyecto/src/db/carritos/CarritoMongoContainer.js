import mongoose from "mongoose";
import { carrito } from "../schemas/carritoSchema.js";
import mongoDBConfig from "../../config/mongoDBConfig.js";

class CarritoMongoDBContainer {
    constructor() {
        this.URL = mongoDBConfig.URL;
    }

    async create(dataCarrito) {
        try {
            await mongoose.connect(this.URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            await carrito.create(dataCarrito);
            await mongoose.disconnect();
        } catch (error) {
            await mongoose.disconnect();
            throw new Error("Error Create:" + error);
        }
    }

    async read(id) {
        try {
            await mongoose.connect(this.URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            let res = null;
            if (id === null || id === undefined) {
                res = await carrito.find({});
            } else {
                res = await carrito.find({ _id: id });
            }
            await mongoose.disconnect();
            return res;
        } catch (error) {
            await mongoose.disconnect();
            throw new Error("Error al Find: " + error);
        }
    }

    async upgrade(id, data) {
        try {
            await mongoose.connect(this.URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            await carrito.updateOne({ _id: id, $set: { ...data } });
            await mongoose.disconnect();
        } catch (error) {
            await mongoose.disconnect();
            throw Error("Error Upgrade: " + error);
        }
    }

    async delete(id) {
        try {
            await mongoose.connect(this.URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            await carrito.deleteOne({ _id: id });
            await mongoose.disconnect();
        } catch (error) {
            await mongoose.disconnect();
            throw Error("Error Delete");
        }
    }
}



export default CarritoMongoDBContainer;
