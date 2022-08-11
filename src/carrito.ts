import Producto from "./producto"

export default interface Carrito{
    id?: Number
    timestamp:Number
    productos: Array<Producto>
}

