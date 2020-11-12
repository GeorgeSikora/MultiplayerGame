
global.constants = require.main.require('./constants');

const path = require('path');
const express = require('express');
const app = express();
const port = 8088;

var server = app.listen(process.env.PORT || 3031);
global.io = require('socket.io')(server, {pingInterval: 3000});
console.log('Socket.io server started');

/********* HTML PAGE *********/
app.use(express.static('public'));
app.use((req, res, next) => {
    res.status(404).send('page not found :( ' + req.url);
})
app.listen(port, () => {
    console.log('App listener on port ' + port)
})

/********* MY FUNCTIONS *********/
GameObject = require('./GameObject');

Collision = require('./collisions/functions.js');
var constants = require('./constants.js');

Player = require('./utils/player.js');

ObjManager = require('./manager.js');

global.players = [];
global.objects = [];

/********* SOCKET IO *********/
io.sockets.on('connection', function (socket) {

    console.log('new connection');

    socket.on('initReq', data => { // init request
        console.log(socket.id, data);
        socket.emit('init', {constants: constants, players: players, objects: objects});
        players.push(new Player(socket.id, data.name, data.x, data.y, data.col));
        socket.broadcast.emit('newPlayer', players[players.length-1]);
    });

    socket.on('pos', pos => {
        var id = ObjManager.getPlayer(socket.id);
        if(id == -1) return;
        if(players[id].respawning) return;

        const playerPos = {x: players[id].pos.x, y: players[id].pos.y};
        const delta = {x: Math.abs(playerPos.x - pos.x), y: Math.abs(playerPos.y - pos.y)};

        if(delta.x > 100 || delta.y > 100) {
            console.log("Anticheat detected speed hack!");

            /* TODO: Tell the player he must return to the last position */ 

            //socket.disconnect();
            //return;
        }

        players[id].pos = {x: pos.x, y: pos.y};
        players[id].rotation = pos.rotation;
        players[id].selectedGun = pos.selectedGun;
    });

    socket.on('respawned', () => {
        var id = ObjManager.getPlayer(socket.id);
        if(id == -1) return;
        players[id].respawning = false;
    });

    socket.on('shot', data => {
        if(data.x < -constants.SAFE_ZONE || data.x > constants.SAFE_ZONE || data.y < -constants.SAFE_ZONE || data.y > constants.SAFE_ZONE) {
            objects.push(new Bullet(socket.id, data.x, data.y, data.dir));
        }
    });

    socket.on('disconnect', (reason) => {
        io.emit('remPlayer', socket.id);
        var removeIndex = ObjManager.getPlayer(socket.id);
        console.log('removing index: ' + removeIndex + ' size is: ' + players.length);
        players.splice(removeIndex, 1);
    });

    /* FOR SERVER ADMIN */
    socket.on('get_constants', access => {
        if(access.user == 'admin' && access.password == 's8j2m6x4n1') {
            console.log(constants);
            socket.emit('constants', constants);
        } else {
            console.log('SERVER ACCESS denied!');
        }
    });
    socket.on('set_constants', data => {
        if(data.access.user == 'admin' && data.access.password == 's8j2m6x4n1') {
            for(var i = 0; i < data.constants.length; i++) {
                constants[data.constants[i].name] = data.constants[i].value;
            }
        } else {
            console.log('SERVER ACCESS denied!');
        }
    });
});

const{BLACK,RED,GREEN,YELLOW,BLUE,MAGENTA,CYAN,WHITE}=require('./colors.js');

var lastTime = getMillis();
global.deltaTime = 1;

const SERVER_INTERVAL_REFRESH = 80;
setInterval(() => {
    var time = getMillis();
    deltaTime = time - lastTime;
    lastTime = time;

    console.log(MAGENTA+'players: '+YELLOW+'%s'+
                MAGENTA+' objects: '+YELLOW+'%s'+
                MAGENTA+' time: '+YELLOW+'%s ms',
                
                players.length.toString().padStart(2),
                objects.length.toString().padStart(4),
                deltaTime.toFixed(1).padStart(5)
    );

    for(var i = 0; i < objects.length; i++){
        objects[i].update();
    }
    for(var i = 0; i < players.length; i++){
        players[i].update();
        if(players[i].respawning) console.log(players[i].name + ' respawning...');
    }
}, SERVER_INTERVAL_REFRESH);

function getMillis(){
    const hrTime = process.hrtime();
    return (hrTime[0] * 1000 + hrTime[1]/1000000);
}

class Block extends GameObject {
    constructor(x, y){
        super(x, y, 64, 64);
    }
}

const fs = require('fs');

try {  
    const data = fs.readFileSync('map.txt', 'utf8');
    const lines = data.split(/\r?\n/);

    for(var i = 0; i < lines.length; i++){
        const param = lines[i].split(" ");
        const x = parseInt(param[0]);
        const y = parseInt(param[1]);
        objects.push(new Block(x,y));
    }

} catch(e) {
    console.log('Error:', e.stack);
}

const Bullet = require('./utils/Bullet.js');