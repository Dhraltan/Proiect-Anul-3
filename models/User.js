const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        date:{
            type: Date,
            default: Date.now
        }
    }
); //In the schema we pass in an object with all our fields

const User = mongoose.model('User', UserSchema); //We create a model from the schema

module.exports = User; //We export this in order to use it in other files