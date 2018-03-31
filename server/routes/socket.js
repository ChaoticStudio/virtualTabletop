const Message = require('../modules/message'),
      mongoose = require('mongoose'),

mongoose.Promise = global.Promise;
mongoose.connect(db, (err) => {
    if(err){
        console.error('Erro! ' + err);
    } else {
        console.log('Connected with no errors...');
    }
});

module.exports = {
    // Witchcraft to use socketIO from here
    socket: (io) => {
        io.on('connection', socket => {
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
                    socket.emit('status', 'Please enter a name and message');
                } else {
                    // Insert message
                    io.emit('output', [data]);
                    // Send status object
                    socket.emit('status', {
                        message: 'Message sent',
                        clear: true
                    });
                }
            });

            // Handle clear
            socket.on('clear', (data) => {
                // Remove all chats from collection
                Message.remove({}, () => {
                    // Emit cleared
                    socket.emit('cleared');
                });
            });
        });
    }
}