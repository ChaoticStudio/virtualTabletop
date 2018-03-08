const express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    //db = 'mongodb://user:psw@host:port/database'; 

mongoose.Promise = global.Promise;
mongoose.connect(db, (err) => {
    if(err){
        console.error('Erro! ' + err);
    } else {
        console.log('Connected with no errors...');
    }
});

router.get('/', (req, res) => {
    res.send('api works');
});

module.exports = router;