const uuid = require('uuid/v4');
s
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(8080);


const ID = process.env.ID;

const currentRequests = {};

app.get('/hello-world', function(req, res) {
    res.send('hello, world');
});

app.get('*', function(req, res) {
    const guid = uuid();
    const message = { tag: ID, metadata: {}, content: req.body };
    reponse.metadata[`${ID}-guid`] = guid;
    io.emit('messageevent', message);
    currentRequests[guid] = res;
})

io.on('connection', function(socket) {
    socket.emit('news', { hello: 'world' });
    socket.on(ID, function(data) {
        currentRequests[data.metadata[`${ID}-guid`]].json(data);
    })
});