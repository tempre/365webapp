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
const USER_JOIN  = 1;
const USER_LEAVE = 2;
const EVENT_SIZE = 3;


const STR_DEFAULT_SERVER = "global.";
const STR_USER_JOIN      = " has joined ";
const STR_USER_LEAVE     = " has left ";

const MESSAGE_STRUCT = {timestamp: 0, message: "", author: ""};

/** GLOBALS */
var HISTORY = [];
var USER_HISTORY = new Map();

/** EVENT HANDLES */
function user_handle(action, data, socket, obj)
{
    let ret = false;
    if(!USER_HISTORY.has(data.author))
    {
        obj.message = format_user_string(action, data);
        ret = true;
    }
    USER_HISTORY.set(data.author, socket.id);
    console.log(USER_HISTORY);
    return ret;
}

function message_handler(action, data, socket) {
    let x = Object.assign({}, MESSAGE_STRUCT);
    x.timestamp = Date.now();
    x.author    = data.author;

    switch(action)
    {
        case USER_JOIN || USER_LEAVE:
            if(!user_handle(action, data, socket, x))
            {
                return;
            }
            break;

        case MESSAGE:
            x.message   = data.message;
            break;

        default:
            x.message = "invalid";
            break;
    }
    HISTORY.push(x);
    io.emit("update", x);
}

/** HELPERS */
function format_user_string(e, data) {
    if(e == USER_LEAVE)
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
        message_handler(event, data, socket);
    })
});

server.listen(PORT, function() {
    console.log("server is running");
});
