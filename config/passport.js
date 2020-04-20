const LocalStrategy = require('passport-local').Strategy; //This enables us to authentificate with a username and a password
const mongoose = require('mongoose'); //We need this to check if the email and password matches
const bcrypt = require('bcryptjs'); //We need bcrypt to unhash the password

//Load User Model
const User = require('../models/User');

//We export the created strategy http://www.passportjs.org/packages/passport-local/
module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email'}, (email, password, done) => { //We use email as our username
            //Match User
            User.findOne({ email: email})
                .then(user => {
                    if(!user) {
                        return done(null, false, { message: 'That email is not registered'});
                    } // If there is no user that has that email we display a message

                    //Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err;

                        if(isMatch) {
                            return done(null, user); //If we find that the passwords match we return the user
                        } else {
                            return done(null, false, { message: 'Password incorrect'}); //If the passwords don't match we return a message
                        }
                    });
                }) // We check if there is an user that exists with that email
                .catch(err => console.log(err));
        })
    );

    // In order to support login sessions, Passport will serialize and deserialize user instances to and from the session
    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
          done(err, user);
        });
      });

}
