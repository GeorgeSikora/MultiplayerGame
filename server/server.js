constants = require('./constants');
const {RESET,BLACK,RED,GREEN,YELLOW,BLUE,MAGENTA,CYAN,WHITE} = require('./colors.js');

/********* SERVER CONFIG *********/
const SERVER_PORT = 3031; // main socket.io server port
const TICK_DURATION = 90; // ms
const PING_INTERVAL = 3000; // ping interval

express = require('express');
app = express();

var server = app.listen(process.env.PORT || SERVER_PORT); // set PORT=3216 && node server.js
io = require('socket.io')(server, {pingInterval: PING_INTERVAL});
console.log('Socket.io server started port: ' + process.env.PORT || SERVER_PORT);

/********* SERVICE HTML PAGE *********/
require('./service/app.js');

/********* FUNCTIONS *********/
Collision   = require('./collisions/functions.js');

/********* OBJECTS *********/
GameObject  = require('./GameObject');
Player      = require('./utils/player.js');
Block       = require('./utils/Block.js');
Bullet      = require('./utils/Bullet.js');
Flag        = require('./utils/Flag.js');
DroppedFlag        = require('./utils/DroppedFlag.js');
Message     = require('./Message.js');
ObjManager  = require('./manager.js');

/********* ARRAYS *********/
players = [];
objects = [];

/********* LOAD MAP *********/
require('./map/load.js');

/********* NAMESPACES *********/
ioClient = require('./Client.js');
ioAdmin  = require('./Admin.js');

/********* NAMESPACES *********/

deltaTime = 1;
var lapseTime = 0;
var lastTime = getMillis();
function refresh(){
    var time = getMillis();
    deltaTime = time - lastTime;
    lastTime = time;

    //logInfo();

    for(var i = 0; i < objects.length; i++){
        objects[i].update();
    }
    for(var i = 0; i < players.length; i++){
        //if(players[i].respawning) console.log(players[i].name + ' respawning...');
        players[i].update();
    }
    lapseTime = getMillis() - time;
}
setInterval(refresh, TICK_DURATION);

function logInfo() {
    console.log(
         MAGENTA +'players: '   +YELLOW +players.length.toString().padStart(2)
        +MAGENTA +' objects: '  +YELLOW +objects.length.toString().padStart(4)
        +MAGENTA +' lapse: '    +YELLOW +lapseTime.toFixed(2).padStart(8)           +' ms'
        +MAGENTA +' delta: '    +YELLOW +deltaTime.toFixed(1).padStart(5)           +' ms'
    );
}

/********* SERVER OWN FUNCTIONS *********/

function getMillis() {
    const hrTime = process.hrtime();
    return (hrTime[0] * 1000 + hrTime[1]/1000000);
}
