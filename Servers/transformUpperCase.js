var socket = require('socket.io-client')('http://localhost:9092');

const LISTEN = process.env.LISTEN;
const ID = process.env.ID;



socket.on('connect', function() {
    console.log('Connected');

});
socket.on(LISTEN, function(data) {
    console.log("New event " + data);
    socket.emit('messageevent', { tag: ID, content: data.content.toUpperCase(), metadata: data.metadata });
});


socket.on('disconnect', function() {
    console.log('disconnected');
});