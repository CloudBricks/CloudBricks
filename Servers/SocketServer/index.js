var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);

console.log("SOCKET SERVER");

app.get('/', function(req, res) {
    res.send({});
});

io.on('connection', function(socket) {
    console.log('New Connection');
    socket.on('messageevent', function(data) {
        console.log("Data recieved(messageevent): " + JSON.stringify(data));
        io.emit(data.tag, data);
    });

    socket.on('updatecontainer', function(data) {
        console.log("Data recieved(updatecontainer): " + JSON.stringify(data));
        io.emit('updatecontainer', data);
    })

    socket.on('deleteallcontainers', function(data) {
        io.emit('deleteallcontainers', data);
    })
});