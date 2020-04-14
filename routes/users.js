const express = require('express'); //We bring in express
const router = express.Router(); //We create router in order to use the express router

router.get('/login',(req,res) => res.render('login')); //Handels the login page, has an arrow function that renders the login view

router.get('/register',(req,res) => res.render('register')); //Handels the register page, has an arrow function that renders the register view


module.exports = router; //Exports the path as a module