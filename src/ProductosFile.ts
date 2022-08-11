import * as fs from 'fs'
import Producto from './producto';


export default class ContenedorProductos {

    nombreArchivo : fs.PathLike;

    constructor (nombreArchivo:fs.PathLike){
        this.nombreArchivo = nombreArchivo;
        console.log(fs.existsSync(nombreArchivo));
        if(!fs.existsSync(nombreArchivo)){
            console.log("Pase por aca!")
            fs.promises.writeFile(nombreArchivo,JSON.stringify([], null, 2))
        }
    }

    async save(producto:Producto){
        let max = 0;
        try{
            let objetos = await this.getAll();
                objetos.forEach(valor => {
                if (valor.id > max) {
                    max = valor.id;}
                }
            );

            const obj = {id:max + 1, nombre:producto.nombre, foto:producto.foto,price:producto.precio,codigo:producto.codigo,timestamp:producto.timestamp,stock:producto.stock,descripcion:producto.descripcion};
            objetos.push(obj)

            try{
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(objetos, null, 2));
                return max+1;
            }catch{
                throw new Error('Error de escritura de archivo');
            }
        } catch {
            throw new Error("Error de lectura de archivo")
        }
        
        
    }

    getAll = async ()=> {
        try {

        const data = await fs.promises.readFile(this.nombreArchivo,'utf-8'); 
        return JSON.parse(data);

        } catch (error){
            console.log("Error:",error)
        }
        
        
    }

    async getById(idNumber){
        let objeto ;
        try {
            let objetos = await this.getAll();
            objetos.forEach((obj)=>{
                if(obj.id == idNumber){
                    objeto = obj;
                }
            });
            
            
        } catch {
            throw new Error("Error de lectura de archivo");
        }
        return objeto;
    }

    async deleteByID(idNumber){
        
        try {
            let objetos = await this.getAll();
            for(let i=0;i<objetos.length;i++){
                if(objetos[i].id == idNumber){
                    objetos.splice(i,1);
                }
            }

            try{
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(objetos, null, 2));
                
            } catch {
                throw new Error("Error de escritura de archivo")
            }

        } catch {
            throw new Error("Error de lectura de archivo");
        }
        
    }

    async deleteAll(){
        try{
            await fs.promises.writeFile(this.nombreArchivo,JSON.stringify([], null, 2));
        } catch(error){
            console.log("Error en borrar el archivo:",error);
        }
    }

    async upgradeByID(productoNuevo:Producto){
        let objetos = await this.getAll();
        objetos.forEach((obj )=>{
            if(obj.id === productoNuevo.id){
                obj.nombre = productoNuevo.nombre
                obj.foto = productoNuevo.foto
                obj.precio = productoNuevo.precio
                obj.codigo = productoNuevo.codigo
                obj.stock = productoNuevo.stock
                obj.descripcion = productoNuevo.descripcion
            }
        })
        this.deleteAll();
        try{
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(objetos, null, 2));
            }catch{
                throw new Error('Error de escritura de archivo');
            }

    }

}



