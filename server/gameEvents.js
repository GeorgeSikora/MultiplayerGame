
    function start() {
    
        ioClient.emit('chat-message', new Message('&3Game will start after 10 seconds!'));
    
        startTimeoutHandle = setTimeout(() => {

            loadMap('map_flags');
    
            console.log(players.length);
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
    
    function end() {
        
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
        
        }, constants.GAME.RESTART_TIME * 1000);
    }

module.exports = {start, end};