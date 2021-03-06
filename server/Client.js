
const ioClient = io.of('/client');

const game = require('./gameEvents');

var SimplexNoise = require('simplex-noise');
simplex = new SimplexNoise(Math.random);

var startTimeoutHandle;

// middleware
ioClient.use(async (socket, next) => {
    const query = socket.handshake.query;
    const user = query.user;
    const pass = query.pass;

    // SELECT name, password FROM players WHERE name='Jurkos' AND password='0145d27b4e419b49063c2d9cfbf06177'
    var userExists = await isUserExists(user, pass);

    console.log(`user: ${user} pass: ${pass}`);

    if (!userExists) return next(new Error('Authentication error'));

    console.log('passed AuthGate');
    return next();
});

function isUserExists(user, pass) {
    var promise = new Promise(function(resolve, reject) {
        mysqlCon.query('SELECT name, password FROM players WHERE name=? AND password=?', [user, pass], (error, results, fields)=>{
            resolve(results.length == 1);
        });
    });
    return promise;
}

ioClient.on('connection', socket => {

    socket.on('initReq', data => { // init request

        if (gameStarted) {
            socket.emit('chat-message', new Message('&2Game already started!'));
            return;
        }
        const teams = countTeams();

        if ((data.team == 'red' && teams.red != 0 && teams.blue == 0)
        || (data.team == 'blue' && teams.red == 0  && teams.blue != 0)){
            socket.emit('chat-message', new Message('&2Tento tým by byl v přesile, vyber si nějaký jiný!'));
            return;
        }

        const pos = data.team == 'red' ? spawnRed : spawnBlue;

        socket.emit('init', {constants: constants, players: players, spawn: pos});
        socket.emit('load-map', {objects: objects});

        players.push(new Player(socket.id, data.name, pos.x, pos.y, data.team));
        mysqlCon.query(`UPDATE players SET connected=1, dateLastConnect=NOW() WHERE name="${data.name}"`, function (error, results, fields) {
            if (error) throw error;
        });
        
        console.log(c.GREEN + 'Player ' + c.YELLOW + data.name + c.GREEN + ' joined ' + c.YELLOW + data.team + c.GREEN + ' team' + c.RESET);

        for(var i = 0; i < players.length; i++) {
            socket.to(players[i].id).emit('newPlayer', players[players.length-1]);
        }

        if(startTimeoutHandle != null) clearTimeout(startTimeoutHandle);

        if(players.length >= 2) {
            game.start();
        }
        
        sendTeams();
    });

    socket.on('disconnect', (reason) => {
        var removeIndex = ObjManager.getPlayer(socket.id);
        if(removeIndex == -1) return;
        ioClient.emit('remPlayer', socket.id);
        //ioSpectator.emit('remPlayer', socket.id);
        console.log(c.RED + 'Player ' + c.YELLOW + players[removeIndex].name + c.RED + ' leaves the game' + c.RESET);
        
        mysqlCon.query(`UPDATE players SET connected=0, minutesPlayed=minutesPlayed+TIMESTAMPDIFF(MINUTE ,dateLastConnect, NOW()), dateLastConnect=NOW() WHERE name="${players[removeIndex].name}"`, function (error, results, fields) {
            if (error) throw error;
        });

        players.splice(removeIndex, 1);

        const teams = countTeams();
        if (gameStarted && (teams.red == 0 || teams.blue == 0)) {
            
            const winnerTeam = teams.red != 0 ? 'red' : 'blue';

            ioClient.emit('chat-message', new Message('&3The &' + Message.getColorToken(winnerTeam) + winnerTeam + '&3 team won the match!'));
            game.end();
        }
    });

    socket.on('pos', pos => {
        if (pos == null) return;
        if (isNaN(pos.x)) return;
        if (isNaN(pos.y)) return;

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
        if (data == null) return;
        if (isNaN(data.x)) return;
        if (isNaN(data.y)) return;
        if (isNaN(data.dir)) return;

        //const ZONE = constants.GAME.SAFE_ZONE;
        //if(data.x < -ZONE || data.x > ZONE || data.y < -ZONE || data.y > ZONE) {
        objects.push(new Bullet(socket.id, data.x, data.y, data.dir));
        //}
    });

    socket.on('smoke-granate', (pos, rot) => {
        var id = ObjManager.getPlayer(socket.id);
        if(id == -1) return;
        
        if (pos == null) return;
        if (isNaN(pos.x)) return;
        if (isNaN(pos.y)) return;
        if (isNaN(rot)) return;
        
        ioClient.emit('smoke-granate', pos, rot);
    });

    socket.on('block-add', pos => {
        if (pos == null) return;
        if (isNaN(pos.x)) return;
        if (isNaN(pos.y)) return;

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
        if (isNaN(pos.x)) return;
        if (isNaN(pos.y)) return;

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

        players[id].messagesCounter++;

        if (players[id].messagesCounter > 8) {
            ioClient.emit('chat-message', new Message('&2Hráč '+players[id].name+' byl vyhozen za spam v chatu.'));
            socket.emit('exception', {id: 601, message: 'Anticheat detected spam!'});
            socket.disconnect();
        }

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

        // TODO: Udělat aby se i ze strany serveru vlajka změnila

        ioClient.emit('flag-set', team, false);

        console.log(players[id].team + ' team accepted ' + team + ' team flag');
        ioClient.emit('chat-message', new Message('&3Player &'+Message.getColorToken(players[id].team) + players[id].name + '&3 accepted &' + Message.getColorToken(team) + team + '\'s&3 flag'));
 
        game.end();
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

        // TODO: Udělat aby se i ze strany serveru vlajka změnila

        // Reset the flag of team
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

    socket.on('get-chunk', (chunkX, chunkY) => {
        //return;

        //console.log('Some player want to load chunk x: ' + chunkX + ' y: ' + chunkY);
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

    tile = 1;

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