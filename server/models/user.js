const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:String,
    email:String,
    gender:String,
    phone:Number,
    dob:String,
    password:String,
    imagePath:String,
    address:String
})

module.exports = mongoose.model('user' , userSchema , 'users');