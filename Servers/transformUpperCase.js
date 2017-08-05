var socket = require('socket.io-client')('http://localhost:9092');

const LISTEN = process.env.LISTEN;
const ID = process.env.ID;



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