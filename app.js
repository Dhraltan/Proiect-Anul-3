const express = require('express'); //We bring in express
const expressLayouts = require('express-ejs-layouts'); //We use this for creating the views
const mongoose = require('mongoose');

const app = express(); //We initialize the app with express

// DB Config
const db = require('./config/keys').MongoURI; //We store the MongoDB link

// Connect to Mongo
mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true  })
 .then(() => console.log('MongoDB Connected...'))
 .catch(err => console.log(err))

// EJS
app.use(expressLayouts); 
app.set('view engine', 'ejs')//We set our view engine to EJS

//Bodyparser
app.use(express.urlencoded({ extended: false })); //In order to get data from the form we use a bodyparser

// Routes
app.use('/', require('./routes/index')) //We create tha main route
app.use('/users', require('./routes/users')) //We create the users route

const PORT = process.env.PORT || 5000; //We create a port (process.env.PORT este in caz de deploy)

app.listen(PORT, console.log(`Server started on port ${PORT}`)); //This runs a server

