const express = require('express'); //We bring in express
const expressLayouts = require('express-ejs-layouts'); //We use this for creating the views

const app = express(); // We initialize the app with express

//EJS
app.use(expressLayouts); 
app.set('view engine', 'ejs')//We set our view engine to EJS

//Routes
app.use('/', require('./routes/index')) //We create tha main route
app.use('/users', require('./routes/users')) //We create the users route

const PORT = process.env.PORT || 5000; // We create a port (process.env.PORT este in caz de deploy)

app.listen(PORT, console.log(`Server started on port ${PORT}`)); //This runs a server

