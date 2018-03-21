const express = require('express'),
    http = require('http'),
    socketIo = require('socket.io'),
    app = express(),
    server = http.Server(app),
    io = socketIo(server),
    bodyParser = require('body-parser'),
    path = require('path'),
    api = require('./server/routes/api').router,
    port = 3000,
    hostName = '25.52.151.204'// 'localhost';

// Where the angular code is placed, gives express access to dist folder
app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Route to the application
app.use('/api', api);

// Any other route server render the index
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

server.listen(port, hostName, () => {
    console.log('Server runnig on: '+ hostName + ':' + port);
});

// Makes the io visible to the api
require('./server/routes/api').socketIo(io);