
global.constants = require('./constants');
const{BLACK,RED,GREEN,YELLOW,BLUE,MAGENTA,CYAN,WHITE} = require('./colors.js');

/* Server config */
const SERVICE_PORT = 8088; // server service port
const TICK_DURATION = 50; // ms

const path = require('path');
const express = require('express');
const app = express();

var server = app.listen(process.env.PORT || 3031);
global.io = require('socket.io')(server, {pingInterval: 3000});
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
ObjManager  = require('./manager.js');

/********* GLOBAL ARRAYS *********/
global.players = [];
global.objects = [];

/********* LOAD MAP *********/
require('./map/load.js');

/********* SOCKET IO *********/
io.on('connection', socket => {
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
        var removeIndex = ObjManager.getPlayer(socket.id);

        if(removeIndex == -1) return;
        
        io.emit('remPlayer', socket.id);
        console.log('removing index: ' + removeIndex + ' size is: ' + players.length);
        players.splice(removeIndex, 1);
    });

    /********* SERVER ADMIN *********/
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

const adminNamespace = io.of('/admin');

adminNamespace.use((socket, next) => {
  // ensure the user has sufficient rights
  //console.log(socket);
  //new Error('thou shall not pass');
  var sHeaders = socket.handshake.headers;
  console.info('[%s:%s] CONNECT', sHeaders['x-forwarded-for'], sHeaders['x-forwarded-port']);
    next();
});

adminNamespace.on('connection', socket => {

  socket.on('delete user', () => {
    // ...
  });
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
