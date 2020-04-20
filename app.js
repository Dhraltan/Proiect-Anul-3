const express = require('express'); //We bring in express
const expressLayouts = require('express-ejs-layouts'); //We use this for creating the views
const mongoose = require('mongoose'); //We bring in mongoose(used for handling the database)
const flash = require('connect-flash'); //We use connect flash to store up messages for a session and display them on another page(on a redirect)
const session = require('express-session'); //It's a middleware that stores the session id in the cookie
const passport = require('passport'); //We bring in passport

const app = express(); //We initialize the app with express

//Passport config
require('./config/passport')(passport); //We initialize passport with our config

// DB Config
const db = require('./config/keys').MongoURI; //We store the MongoDB link

// Connect to Mongo
mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true  })
 .then(() => console.log('MongoDB Connected...'))
 .catch(err => console.log(err))

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

// Routes
app.use('/', require('./routes/index')); //We create tha main route
app.use('/users', require('./routes/users')); //We create the users route

const PORT = process.env.PORT || 5000; //We create a port (process.env.PORT for deployment)

app.listen(PORT, console.log(`Server started on port ${PORT}`)); //This runs a server

