const express = require('express'); //We bring in express
const router = express.Router(); //We create router in order to use the express router
const { ensureAuthenticated } = require('../config/auth'); //We need this so we can guard our views

//Welcome Page
router.get('/',(req,res) => res.render('welcome')); //Handels the home page, has an arrow function that renders the welcome view as a response 
//Dashboard
router.get('/dashboard', ensureAuthenticated,(req,res) => 
res.render('dashboard', {
    name: req.user.name
})); //Handles the dashboard page

//Chat
router.get('/chat', ensureAuthenticated, (req,res) => 
res.render('chat', {
    name: req.user.name
}));

module.exports = router; //Exports the path as a module