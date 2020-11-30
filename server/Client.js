
const ioClient = io.of('/client');

var SimplexNoise = require('simplex-noise');
simplex = new SimplexNoise(Math.random);

var startTimeoutHandle;

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

        if(gameStarted) {
            socket.emit('chat-message', new Message('&2Game already started!'));
            return;
        }
        const teams = countTeams();

        if((data.team == 'red' && teams.red != 0 && teams.blue == 0)
        || (data.team == 'blue' && teams.red == 0  && teams.blue != 0)){
            socket.emit('chat-message', new Message('&2Tento tým by byl v přesile, vyber si nějaký jiný!'));
            return;
        }

        const pos = data.team == 'red' ? spawnRed : spawnBlue;

        socket.emit('init', {constants: constants, players: players, spawn: pos});
        socket.emit('load-map', {objects: objects});

        players.push(new Player(socket.id, data.name, pos.x, pos.y, data.team));

        for(var i = 0; i < players.length; i++) {
            socket.to(players[i].id).emit('newPlayer', players[players.length-1]);
        }

        if(startTimeoutHandle != null) clearTimeout(startTimeoutHandle);

        if(players.length >= 2) {
            
            ioClient.emit('chat-message', new Message('&3Game will start after 10 seconds!'));

            startTimeoutHandle = setTimeout(() => {

                loadMap('map_flags');

                console.log(players.length);
                for(var i = 0; i < players.length; i++) {
                    const spawnPos = players[i].team == 'red' ? spawnRed : spawnBlue;

                    players[i].pos = spawnPos; 
                    players[i].hp = constants.PLAYER.HP;
                    players[i].kills = 0;

                    ioClient.to(players[i].id).emit('load-map', {objects: objects, spawn: spawnPos});
                }

                ioClient.emit('chat-message', new Message('&3Game started!'));
                gameStarted = true;
            }, 10000);
        }
        
        sendTeams();
    });

    socket.on('disconnect', (reason) => {
        var removeIndex = ObjManager.getPlayer(socket.id);
        if(removeIndex == -1) return;
        ioClient.emit('remPlayer', socket.id);
        //ioSpectator.emit('remPlayer', socket.id);
        players.splice(removeIndex, 1);
        console.log('removing index: ' + removeIndex + ' now size is: ' + players.length);

        const teams = countTeams();
        if(gameStarted && (teams.red == 0 || teams.blue == 0)) {
            
            const winnerTeam = teams.red != 0 ? 'red' : 'blue';

            ioClient.emit('chat-message', new Message('&3The &' + Message.getColorToken(winnerTeam) + winnerTeam + '&3 team won the match!'));
            gameEnd();
        }
    });

    socket.on('pos', pos => {
        var id = ObjManager.getPlayer(socket.id);
        if(id == -1) return;
        const p = players[id];
        if(p.respawning) return;

        const playerPos = {x: p.pos.x, y: p.pos.y};
        const delta = {x: Math.abs(playerPos.x - pos.x), y: Math.abs(playerPos.y - pos.y)};

        if(constants.ANTICHEAT.ENABLE) {
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
        }

        p.pos = {x: pos.x, y: pos.y};
        p.rotation = pos.rotation;
        p.selectedGun = pos.selected;
    });

    socket.on('respawned', () => {
        var id = ObjManager.getPlayer(socket.id);
        if(id == -1) return;
        players[id].respawning = false;
    });

    socket.on('shot', data => {
        //const ZONE = constants.GAME.SAFE_ZONE;
        //if(data.x < -ZONE || data.x > ZONE || data.y < -ZONE || data.y > ZONE) {
        objects.push(new Bullet(socket.id, data.x, data.y, data.dir));
        //}
    });

    socket.on('smoke-granate', (pos, rot) => {
        var id = ObjManager.getPlayer(socket.id);
        if(id == -1) return;
        
        ioClient.emit('smoke-granate', pos, rot);
    });

    socket.on('block-add', pos => {
        
        for(var i = 0; i < objects.length; i++) {
          var obj = objects[i];
          if(pos.x == obj.pos.x && pos.y == obj.pos.y) {
            //ioClient.emit('block-rem', pos);
            //ObjManager.remove(obj);
            return;
          }
        }
        
        ioClient.emit('block-add', pos);
        objects.push(new Block(pos.x, pos.y));
        
    });
    
    socket.on('block-rem', pos => {
        for(var i = 0; i < objects.length; i++) {
            var obj = objects[i];
            if(pos.x == obj.pos.x && pos.y == obj.pos.y) {
              ioClient.emit('block-rem', pos);
              ObjManager.remove(obj);
              return;
            }
          }
    });

    socket.on('chat-message', msg => {
        var id = ObjManager.getPlayer(socket.id);
        if(id == -1) return;

        //io.of('/spec').emit('chat-message', new Message(msg, players[id]));
        socket.broadcast.emit('chat-message', new Message(msg, players[id]));
    });
    
    socket.on('flag-capture', team => {
        var id = ObjManager.getPlayer(socket.id);
        if(id == -1) return;

        // TODO: Udělat kontrolu, že hráčova pozice je poblíž vlajky

        // TODO: Zjistí jestli v proměnných serveru hráč je držitelem vlajky

        players[id].capturedFlag = team;
        ioClient.emit('player-set', socket.id, 'capturedFlag', team);
  
        // TODO: Udělat aby se i ze strany serveru vlajka změnila
        ioClient.emit('flag-set', team, true);
    
        console.log(players[id].team + ' team captured ' + team + ' team flag');
        ioClient.emit('chat-message', new Message('&3Player &'+Message.getColorToken(players[id].team) + players[id].name + '&3 captured &' + Message.getColorToken(team) + team + '\'s&3 flag'));
    });

    socket.on('flag-accept', team => {
        var id = ObjManager.getPlayer(socket.id);
        if(id == -1) return;

        // TODO: Udělat kontrolu, že hráčova pozice je poblíž vlajky
        
        // TODO: Zjistí jestli v proměnných serveru hráč je držitelem vlajky
        
        players[id].capturedFlag = null;
        ioClient.emit('player-set', socket.id, 'capturedFlag', null);
        //ioSpectator.emit('player-set', socket.id, 'capturedFlag', null);

        // TODO: Udělat aby se i ze strany serveru vlajka změnila
        ioClient.emit('flag-set', team, false);

        console.log(players[id].team + ' team accepted ' + team + ' team flag');
        ioClient.emit('chat-message', new Message('&3Player &'+Message.getColorToken(players[id].team) + players[id].name + '&3 accepted &' + Message.getColorToken(team) + team + '\'s&3 flag'));
 
        /* !!! CALL THE GAME END !!! */
        gameEnd();
    });

    socket.on('DroppedFlag-pick', team => {
        var id = ObjManager.getPlayer(socket.id);
        if(id == -1) return;

        // TODO: Ověřit zda se nachází v blízkosti

        // Set payer who picked droped flag, as he captured flag
        players[id].capturedFlag = team;
        ioClient.emit('player-set', socket.id, 'capturedFlag', team);

        // Remove dropped flag from objects
        for(var i = 0; i < objects.length; i++){
            if(objects[i].constructor.name != 'DroppedFlag') continue;
            if(objects[i].team == team) {
                ioClient.emit('DroppedFlag-rem', team);
                ObjManager.removeIndex(i);
                return;
            }
        }
    });
    
    socket.on('DroppedFlag-return', team => {
        var id = ObjManager.getPlayer(socket.id);
        if(id == -1) return;

        // TODO: Ověřit zda se nachází v blízkosti

        // Reset the flag of team
        // TODO: Udělat aby se i ze strany serveru vlajka změnila
        ioClient.emit('flag-set', team, false);

        // Remove dropped flag from objects
        for(var i = 0; i < objects.length; i++){
            if(objects[i].constructor.name != 'DroppedFlag') continue;
            if(objects[i].team == team) {
                ioClient.emit('DroppedFlag-rem', team);
                //ioSpectator.emit('DroppedFlag-rem', team);
                ObjManager.removeIndex(i);
                return;
            }
        }
    });
    
    socket.on('get-player-teams', () => {
        sendTeams();
    });
    /*
    socket.on('get-player-teams', () => {
        var red = 0, blue = 0;
        for(var i = 0; i < players.length; i++){
            if(players[i].team == 'red')    red++;
            if(players[i].team == 'blue')   blue++;
        }
        socket.emit('player-teams', red, blue);
    });
    */

    socket.on('get-chunk', (chunkX, chunkY) => {

        console.log('Some player want to load chunk x: ' + chunkX + ' y: ' + chunkY);
        /*
        const tileMap = [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,1,1,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,1,1,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ];
        */
        const TILE_SIZE = 32;
        const TILES = 30;

        var tileMap = [TILES];
        for(var tileY = 0; tileY < TILES; tileY++){
            tileMap[tileY] = [TILES];
            for(var tileX = 0; tileX < TILES; tileX++){
                
                const x = chunkX * 960 + tileX * TILE_SIZE;
                const y = chunkY * 960 + tileY * TILE_SIZE;

                tileMap[tileY][tileX] = getGeneratedTile(x, y);

            }
        }

        socket.emit('chunk', chunkX, chunkY, tileMap);
    });
});

