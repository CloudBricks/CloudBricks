const uuid = require('uuid/v4');
const app = require('express')();
const bodyparser = require('body-parser');
const server = require('http').Server(app);
var socket = require('socket.io-client')('http://localhost:9092');
server.listen(8080);


// const ID = process.env.ID;
// const LISTEN = process.env.LISTEN;
const ID = "1";
const LISTEN = "2";
const currentRequests = {};

socket.on('connect', function() {
    console.log('Connected');
});
socket.on('disconnect', function() {
    console.log('disconnected');
});

app.use(bodyparser.json());

app.get('/hello-world', function(req, res) {
    res.send('hello, world');
});

app.post('*', function(req, res) {

    const guid = uuid();
    var message = { tag: ID, metadata: {}, content: req.body };
    message.metadata[`${ID}-guid`] = guid;
    console.log(`Request ${ID}-guid: ` + JSON.stringify(message));
    socket.emit('messageevent', message);
    currentRequests[guid] = res;
})


socket.on(LISTEN, function(data) {
    currentRequests[data.metadata[`${ID}-guid`]].json(data);
});