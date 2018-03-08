const express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),

mongoose.Promise = global.Promise;
mongoose.connect(db, (err) => {
    if(err){
        console.error('Erro! ' + err);
    }
});

router.get('/', (req, res) => {
    res.sendFile('api works');
});

module.exports = router;