function emitAll(...args) {
    io.of('/spec').emit(...args);
    io.of('/client').emit(...args);
}

function sendTeams() {
    const teams = countTeams();
    ioClient.emit('player-teams', teams.red, teams.blue);
}

function countTeams() {
    var teams = {red: 0, blue: 0};
    for(var i = 0; i < players.length; i++) 
        teams[players[i].team]++;
    return teams;
}

function gameEnd() {
    
    ioClient.emit('end');
    ioClient.emit('chat-message', new Message('&3Game ends!'));
    ioClient.emit('chat-message', new Message('&6Game will be restarted after '+constants.GAME.RESTART_TIME+' seconds.'));

    setTimeout(() => {
        ioClient.emit('chat-message', new Message('&5Game restarted'));
        ioClient.emit('restart');

        players = [];
        objects = [];

        loadMap('lobby');

        gameStarted = false;
    
    }, constants.GAME.RESTART_TIME*1000);
}

function getGeneratedTile(x, y) {
    var tile = 0;

    //const noiseX = simplex.noise2D(Math.sin(x*y)*100.0, 0);
    //tile |= noiseX > 0.5;

    //console.log(x);

    var tileX = x / 32;
    if(tileX < 0) tileX -= 2;

    var absTileX = Math.abs(tileX);

    if(absTileX%5 <= 2) {
        tile = 1;
    }

    // POINTS GENERATOR
    /*
    const noiseX = simplex.noise2D(x * 1000, 0);
    const noiseY = simplex.noise2D(0, y * 1000);

    tile |= (noiseX.toFixed(1) == noiseY.toFixed(1));
    */

    // LINE DONGEONS GENERATOR
    /*
    const noise1 = simplex.noise2D(x / 1500, y / 200);
    const noise2 = simplex.noise2D(x / 200, y / 1500);

    const noise3 = simplex.noise2D(x / 9000, y / 9000);

    tile |= noise1 > 0.5;
    tile |= noise2 > 0.5;

    tile &= noise3 > 0.5;
    */
    return tile;
}

module.exports = ioClient;