const express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Message = require('../modules/message'),
    CharacterSheet = require('../modules/character-sheet'),
//db = 'mongodb://user:psw@host:port/database';
    db = 'mongodb://michael.mucelin:123456789@ds249398.mlab.com:49398/virtualtabletop'; //ignore
mongoose.Promise = global.Promise;
mongoose.connect(db, (err) => {
    if (err) {
        console.error('Erro! ' + err);
    } else {
        console.log('Connected with no errors...');
    }
});

router.get('/messages', (req, res) => {
    console.log('Get request for chat history');
    Message.find({}).exec((err, messages) => {
        if (err) {
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
    if (newMessage.name !== '' && newMessage.message !== '') {
        newMessage.save((err, insertedMessage) => {
            if (err) {
                console.log('Error saving message');
            } else {
                res.json(insertedMessage);
            }
        });
    }
});

router.get('/character-sheet', (req, res) => {
    console.log('Get request for character sheet');
    if(req.query.name) {
        CharacterSheet.findOne({}).exec((err, characterSheets) => {
            if (err) {
                console.log('Error retrieving character sheet');
            } else {
                console.log(characterSheets);
                res.json(characterSheets);
            }
        });
    } else {
        res.json({name: "not defined", sheet:"error"});
    }
});

router.post('/character-sheet', (req, res) => {
    console.log('Post a character sheet');
    let newCharacterSheet = new CharacterSheet();
    newCharacterSheet.owner = req.body.owner;
    newCharacterSheet.sheet = req.body.sheet;
    newCharacterSheet.save((err, insertedCharacterSheet) => {
        if (err) {
            console.log('Error character sheet');
        } else {
            res.json(insertedCharacterSheet);
        }
    });

});


module.exports = router;