import Producto from "../../producto";

export default interface CarritoDAO{

    createCarrito():void;
    insertProductoEnCarrito(id:Number,producto:Producto):void;
    deleteProductoEnCarrito(idCarrito:Number,idProducto:Number):void;
    deleteCarrito(id:Number):void;
    readCarrito(id):any;
    readLastID():any;
}