const express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Message = require('../modules/message'),
    //db = 'mongodb://user:psw@host:port/database'; 

mongoose.Promise = global.Promise;
mongoose.connect(db, (err) => {
    if(err){
        console.error('Erro! ' + err);
    } else {
        console.log('Connected with no errors...');
    }
});
/*
io.on('connection', (socket) => {
    socket.emit('test', {teste:'teste'});
});
*/
router.get('/messages', (req, res) => {
    console.log('Get request for chat history');
    Message.find({}).exec((err, messages) => {
        if(err){
            console.log('Error retrieving messages');
        } else {
            res.json(messages);
        }
    });
});

router.post('/message', (req, res) => {
    console.log('Post a message');
    let newMessage = new Message();
    newMessage.name = req.body.name;
    newMessage.text = req.body.text;

    newMessage.save((err, insertedMessage) => {
        if(err){
            console.log('Error saving message');
        } else {
            res.json(insertedMessage);
            
        }
    });
});

module.exports = router;