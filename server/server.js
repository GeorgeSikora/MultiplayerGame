
global.constants = require('./constants');
const{BLACK,RED,GREEN,YELLOW,BLUE,MAGENTA,CYAN,WHITE} = require('./colors.js');

/********* SERVER CONFIG *********/
const SERVER_PORT = 3031; // main socket.io server port
const SERVICE_PORT = 8088; // server admin service port
const TICK_DURATION = 50; // ms
const PING_INTERVAL = 3000; // ping interval

const express = require('express');
const app = express();
console.log(process.env.PORT);
var server = app.listen(process.env.PORT || SERVER_PORT); // set PORT=3216 && node server.js
global.io = require('socket.io')(server, {pingInterval: PING_INTERVAL});
console.log('Socket.io server started');

/********* HTML PAGE *********/
app.use(express.static('public'));
app.use((req, res, next) => {
    res.status(404).send('page not found :( ' + req.url);
});
app.listen(SERVICE_PORT, () => {
    console.log('Server service on port ' + SERVICE_PORT)
});

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
global.players = [];
global.objects = [];

/********* LOAD MAP *********/
require('./map/load.js');

/********* SOCKET IO *********/
ioClient = require('./Client.js');
ioAdmin  = require('./Admin.js');

// middleware
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
global.deltaTime = 1;

setInterval(() => {
    var time = getMillis();
    deltaTime = time - lastTime;
    lastTime = time;

    console.log(MAGENTA+'players: '+YELLOW+'%s'+
                MAGENTA+' objects: '+YELLOW+'%s'+
                MAGENTA+' delta: '+YELLOW+'%s ms',
                
                players.length.toString().padStart(2),
                objects.length.toString().padStart(4),
                deltaTime.toFixed(1).padStart(5)
    );

    for(var i = 0; i < objects.length; i++){
        objects[i].update();
    }
    for(var i = 0; i < players.length; i++){
        if(players[i].respawning) console.log(players[i].name + ' respawning...');
        players[i].update();
    }
}, TICK_DURATION);

function getMillis(){
    const hrTime = process.hrtime();
    return (hrTime[0] * 1000 + hrTime[1]/1000000);
}
