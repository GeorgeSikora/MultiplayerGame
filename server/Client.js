
const ioClient = io.of('/client');

ioClient.on('connection', socket => {
    console.log('New client connected');

    socket.on('initReq', data => { // init request
        console.log(socket.id, data);
        socket.emit('init', {constants: constants, players: players, objects: objects});
        players.push(new Player(socket.id, data.name, data.x, data.y, data.colorID, data.col));
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
            players[id].hackingCounter++;
            /* TODO: Tell the player he must return to the last position */ 
            if(players[id].hackingCounter > 3){
                socket.emit('exception', {id: 600, message: 'Anticheat detected speed hack!'});
                socket.disconnect();
                return;
            }
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
        ioClient.emit('remPlayer', socket.id);
        players.splice(removeIndex, 1);
        console.log('removing index: ' + removeIndex + ' now size is: ' + players.length);
    });

    socket.on('chat-message', msg => {
        var id = ObjManager.getPlayer(socket.id);
        if(id == -1) return;
        socket.broadcast.emit('chat-message', new Message(msg, players[id]));
    });
});

module.exports = ioClient;