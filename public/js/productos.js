const socket = io();

const ContenedorProductos = document.getElementById("detalleProductos");

const botonActualizar= document.getElementById("buttonEnviar");

const titulo = document.getElementById("title")
const precio = document.getElementById("price")
const imagen = document.getElementById("thumbnail")

botonActualizar.addEventListener("click",()=>{
    socket.emit('nuevoProducto',{title:titulo.value,price:precio.value,thumbnail:imagen.value})
})

socket.on('actualizarProductos',(producto)=>{
        ContenedorProductos.innerHTML += `<div> <p> ${producto.title} </p> <p>$ ${producto.price} </p> <img src="${producto.thumbnail}"> </div>`;        
})




const buscarDatos =async()=>{
    let res = await fetch('http://localhost:8080/api/productos');
    console.log(res.json().then(productos =>{
        productos.forEach(producto => {
        ContenedorProductos.innerHTML += `<div> <p> ${producto.title} </p> <p>$ ${producto.price} </p> <img src="${producto.thumbnail}"> </div>`;        
    });
    }));
    
}

buscarDatos();