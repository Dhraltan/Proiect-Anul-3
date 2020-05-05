const chatForm = document.getElementById('chat-form'); //We get the chat form from the chat.ejs
const chatMessages = document.querySelector('.chat-messages'); //We bring in the chat messages div

const socket = io(); //

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