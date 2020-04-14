const express = require('express'); //We bring in express
const router = express.Router(); //We create router in order to use the express router

router.get('/login',(req,res) => res.send('Login')); //Handels the login page, has an arrow function that sends Login as a response 

router.get('/register',(req,res) => res.send('Register')); //Handels the register page, has an arrow function that sends Register as a response 


module.exports = router; //Exports the path as a module