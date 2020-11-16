
const ioClient = io.of('/client');

// middleware
ioClient.use((socket, next) => {
    const query = socket.handshake.query;
    const user = query.user;
    const pass = query.pass;

    /* TODO: Ověří přihlašovací údaje z MySQL databáze */
    return next();

    if (user === 'admin' && pass === 's8j2m6x4n1') {
        return next();
    }
    return next(new Error('Authentication error'));
});

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
        const p = players[id];
        if(p.respawning) return;

        const playerPos = {x: p.pos.x, y: p.pos.y};
        const delta = {x: Math.abs(playerPos.x - pos.x), y: Math.abs(playerPos.y - pos.y)};

        if(delta.x > 100 || delta.y > 100) {
            console.log("Anticheat detected speed hack!");
            p.hackingCounter++;
            /* TODO: Tell the player he must return to the last position */ 
            if(p.hackingCounter > 3){
                ioClient.emit('chat-message', new Message('&2Hráč '+p.name+' byl vyhozen za speed hack'));
                socket.emit('exception', {id: 600, message: 'Anticheat detected speed hack!'});
                socket.disconnect();
                return;
            }
        }

        p.pos = {x: pos.x, y: pos.y};
        p.rotation = pos.rotation;
        p.selectedGun = pos.selectedGun;
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