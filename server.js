var express = require("express");
var socketio = require("socket.io");
var http = require("http");

var app = express();
var server = http.Server(app);
var io = socketio(server);

const PORT = 8082;

app.use(express.static("pub"));

server.listen(PORT, function() {
    console.log("server is running");
});
