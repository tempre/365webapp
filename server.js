var express = require("express");
var socketio = require("socket.io");
var http = require("http");

var app = express();
var server = http.Server(app);
var io = socketio(server);

const PORT = 8082;

app.use(express.static("pub"));

/** DEFNS */
const MESSAGE    = 0;
const USER       = 1;
const EVENT_SIZE = 2;

const STR_DEFAULT_SERVER = "global.";
const STR_USER_JOIN      = " has joined ";
const STR_USER_LEAVE     = " has left ";

const INT_USER_LEFT = 0;
const INT_USER_JOIN = 1;

const MESSAGE_STRUCT = {timestamp: 0, message: "", author: ""};

/** GLOBALS */
var HISTORY = [];

/** EVENT HANDLES */
function message_handler(action, data) {
    let x = Object.assign({}, MESSAGE_STRUCT);
    x.timestamp = Date.now();
    x.message   = data.message;
    x.author    = data.author;
    HISTORY.push(x);
    io.emit("update", x);
}

/** HELPERS */
function format_user_string(data) {
    if(data.action == INT_USER_LEFT)
    {
        return (data.author + STR_USER_LEAVE + STR_DEFAULT_SERVER)
    }
    else
    {
        return (data.author + STR_USER_JOIN + STR_DEFAULT_SERVER)
    }
}

io.on("connection", (socket) => {
    console.log("user connected " + socket.id);
    socket.emit("init", HISTORY);

    socket.on("disconnect", () => {
        console.log(socket.id + " disconnected");
    });


    socket.on("event", (event, data) => {
        message_handler(event, data);
    })
});

server.listen(PORT, function() {
    console.log("server is running");
});
