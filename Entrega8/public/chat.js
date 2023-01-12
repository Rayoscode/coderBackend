const socket = io();

const containerChat = document.getElementById("chatContainer")
const nombre = document.getElementById("name-input")
const mensaje = document.getElementById("message-input")
const edad = document.getElementById('edad-input')
const apellido = document.getElementById('apellido-input')
const avatar = document.getElementById('avatar-input')
const alias = document.getElementById('alias-input')
const title = document.getElementById("title")
const price = document.getElementById("price")
const email = document.getElementById("email-input")
const thumbnail = document.getElementById("thumbnail")
const btnProd = document.getElementById("btn-prod")

socket.on('messages', data => {
    console.log(data)
    const html = data.map(mensaje => `<div> <div> <b>${mensaje.name}: </b> <p>${mensaje.message} </p> </div>  <i>${mensaje.date} </i>   </div>`)
    containerChat.innerHTML = ''
    html.forEach(element => {
        containerChat.innerHTML += element
    })
})

// socket.on('productos', data => {
//     const html = data.map(prod => `<div> <p> <span>Title: ${prod.title} </span> <span> Price: ${prod.price} </span></p>  <img src="${prod.thumbnail}"> </div>`)
//     const container = document.getElementById("productosContainer")
//     console.log("recibi")
//     container.innerHTML = ''
//     html.forEach(element => {
//         container.innerHTML += element
//     });
// })


function enviarMensaje() {
    let date = new Date().getDate()
    socket.emit('sendMessage', { nombre: nombre.value, mensaje: mensaje.value, date: date, alias: alias.value, avatar: avatar.value, apellido: apellido.value, edad: edad.value, id: email.value })
}

mensaje.addEventListener('keydown', (event) => {

    if (event.key == "Enter") {
        nombre.value == "" || mensaje.value == "" ? event.preventDefault() : enviarMensaje();
    }
})

// btnProd.addEventListener('click', () => {
//     socket.emit('newProducto', { title: title.value, price: price.value, thumbnail: thumbnail.value })
// })