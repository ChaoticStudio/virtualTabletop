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
    newMessage.message = req.body.message;
    if(newMessage.name !== '' && newMessage.message !== ''){
        newMessage.save((err, insertedMessage) => {
            if(err){
                console.log('Error saving message');
            } else {
                res.json(insertedMessage);
            }
        });
    }
});

module.exports = {
    router,
    // Witchcraft to use socketIO from here
    socketIo: (io) => {
        io.on('connection', socket => {

            // Create function to send status
            sendStatus = function(s){
                socket.emit('status', s);
            }
             // Get chats from mongo collection
            Message.find({}).exec((err, messages) => {
                if(err){
                    throw err;
                }
                // Emit the messages                
                socket.emit('output', messages);
            });
            // Handle input events
            socket.on('input', (data) => {
                let name = data.name;
                let message = data.message;
                // Check for name and message
                if(name == '' || message == ''){
                    // Send error status
                    sendStatus('Please enter a name and message');
                } else {
                    // Insert message
                    io.emit('output', [data]);
                    // Send status object
                    sendStatus({
                        message: 'Message sent',
                        clear: true
                    });
                }
            });

            // Handle clear
            socket.on('clear', function(data){
                // Remove all chats from collection
                Message.remove({}, function(){
                    // Emit cleared
                    socket.emit('cleared');
                });
            });
        });
    }
}