var express = require("express");
var socketio = require("socket.io");
var http = require("http");

var app = express();
var server = http.Server(app);
var io = socketio(server);

const PORT = 8082;

app.use(express.static("pub"));

const msg = {timestamp: 0, message: "", author: ""};
let history = [];
io.on("connection", (socket) => {
    console.log("user connected " + socket.id);

    socket.on("disconnect", () => {
        console.log(socket + " disconnected");
    });

    socket.on("message", (message, author) => {
        let x = Object.assign({}, msg);
        x.timestamp = Date.now();
        x.message   = message;
        x.author    = author;
        console.log(x);
    });
});

server.listen(PORT, function() {
    console.log("server is running");
});
