
const fs = require('fs');

class MensajesFile {

    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }


    async saveMessage(messaje) {
        try {
            const mensajes = await this.getMessages();
            mensajes.push({ nombre: messaje.nombre, mensaje: messaje.mensaje, date: messaje.date })
            try {
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(mensajes, null, 2));
            } catch (error) {
                throw new Error('Save: Error de escritura de archivo ' + error);
            }
        } catch (error) {
            throw new Error("Save: Error al guardar mensaje" + error)
        }
    }

    async getMessages() {
        try {
            await fs.promises.open(this.nombreArchivo)
        } catch (error) {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([], null, 2));

        }
        try {
            const data = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
            return JSON.parse(data);

        } catch (error) {
            throw new Error("Error de lectura:" + error)
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([], null, 2));
        } catch (error) {
            console.log("Error en borrar el archivo:", error);
        }
    }

}

module.exports = MensajesFile