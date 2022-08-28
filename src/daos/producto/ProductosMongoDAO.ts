import Producto from "../../producto";
import ProductoSchema from '../../models/ProductoModel'
import mongoose, { mongo } from "mongoose";
import ProductosDAO from './ProductosDAOInteface'

class ProductosMongoDAO implements ProductosDAO{
    
    URL:string;
    constructor(url:string){
        this.URL = url;
        mongoose.connect(url,{})
        
    }
    
    async insertProduct(Producto:Producto){
        
        try{
            ProductoSchema.insertOne(Producto)
            
        } catch(error){
            console.log(error);
        }
        
    }
    async updateProduct(id:Number,Producto:Producto){
        try{
            ProductoSchema.updateOne({id:id},{$set:{}}) 
        } catch(error){

        }

    }

    async readProducts(id?:Number){
        let result;
        try{
            if(id === undefined){
                result = await ProductoSchema.find({});
            } else{
                result = await ProductoSchema.find({id:id})
            }
        } catch(error){
            console.log(error)
        }
        return result;
    }

    async deleteProduct(id:Number){
        try{
            await ProductoSchema.deleteOne({id:id});
        } catch(error){
            console.log(error);
        }
    }

    async readLastID(){
        try{
            let elem= await ProductoSchema.find({},null,{sort:{id:1}}).limit(1);
            return elem.id === undefined? 0 : elem.id;
        } catch(error){
            console.log(error)
        }
    }
}


export default ProductosMongoDAO
