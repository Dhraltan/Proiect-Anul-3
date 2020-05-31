const chatForm = document.getElementById('chat-form'); //We get the chat form from the chat.ejs
const chatMessages = document.querySelector('.chat-messages'); //We bring in the chat messages div
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const socket = io(); //


//Get the room from the URL
const {room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const name = document.getElementById("name").innerHTML.toString();
socket.emit('joinRoom', {room,name});

// Get room and users
socket.on('roomUsers', ({room,links}) =>{
    outputRoomName(room);
    outputUsers(links);
});

// Message from server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    //Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;

}); //We catch the message sent from the server

// On message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault(); //We need it to prevent submiting to a file

    const msg = e.target.msg.value; //The input field in the chat ejs has the id msg

    // We emit the message to the server
    socket.emit('chatMessage', msg);

    // Clear input area
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

// Add room name to DOM
function outputRoomName(room){
    roomName.innerText = room;
};

// Add users to DOM
function outputUsers(links) {
    userList.innerHTML = `
    ${links.map(link => `<li>${link.username}</li>`).join('')}
    `;
}

// Output message to the ejs
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta"> ${message.username} <span> ${message.time} </span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}; // We create a new div with the message in it and we add it to the existing class of chat-messages