const express = require('express'); //We bring in express
const router = express.Router(); //We create router in order to use the express router
const bcrypt = require('bcryptjs'); //Wr use it in order to encrypt the password
const passport = require('passport'); //We need it for the login
const {logger} = require('../config/logger');

//User model
const User = require('../models/User'); //We bring the User model we created

//Login page
router.get('/login',(req,res) => res.render('login')); //Handels the login page, has an arrow function that renders the login view

//Register page
router.get('/register',(req,res) => res.render('register')); //Handels the register page, has an arrow function that renders the register view

//Register handle
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    //Check required fields
    if(!name || !email || !password || !password2){
        logger.warn(`Attempted registration without filling all fields`);
        errors.push({ msg: 'You need to fill all the fields' });
    }

    //Check if passwords match
    if(password!=password2) {
        logger.warn(`Attempted registration with unmatching passwords`);
        errors.push({ msg: 'The passwords do not match' })
    }

    //Check password lenght
    if(password.length < 6) {
        logger.warn(`Attempted registration with too short password`);
        errors.push({ msg: 'Password needs to be at least 6 characters' })
    }

    if(errors.length>0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        }); //We re-render the page, but keep all the info and also add a new param erros in order to inform the user
    }
    else {
        //Validation passed
        User.findOne({ email: email })
            .then(user => {
                if(user) {
                    //User exists
                    errors.push({ msg: 'Email already in use' });
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
        logger.warn(`Attempted registration with an already used email`);
                }
                else {
                    const newUser = new User ({
                        name,
                        email,
                        password
                    }); //We create an instance of the User model

                    //Hash password
                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        //Set password to a hashed one
                        newUser.password = hash;
                        //Save user
                        newUser.save()  //Stores the newly created user into Mongo
                        .then(user => {
                            req.flash('succes_msg','You are now registered and loged in');
                            logger.info(`A registration has occurred`);
                            res.redirect('login');
                        })
                        .catch(err => console.log(err));
                    }))
                }
            })
    } 

});//We are handling the post request from the register view

//Login handle
router.post('/login', (req,res,next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

//Logout handle
router.get('/logout', (req,res) => {
    req.logout();
    req.flash('succes_msg', 'You are logged out');
    res.redirect('/users/login');
});

module.exports = router; //Exports the path as a module