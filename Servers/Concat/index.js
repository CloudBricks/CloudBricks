var socket = require('socket.io-client')('http://socketserver:8080');

const LISTEN = process.env.LISTEN;
const ID = process.env.ID;
const CONCAT = process.env.CONCAT;
// const ID = "2";
// const LISTEN = "1";

console.log("CONCAT");

socket.on('connect', function() {
    console.log('Connected');
});
socket.on('disconnect', function() {
    console.log('disconnected');
});

function recursivelyFindStrings(data, id) {
    var it = data[id];
    if (!it) {
        return;
    } else if (!it.toUpperCase) {
        for (var key in it) {
            recursivelyFindStrings(it, key);
        }
    } else {
        data[id] += CONCAT;
    }
}

socket.on(LISTEN, function(data) {
    console.log("New event " + JSON.stringify(data));
    recursivelyFindStrings(data, 'content');
    socket.emit('messageevent', { tag: ID, content: data, metadata: data.metadata });
});