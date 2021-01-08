constants = require('./constants');
c = require('./colors.js'); // const {RESET,BLACK,RED,GREEN,YELLOW,BLUE,MAGENTA,CYAN,WHITE}

/********* SERVER CONFIG *********/
const SERVER_PORT = 3031; // main socket.io server port
const TICK_DURATION = 50; // ms
const PING_INTERVAL = 3000; // ping interval

express = require('express');
app = express();

var server = app.listen(process.env.PORT || SERVER_PORT); // set PORT=3216 && node server.js
io = require('socket.io')(server, {pingInterval: PING_INTERVAL});
console.log('Socket.io server started port: ' + process.env.PORT || SERVER_PORT);

mysql = require('mysql');
require('./mysql/main.js');

/********* SERVICE HTML PAGE *********/
//if(process.env.MAIN == 1){
require('./service/app.js');
//}

/********* FUNCTIONS *********/
Collision   = require('./collisions/functions.js');

/********* OBJECTS *********/
GameObject  = require('./GameObject');
Player      = require('./utils/player.js');
Block       = require('./utils/Block.js');
Bullet      = require('./utils/Bullet.js');
Flag        = require('./utils/Flag.js');
DroppedFlag = require('./utils/DroppedFlag');
DroppedFlag = require('./utils/DroppedFlag.js');
Message     = require('./Message.js');
ObjManager  = require('./manager.js');

/********* ARRAYS *********/
players = [];
objects = [];

/********* LOAD MAP *********/
loadMap = require('./map/load.js');

spawnRed = {x: 0, y: 0};
spawnBlue = {x: 0, y: 0};

loadMap('lobby');

require('./utils/Turret.js')

/********* NAMESPACES *********/
ioClient    = require('./Client.js');
ioSpectator = require('./Spectator.js');
ioAdmin     = require('./Admin.js');

/********* GAME VARIABLES *********/
gameStarted = false;

deltaTime = 1;
var lapseTime = 0;
var lastTime = getMillis();

/********* REFRESH *********/
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
         c.MAGENTA +' players: '  +c.YELLOW +players.length.toString().padStart(2)
        +c.MAGENTA +' objects: '  +c.YELLOW +objects.length.toString().padStart(4)
        +c.MAGENTA +' lapse: '    +c.YELLOW +lapseTime.toFixed(2).padStart(8)           +' ms'
        +c.MAGENTA +' delta: '    +c.YELLOW +deltaTime.toFixed(1).padStart(5)           +' ms'
    );
}

/********* SERVER OWN FUNCTIONS *********/

function getMillis() {
    const hrTime = process.hrtime();
    return (hrTime[0] * 1000 + hrTime[1]/1000000);
}
