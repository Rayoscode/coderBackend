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

socket.on('currentChat', messages => {
    realTimeText.innerText = ''
    messages.forEach(message => {
        realTimeText.innerHTML += `<p>Nombre: ${message.nombre} - Mensaje: ${message.mensaje}</p>`
    })
})