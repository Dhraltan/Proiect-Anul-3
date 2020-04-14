const express = require('express'); //We bring in express
const router = express.Router(); //We create router in order to use the express router

router.get('/',(req,res) => res.render('welcome')); //Handels the home page, has an arrow function that renders the welcome view as a response 

module.exports = router; //Exports the path as a module