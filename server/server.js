constants = require('./constants');
const {RESET,BLACK,RED,GREEN,YELLOW,BLUE,MAGENTA,CYAN,WHITE} = require('./colors.js');

/********* SERVER CONFIG *********/
const SERVER_PORT = 3031; // main socket.io server port
const TICK_DURATION = 60; // ms
const PING_INTERVAL = 3000; // ping interval

express = require('express');
app = express();

var server = app.listen(process.env.PORT || SERVER_PORT); // set PORT=3216 && node server.js
io = require('socket.io')(server, {pingInterval: PING_INTERVAL});
console.log('Socket.io server started');

/********* SERVICE HTML PAGE *********/
require('./service/app.js');

/********* FUNCTIONS *********/
Collision   = require('./collisions/functions.js');

/********* OBJECTS *********/
GameObject  = require('./GameObject');
Player      = require('./utils/player.js');
Block       = require('./utils/Block.js');
Bullet      = require('./utils/Bullet.js');
Message     = require('./Message.js');
ObjManager  = require('./manager.js');

/********* GLOBAL ARRAYS *********/
players = [];
objects = [];

/********* LOAD MAP *********/
require('./map/load.js');

/********* SOCKET IO *********/
ioClient = require('./Client.js');
ioAdmin  = require('./Admin.js');

/********* middleware CLIENT GATE *********/
ioClient.use((socket, next) => {
    const query = socket.handshake.query;
    const user = query.user;
    const pass = query.pass;
    if (true) {
        return next();
    }
    return next(new Error('Authentication error'));
});

var lastTime = getMillis();
deltaTime = 1;

setInterval(refresh, TICK_DURATION);

function refresh(){
    var time = getMillis();
    deltaTime = time - lastTime;
    lastTime = time;

    logInfo();

    for(var i = 0; i < objects.length; i++){
        objects[i].update();
    }
    for(var i = 0; i < players.length; i++){
        if(players[i].respawning) console.log(players[i].name + ' respawning...');
        players[i].update();
    }
}

function logInfo() {
    console.log(
         MAGENTA +'players: '   +YELLOW +players.length.toString().padStart(2)
        +MAGENTA +' objects: '  +YELLOW +objects.length.toString().padStart(4)
        +MAGENTA +' delta: '    +YELLOW +deltaTime.toFixed(1).padStart(5)           +' ms'
    );
}

/********* SERVER OWN FUNCTIONS *********/

function getMillis() {
    const hrTime = process.hrtime();
    return (hrTime[0] * 1000 + hrTime[1]/1000000);
}
