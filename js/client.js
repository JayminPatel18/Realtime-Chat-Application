const socket = io('http://localhost:8000');

//  Get DOM Elements in respective JS variable
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

// Audio will play on recieving messages
var audio = new Audio('ting.mp3');

// function will append to the other person
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message'); 
    messageElement.classList.add(position);
    messageContainer.append(messageElement);   
    if(position=='left'){
        audio.play(); 
    }
 }

 // if the form is submitted, send server the message
 form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value='';
 })


 // Ask new user for his/her name & let the server know
const name = prompt("Enter your name to join");

socket.emit('new-user-joined', name);

// if a new user joins, receive his name from the server
socket.on('user-joined', name => {
    append(`${name} joined the Chat`, 'right')
})

// if server sends a message, receive it
socket.on('receive', data => {
    append(`${data.name} :  ${data.message}`, 'left')
})

// if ther user leaves the chat, inform the to the another person
socket.on('left', name => {
    append(`${name} left the Chat`, 'right')
})