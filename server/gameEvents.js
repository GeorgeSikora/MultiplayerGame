
let startTimeoutHandle;
function start() {

    ioClient.emit('chat-message', new Message('&3Game will start after 10 seconds!'));

    if (startTimeoutHandle != null) clearTimeout(startTimeoutHandle);

    startTimeoutHandle = setTimeout(() => {

        const teams = countTeams();
        if (teams.red == 0 || teams.blue == 0) return; // not enough players

        loadMap('map_flags');

        console.log('Game started with ' + players.length + ' players');
        for(var i = 0; i < players.length; i++) {
            const spawnPos = players[i].team == 'red' ? spawnRed : spawnBlue;

            players[i].respawning = false;
            players[i].pos = spawnPos; 
            players[i].hp = constants.PLAYER.HP;
            players[i].kills = 0;

            ioClient.to(players[i].id).emit('load-map', {objects: objects, spawn: spawnPos});
        }
        
        ioClient.emit('chat-message', new Message('&3Game started!'));
        gameStarted = true;
    }, 10000);
}

let restartTimeoutHandle;
function end() {
    
    ioClient.emit('end');
    ioClient.emit('chat-message', new Message('&3Game ends!'));
    ioClient.emit('chat-message', new Message('&6Game will be restarted after '+constants.GAME.RESTART_TIME+' seconds.'));

    if (restartTimeoutHandle != null) clearTimeout(restartTimeoutHandle);
    restartTimeoutHandle = setTimeout(() => {
        ioClient.emit('chat-message', new Message('&5Game restarted'));
        ioClient.emit('restart');

        players = [];
        objects = [];

        loadMap('lobby');

        gameStarted = false;
    
    }, constants.GAME.RESTART_TIME * 1000);
}

function countTeams() {
    var teams = {red: 0, blue: 0};
    for(var i = 0; i < players.length; i++) 
        teams[players[i].team]++;
    return teams;
}

module.exports = {start, end};