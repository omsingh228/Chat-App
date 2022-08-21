const socket = io('http://localhost:5000');

//Get DOM element in respective js variables
const form = document.getElementById('send-container'); //Got id from index.html
const messageInput = document.getElementById('messageInp'); //Got id from index.html
const messageContainer = document.querySelector(".container");

//Audio that will play on receiving messages
var audio = new Audio('../Ringtone.mp3');

//Function which will append event info to container
const append = (message, position)=> {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left'|| position=='center'){
    audio.play();
    }
}

//Prompt to get Name and let server know
const name = prompt("Enter Your Name");
socket.emit('new-user-joined', name);

//If a person joins, receive his/her name from the server
socket.on('user-joined', name=>{
    append(`${name} joined the CHAT`, 'center');
})

//If server sends a message, receieve it
socket.on('receive', data=>{
    append(`${data.name}:${data.message}`, 'left');
})

//If a person leaves, append the info into the container
socket.on('leave', name=>{
    append(`${name} left the CHAT`, 'redCenter');
})

//If form gets submitted, send message to server
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send', message)
    messageInput.value = '';
})