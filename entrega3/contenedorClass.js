const fs = require('fs');

class Contenedor {
    
    constructor (nombreArchivo){
        this.nombreArchivo = nombreArchivo;
    }

    async save(objeto){
        
        try{
            const objetos = await this.getAll();
            objetos.push({id:objetos.length+1, title:objeto.title, thumbnail:objeto.thumbnail,price:objeto.price})
            try{
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(objetos, null, 2));
                return objetos.length;
            }catch(error){
                throw new Error('Save: Error de escritura de archivo ' + error);
            }
        } catch(error) {
            throw new Error("Save: Error de lectura de archivo" + error)
        }
        
        
    }

    async getAll(){
        try{
            await fs.promises.open(this.nombreArchivo)
        } catch(error){
            await fs.promises.writeFile(this.nombreArchivo,JSON.stringify([], null, 2));

        }
        try {
        const data = await fs.promises.readFile(this.nombreArchivo,'utf-8'); 
        return JSON.parse(data);

        } catch (error){
            throw new Error("Error de lectura:"+ error)
        }
        
        
    }

    async getById(idNumber){
        let objeto ;
        try {
            let objetos = await this.getAll();
            objetos.forEach((obj) => {
            if (obj.id === idNumber) {
                objeto = obj;
            }
        });
        } catch (error) {
            throw new Error("getById:Error de lectura de archivo" + error);
        }
        return objeto === undefined? null : objeto ;
    }

    async deleteByID(idNumber){

       
            
            try{
                let objetos = await this.getAll();
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(objetos.filter(Element => Element.id !== idNumber ), null, 2));
                
            } catch(error) {
                throw new Error("Error de escritura de archivo")
            }
        
    }

    async deleteAll(){
        try{
            await fs.promises.writeFile(this.nombreArchivo,JSON.stringify([], null, 2));
        } catch(error){
            console.log("Error en borrar el archivo:",error);
        }
    }

}


module.exports = Contenedor
