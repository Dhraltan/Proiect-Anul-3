const socket = io(); //

socket.on('message', message => {
    console.log(message);
}); //We catch the message sent from the server