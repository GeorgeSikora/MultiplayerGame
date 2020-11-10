
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

const {getPlayer} = require('./test.js');

const Collision = require('./collisions/functions.js');
var constants = require('./constants.js');

Player = require('./utils/player.js');

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
        var id = getPlayer(socket.id);
        if(id == -1) return;

        const playerPos = {x: players[id].pos.x, y: players[id].pos.y};
        const delta = {x: Math.abs(playerPos.x - pos.x), y: Math.abs(playerPos.y - pos.y)};

        if(delta.x > 100 || delta.y > 100) {
            console.log("Anticheat detected speed hack!");
        }

        players[id].pos = {x: pos.x, y: pos.y};
        //socket.broadcast.emit('refPlayer', {id: socket.id ,x: pos.x, y: pos.y, hp: players[id].hp});
    });

    socket.on('shot', data => {
        if(data.x < -constants.SAFE_ZONE || data.x > constants.SAFE_ZONE || data.y < -constants.SAFE_ZONE || data.y > constants.SAFE_ZONE) {
            objects.push(new Bullet(socket.id, data.x, data.y, data.dir));
        }
    });

    socket.on('disconnect', (reason) => {

        io.emit('remPlayer', socket.id);

        var removeIndex =  getPlayer(socket.id);
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
            console.log(data.constants);

            for(var i = 0; i < data.constants.length; i++) {
                constants[data.constants[i].name] = data.constants[i].value;
                console.log(constants[data.constants[i].name]);
            }

            /*
            for (var i in constants) {
                if (constants.hasOwnProperty(i)) {
                    console.log(i, constants[i]);
                    constants[i] = constants[i];
                }
            }
            */
           /*
            for (var i in data.constants) {
                if (data.constants.hasOwnProperty(i)) {
                    console.log(i, data.constants[i]);
                }
            }*/

        } else {
            console.log('SERVER ACCESS denied!');
        }
    });
    
});

var lastTime = getMillis();
var deltaTime;

const BLACK =   "\x1b[30m";
const RED =     "\x1b[31m";
const GREEN =   "\x1b[32m";
const YELLOW =  "\x1b[33m";
const BLUE =    "\x1b[34m";
const MAGENTA = "\x1b[35m";
const CYAN =    "\x1b[36m";
const WHITE =   "\x1b[37m";

setInterval(() => {
    var time = getMillis();
    deltaTime = time - lastTime;
    lastTime = time;

    // \x1b[36m%s\x1b[0m   
    // \x1b[31m

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
    }
}, 100);

function getMillis(){
    const hrTime = process.hrtime();
    return (hrTime[0] * 1000 + hrTime[1]/1000000);
}

class Block extends GameObject {
    constructor(x, y){
        super(x, y, 64, 64);
    }
}

objects.push(new Block(320,-64));
objects.push(new Block(320,0));
objects.push(new Block(320,64));

/*** BULLET CLASS ***/
class Bullet {
    constructor(shooterID, x, y, dir){
        this.shooterID = shooterID;

        this.pos = {x:x, y:y};
        this.dir = dir;
        this.speed = 1;

        io.emit('shot', {shooterID: this.shooterID, pos: this.pos, speed: {x: Math.cos(this.dir) * this.speed, y: Math.sin(this.dir) * this.speed}});
    }
    update(){
        if(this.pos.x < -10000 || this.pos.x > 10000 || this.pos.y < -10000 || this.pos.y > 10000) {
            removeObject(this);
        }
        var move = {x:0, y:0};
        move.x = Math.cos(this.dir) * this.speed * deltaTime;
        move.y = Math.sin(this.dir) * this.speed * deltaTime;

        for(var i = 0; i < players.length; i++){
            const p = players[i];

            if(p.id == this.shooterID) continue;

            if(Collision.lineRect(this.pos.x, this.pos.y, this.pos.x+move.x, this.pos.y+move.y, p.pos.x-p.w/2, p.pos.y-p.h/2, p.w, p.h)){
               if(p.pos.x < -constants.SAFE_ZONE || p.pos.x > constants.SAFE_ZONE || p.pos.y < -constants.SAFE_ZONE || p.pos.y > constants.SAFE_ZONE) {
                p.hp -= constants.PLAYER_DAMAGE;

                if(p.hp <= 0) {
                    io.to(p.id).emit('respawn');
                    p.pos = {x:0, y:0};
                    p.hp = constants.PLAYER_HP;
                    
                    const killer = players[getPlayer(this.shooterID)];
                    if(killer != null) killer.kills++;
                }

               }
               removeObject(this);
               console.log(p.name,'get hit');
            }
        }

        this.pos.x += move.x;
        this.pos.y += move.y;
    }
}

function removeObject(object){
    objects.splice(objects.indexOf(object), 1);
}

function getObject(id) {
    for(var i = 0; i < objects.length; i++) {
        if(objects[i].id === id) {
            return objects[i];
        }
    }
    return null;
}
function getObjectIndex(id) {
    for(var i = 0; i < objects.length; i++) {
        if(objects[i].id === id) {
            return i;
        }
    }
    return -1;
}