const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const messageSchema = new Schema({
    name: String,
    text: String
});

module.exports = mongoose.model('message', messageSchema, 'messages');