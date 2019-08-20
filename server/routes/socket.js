const Message = require('../modules/message'),
      CharacterSheet = require('../modules/character-sheet'),
      mongoose = require('mongoose'),
      db = 'mongodb://dougbyte:AZ4Q4Ra4@ds249398.mlab.com:49398/virtualtabletop';

mongoose.connect(db, {useNewUrlParser: true});
let dbc = mongoose.connection;
dbc.on('error', console.error.bind(console, 'MongoDB SOCKET connection error:'));

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

            CharacterSheet.findOne({}).exec((err, sheet) => {
                if(err){
                    throw err;
                }
                // Emit the messages
                socket.emit('outputSheet', sheet);
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