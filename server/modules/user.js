const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    gender:String,
    dob: String,
    country: String
});

module.exports = mongoose.model('user', userSchema, 'users');