import Producto from "../../producto";

export default interface ProductosDAO{

    insertProduct(Producto:Producto);
    readProducts(id?:Number):any;
    updateProduct(id:Number,Producto:Producto);
    deleteProduct(id:Number);
    readLastID():any;
    
}