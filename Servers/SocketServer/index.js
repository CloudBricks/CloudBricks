var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);

console.log("SOCKET SERVER");

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    console.log('New Connection');
    socket.on('messageevent', function(data) {
        console.log("Data recieved: " + JSON.stringify(data));
        io.emit(data.tag, data);
    });
});