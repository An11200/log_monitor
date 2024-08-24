const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const socketIo = require('socket.io');
const Watcher = require('./watcher');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Use CORS middleware
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, '/')));

let watcher = new Watcher("test.log");
watcher.start();

app.get('/log', (req, res) => {
    console.log("request received");
    var options = {
        root: path.join(__dirname)
    };

    var fileName = 'index.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});

io.on('connection', (socket) => {
    console.log("new connection established:" + socket.id);

    watcher.on("process", (data) => {
        socket.emit("update-log", data);
    });

    let data = watcher.getLogs();
    socket.emit("init", data);
});

server.listen(3000, () => {
    console.log('listening on localhost:3000');
});
