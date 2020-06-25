const express = require('express'); //We bring in express
const expressLayouts = require('express-ejs-layouts'); //We use this for creating the views
const mongoose = require('mongoose'); //We bring in mongoose(used for handling the database)
const flash = require('connect-flash'); //We use connect flash to store up messages for a session and display them on another page(on a redirect)
const session = require('express-session'); //It's a middleware that stores the session id in the cookie
const passport = require('passport'); //We bring in passport
const path = require('path'); //This brings in a path module from noje.js
const http = require('http'); //We need http in order to use socket.io
const socketio = require('socket.io'); //We bring in socket.io
const { formatMessage, formatMessage2 } = require('./models/messages'); // We use a format for our messages
const { createLink, getLink, destroyLink, getRoomUsers } = require('./models/links');
const moment = require('moment'); //moment is used to get the current time
const {logger} = require('./config/logger');
const app = express(); //We initialize the app with express

const server = http.createServer(app); //We create a server with http
const io = socketio(server);

//Passport config
require('./config/passport')(passport); //We initialize passport with our config

// DB Config
const db = require('./config/keys').MongoURI; //We store the MongoDB link

// Connect to Mongo
mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true  })
 .then(() => console.log('MongoDB Connected...'), logger.info('Connection to Mongo established'))
 .catch(err => logger.error(err))

// EJS
app.use(expressLayouts); 
app.set('view engine', 'ejs');//We set our view engine to EJS

// Bodyparser
app.use(express.urlencoded({ extended: false })); //In order to get data from the form we use a bodyparser

// Express Session
app.use(session({
    secret: 'secret', //secret is used to sign the session ID cookie
    resave: true, //Forces the session to save the session even if it wasn't modified during the request
    saveUninitialized: true, //Forces an unitialized(the session is new but not modified) session to be saved
  })); //This code is copied from https://github.com/expressjs/session#readme

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect flash
app.use(flash());

//Global Variables
app.use((req,res,next) => {
    res.locals.succes_msg = req.flash('succes_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
}); //We create our own middleware for messages

//Create a const for the Bot that sends automated messages
const botName = 'ChatBot';

// Run socket io when someoane connects
io.on('connection', socket => {
const chatDB = mongoose.connection.db.collection('chats');
socket.on('joinRoom', ({room,name}) => {
  logger.info(`User: "${name}" connected to room: "${room}"`);
  const link = createLink(socket.id, name, room);
  socket.join(link.room);

  chatDB.find({room: link.room}).limit(50).sort({_id:1}).toArray( (err, res) => {
    if(err){
      throw err,
      logger.error(err);
    }
    res.forEach((currentValue) => {
      socket.emit('message', formatMessage2(currentValue.name, currentValue.msg, currentValue.time))})
  });

  //socket.emit('message', formatMessage(botName, `You are connected to ${link.room}`)); //We send a welcome message to the client

  socket.broadcast.to(link.room).emit('message', formatMessage(botName, `${link.username} has joined the chat`)); //We emit to everybody except the user that is connecting

  //Send users and room info
  io.to(link.room).emit('roomUsers', {
    room: link.room,
    links: getRoomUsers(link.room)
  });
});

  // Listen for chat messages
  socket.on('chatMessage', (msg) => {
    const link = getLink(socket.id);
    chatDB.insertOne({name: link.username, msg:msg, room: link.room, time: moment().format('h:mm a')});
    io.to(link.room).emit('message', formatMessage(link.username, msg));
    logger.info(`Message: "${msg}" was sent to room: "${link.room}"`);
  }) 

  socket.on('disconnect', () => {
    const link = destroyLink(socket.id);

    if (link) {
      io.to(link.room).emit('message', formatMessage(botName, `${link.username} has left the chat`)); //We are emmiting the message to everyone
    logger.info(`User: "${link.username}" has disconnected from room: "${link.room}"`);
      io.to(link.room).emit('roomUsers', {
        room: link.room,
        links: getRoomUsers(link.room)
      });
    }
  }); 
});//The server side comunicates with the client side

// Routes
app.use('/', require('./routes/index')); //We create tha main route
app.use('/users', require('./routes/users')); //We create the users route

//Set static folder
app.use(express.static(path.join(__dirname + '/views'))); //We need this to be able to add some css
app.use('/static', express.static(__dirname + '/views/css'));


const PORT = process.env.PORT || 5000; //We create a port (process.env.PORT is for deployment)

server.listen(PORT, console.log(`Server started on port ${PORT}`)); //This runs a server
logger.info('Server started, logger is on');
 