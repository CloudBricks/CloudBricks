var socket = require('socket.io-client')('http://socketserver:8080');

const LISTEN = process.env.LISTEN;
const ID = process.env.ID;
// const ID = "2";
// const LISTEN = "1";

console.log("TRANSFORM UPPERCASE");

socket.on('connect', function() {
    console.log('Connected');
});
socket.on('disconnect', function() {
    console.log('disconnected');
});

function recursivelyUppercase(data, id) {
    var it = data[id];
    if (!it) {
        return;
    } else if (!it.toUpperCase) {
        for (var key in it) {
            recursivelyUppercase(it, key);
        }
    } else {
        data[id] = it.toUpperCase();
    }
}

socket.on(LISTEN, function(data) {
    console.log("New event " + JSON.stringify(data));
    recursivelyUppercase(data, 'content');
    socket.emit('messageevent', { tag: ID, content: data, metadata: data.metadata });
});