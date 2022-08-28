import Producto from "../../producto";
import mongoose from "mongoose";
import CarritoSchema from '../../models/CarritoModel'
import CarritoDAO from "./CarritoDAOInterface";
class CarritoMongoDAO implements CarritoDAO{
    private URL:String;

    constructor(URL){
        this.URL = URL;
        mongoose.connect(URL);
    }

    async createCarrito(){
        const id = (await this.readLastID())+1;
        CarritoSchema.insertOne({id,timestamp:Date.now(),productos:[]})
    }

    async insertProductoEnCarrito(id:Number,producto:Producto){
        CarritoSchema.updateOne({id:id,$push:{producto}})
    }
    async deleteProductoEnCarrito(idCarrito:Number,idProducto:Number){
        CarritoSchema.updateOne({id:idCarrito},{pull$:{id:idProducto}})
    }

    async deleteCarrito(id:Number){
        CarritoSchema.deleteOne({id})
    }

    async readCarrito(id:Number){

        return await CarritoSchema.find({id:id})
    }

    async readLastID(){
        let elem = await CarritoSchema.find({},null,{sort:{id:1}}).limit(1)
        return elem.id === undefined? 0 : elem.id;
    }

}

export default CarritoMongoDAO;