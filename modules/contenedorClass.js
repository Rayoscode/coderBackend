const fs = require('fs');

class contenedor {
    
    constructor (nombreArchivo){
        this.nombreArchivo = nombreArchivo;
        if(!fs.existsSync(nombreArchivo)){
            fs.promises.writeFile(nombreArchivo,JSON.stringify([], null, 2))
        }
    }

    async save(objeto){
        let max = 0;
        try{
            let objetos = await this.getAll();
                objetos.forEach(valor => {
                if (valor.id > max) {
                    max = valor.id;}
                }
            );

            const obj = {id:max + 1, title:objeto.title, thumbnail:objeto.thumbnail,price:objeto.price};
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

    async upgradeByID(objectNew){
        let objetos = await this.getAll();
        objetos.forEach((obj )=>{
            if(obj.id == objectNew.id){
                obj.title = objectNew.title;
                obj.thumbnail = objectNew.thumbnail;
                obj.price = objectNew.price;
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

exports.contenedor = contenedor;


