const socket = io();

const inputText = document.getElementById('inputText')

const inputTextName = document.getElementById("textName");

const btnSend = document.getElementById('btnSend')

btnSend.addEventListener('click', () => {
    socket.emit('saveMessage', {
        nombre: inputTextName.value, mensaje: inputText.value
    })
    inputText.value = ''
})

socket.on('currentChat', message => {
    realTimeText.innerHTML += `<p>Nombre: ${message.nombre} - Mensaje: ${message.mensaje}</p>`
})

async function obtenerMensajes(){
    const res = await fetch('http://localhost:8080/mensajes')
    res.json().then((mensajes)=>{
        console.log(mensajes)
        mensajes.forEach(mensaje=>{
                    realTimeText.innerHTML += `<p>Nombre: ${mensaje.name} - Mensaje: ${mensaje.message}</p>`

        })
    })
}

obtenerMensajes();