const express = require('express'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Message = require('../modules/message'),
    CharacterSheet = require('../modules/character-sheet'),
    CharacterSheetTemplate = require('../modules/character-sheet-template'),
    User = require('../modules/user'),
    db = 'mongodb://dougbyte:AZ4Q4Ra4@ds249398.mlab.com:49398/virtualtabletop',
    secretKey = 'wz!hWGbnD$%CJFzd#5M46'; // ignore implement by file

mongoose.connect(db, {useNewUrlParser: true});
let dbc = mongoose.connection;
dbc.on('error', console.error.bind(console, 'MongoDB connection error:'));

function verifyToken(req, res, next){
    if(!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }

    const token = req.headers.authorization.split(' ')[1];
    if(token === null) {
        return res.status(401).send('Unauthorized request');
    }

    const payload = jwt.verify(token, secretKey);
    if(!payload) {
        return res.status(401).send('Unauthorized request');
    }

    req.userId = payload.subject;
    next();
}

router.post('/register', (req, res) => {
    let newUser = new User(req.body);
    const saltRounds = 11;
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
                console.log(err);
            }
            if (hash) {
                newUser.password = hash;
                newUser.save((error, registeredUser) => {
                    if(error) {
                        console.log(error);
                    } else {
                        let payload = { subject: registeredUser._id };
                        let token = jwt.sign(payload, secretKey, { expiresIn: '7d' });
                        res.status(200).send({token});
                    }
                });
            }
        });
    });
});

router.post('/login', (req, res) => {
    let userData = req.body;
    User.findOne({email: userData.email}, (error, user) => {
        if(error) {
            console.log(error);
        } else {
            if (!user) {
                res.status(401).send('Invalid email or password');
            } else {
                bcrypt.compare(userData.password, user.password, (err, resp) => {
                    if (err) {
                        console.log(err);
                    } else  if (!resp) {
                        res.status(401).send('Invalid email or password');
                    } else {
                        let payload = { subject: user._id };
                        let token = jwt.sign(payload, secretKey, { expiresIn: '7d' });
                        res.status(200).send({token});
                    }
                });
            }
        }
    });
});
// trocar get por algo "seguro"
router.get('/userdata', verifyToken, (req, res) => {    
    User.findById(jwt.decode(req.query.jwt).subject).exec((error, user) => {
        if (error) {
            console.log(error);
        } else {
            if (!user) {
                res.status(401).send('Unauthorized request');
            } else {
                const userData = {
                    'id': user._id,
                    'name': user.username,
                    'email': user.email
                };
                res.status(200).json(userData);
            }
        }
    });
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
    if(req.query.owner) {
        CharacterSheet.findOne({'owner': req.query.owner}).exec((err, characterSheets) => {
            if (err) {
                console.log('Error retrieving character sheet');
            } else {
                res.json(characterSheets);
            }
        });
    } else {
        res.json({'owner': "not defined", 'sheet':"error"});
    }
});

router.post('/character-sheet', (req, res) => {
    if(req.body.owner) {
        CharacterSheet.findOneAndUpdate({'owner': req.body.owner}, req.body, {upsert:true, new: true}, function(err, insertedCharacterSheet){
            if (err) {
                res.json({'owner': "internal error", sheet:"error"});
                console.log('Error: ' + err);
            }
            res.json(insertedCharacterSheet);
        });
    } else {
        res.json({'owner': "owner not defined", 'sheet':"error"});
    }
});

router.get('/character-sheet-template', (req, res) => {
    if(req.query.all) {
        CharacterSheetTemplate.find({}).exec((err, characterSheetTemplate) => {
            if (err) {
                console.log('Error retrieving character sheet templates');
            } else {
                res.json(characterSheetTemplate);
            }
        });
    } else if(req.query.id) {
        CharacterSheetTemplate.findOne({'id': req.query.id}).exec((err, characterSheetTemplate) => {
            if (err) {
                console.log('Error retrieving character sheet template');
            } else {
                res.json(characterSheetTemplate);
            }
        });
    } else {
        res.json({'error':"'id' not defined"});
    }
});

router.post('/character-sheet-template', (req, res) => {
    if(req.body.id) {
        CharacterSheetTemplate.findOneAndUpdate({'id': req.body.id}, req.body, {upsert:true, new: true}, function(err, insertedCharacterSheetTemplate){
            if (err) {
                res.json({'error': "internal error"});
                console.log('Error: ' + err);
            } else {
                res.json(insertedCharacterSheetTemplate);
            }
        });
    } else {
        res.json({'error': "id not defined"});
    }
});

module.exports = router;