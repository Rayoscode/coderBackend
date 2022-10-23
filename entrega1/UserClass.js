class Usuario{
    constructor(nombre,apellido,libros,mascotas){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`
    }
    addMascota(nuevaMascota){
        this.mascotas.push(nuevaMascota)
    }
    countMascotas(){
        return this.mascotas.length
    }
    addBook(nombreLibro,autoLibro){
        this.libros.push({nombre:nombreLibro,autor:autoLibro})
    }
    getBookNames(){
        return this.libros.map( libro =>{
            return libro.nombre
        })
    }
    
}

const miUsuario = new Usuario("Martin","Ramos",[{nombre:"libro1",autor:"autor1"}],["Chicho"])
console.log(miUsuario.getFullName())
miUsuario.addMascota("La Gata")
console.log("Cantidad de Mascotas: " + miUsuario.countMascotas())
miUsuario.addBook("libro2","autor2")
console.log(miUsuario.getBookNames())
