const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const messageSchema = new Schema({
    name: String,
    message: String
});

module.exports = mongoose.model('message', messageSchema, 'messages');