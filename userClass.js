


class User{
    constructor(nombre, apellido){
        this.nombre=nombre;
        this.apellido=apellido;
        this.mascotas=[];
        this.libros=[];
    }
    getFullName(){
        return `${this.nombre} ${this.apellido}` ;
    }

    addMascota(nombreMascota){
        this.mascotas.push(nombreMascota);
    }
    addLibro(nombreLibro,AutorLibro){
        this.libros.push({Libro:nombreLibro , Autor:AutorLibro});  
    }

    countMascotas(){
        return this.mascotas.length;
    }

    nombresLibros(){
        let res=[];
        for(const libro of this.libros){
            res.push(libro.Libro);
        }
        return res;
    }

}


usuarioPrueba = new User("Martin","Ramos");
usuarioPrueba.addMascota("Chicho");
usuarioPrueba.addMascota("La gata");
usuarioPrueba.addMascota("Michin")
usuarioPrueba.addLibro("Computer Architecture: A Quantitive Approach","John L. Hennessy | David A. Patterson");
usuarioPrueba.addLibro("La Cocina y los Alimentos","Harold McGee");
usuarioPrueba.addLibro("Introduction to Algorithms","Thomas Cormen");

console.log(usuarioPrueba.getFullName());
console.log(usuarioPrueba.countMascotas());
console.log(usuarioPrueba.nombresLibros());
