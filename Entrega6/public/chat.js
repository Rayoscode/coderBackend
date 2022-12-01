const socket = io();

const containerChat = document.getElementById("chatContainer")
const nombre = document.getElementById("name-input")
const mensaje = document.getElementById("message-input")
const title = document.getElementById("title")
const price = document.getElementById("price")
const thumbnail = document.getElementById("thumbnail")
const btnProd = document.getElementById("btn-prod")

socket.on('messages', data => {
    const html = data.map(mensaje => `<div> <div> <b>${mensaje.nombre}: </b> <p>${mensaje.mensaje} </p> </div>  <i>${mensaje.date} </i>   </div>`)
    containerChat.innerHTML = ''
    html.forEach(element => {
        containerChat.innerHTML += element
    })
})

socket.on('productos', data => {
    const html = data.map(prod => `<div> <p> <span>Title: ${prod.title} </span> <span> Price: ${prod.price} </span></p>  <img src="${prod.thumbnail}"> </div>`)
    const container = document.getElementById("productosContainer")
    console.log("recibi")
    container.innerHTML = ''
    html.forEach(element => {
        container.innerHTML += element
    });
})


function enviarMensaje() {
    let date = new Date().getDate()
    socket.emit('sendMessage', { nombre: nombre.value, mensaje: mensaje.value, date: date })
}

mensaje.addEventListener('keydown', (event) => {

    if (event.key == "Enter") {
        nombre.value == "" || mensaje.value == "" ? event.preventDefault() : enviarMensaje();
    }
})

btnProd.addEventListener('click', () => {
    socket.emit('newProducto', { title: title.value, price: price.value, thumbnail: thumbnail.value })
})