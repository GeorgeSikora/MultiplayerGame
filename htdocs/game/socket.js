/*
  SOCKET

  last: 6.11.2020
  version: 0.1
*/

let multiplayer, socket;

class Multiplayer {
  constructor(url) {
    // main vals
    this.latency = 0;
    this.sendTimer = 0;
    // connect to server
    socket = io.connect(url, {
      reconnectionDelay: 1000
    });
    socket.on('init',          initGame);  // send players and map
    // built-in events
    socket.on('connect',       this.connected);
    socket.on('connect_error', this.connect_error);
    socket.on('disconnected', () => {
      console.log('%c Disconnected','background-color: red; color: black');
    });
    socket.on('pong',          pong);
    // Player events
    socket.on('refPlayer',     refPlayer); // refresh player values, pos, hp
    socket.on('newPlayer',     newPlayer); // new player connected
    socket.on('remPlayer',     remPlayer); // some player disconnected

    socket.on('shot',     shot);
    
    socket.on('exception', (err) => {
      console.error('ERROR ' + err.id + ' ' + err.message);
      window.location.replace("/?error="+err.id+"&message="+err.message);
    });

    socket.on('respawn', (shooterID, pos)=> {
      splash.opacity = 255;
      sound_yay.play();
      player.pos.x = pos.x; 
      player.pos.y = pos.y; 
      player.enable = false;

      var index = objectIndexOf(players, shooterID, 'id');
      cam.target = players[index];

      setTimeout(() => {
        sound_drop1.play();
        splash.opacity = 255;
        player.enable = true;
        cam.target = player;
        socket.emit('respawned');
      }, 3000);
    });

    socket.on('setPos', (pos)=> {
      player.pos.x = pos.x;
      player.pos.y = pos.y;
    });

    socket.on('chat-message', msg => {
      var newMsg = new Message();
      newMsg.str = msg.str;
      newMsg.timeout = millis() + Chat.MESSAGE_DURATION;
      newMsg.opacity = 255;
      newMsg.buildImage();

      chat.add(newMsg);
    });
    
    socket.on('block-add', pos => {
      sound_place.play();
      objects.push(new Block(pos.x, pos.y));
    });

    socket.on('block-rem', pos => {
      for(var i = 0; i < objects.length; i++) {
        var obj = objects[i];
        if(obj.constructor.name != 'Block') continue;
        if(pos.x == obj.pos.x && pos.y == obj.pos.y) {
          sound_pop.play();
          removeObject(obj);
          return;
        }
      }
    });

    socket.on('flag-set', (team, captured) => {
      for(var i = 0; i < objects.length; i++){
        if(objects[i].constructor.name != 'Flag') continue;
        if(objects[i].team === team) {
            objects[i].captured = captured;
        }
      }
    });
    
    socket.on('player-set', (id, name, value) => {

      if(id == player.id){
        player[name] = value;
        return;
      }

      var index = objectIndexOf(players, id, 'id'); // get index by id
      if(index == -1) return;
      players[index][name] = value;
    });

    socket.on('DroppedFlag-add', (pos, team) => {
      objects.push(new DroppedFlag(pos.x, pos.y, team));
    });

    socket.on('DroppedFlag-rem', team => {
      for(var i = 0; i < objects.length; i++){
        if(objects[i].constructor.name != 'DroppedFlag') continue;
        if(objects[i].team == team) {
            removeObjectIndex(i);
            return;
        }
      }
    });
    socket.on('start', () => {
      game.start();
    });
    socket.on('end', () => {
      if(!inGame) return;
      game.end();
      gameStarted = false;
    });
    socket.on('restart', () => {
      if(!inGame) return;
      game.restart();
    });

    socket.on('player-teams', (red, blue) => {
      game.teams['red'] = red;
      game.teams['blue'] = blue;
    });
    //socket.on('hp',       (hp) => {player.hp = hp}); // refresh player values, pos, hp, kills
  }

  connected() {
    gameLoaded = false;
    console.log('%c Connected, your id: %c'+socket.id,'color: lime','color: aqua');
    player.id = '/client#' + socket.id;
  }
  // refresh every frame
  refresh() {
    if(this.sendTimer < millis()) {

      const sel = player.equipment[player.selectedEquipment].constructor.name;

      socket.emit('pos', {
        x: player.pos.x, 
        y: player.pos.y, 
        rotation: player.rotation, 
        selected: sel
      });
      this.sendTimer = millis() + SEND_GAP;
    }
  }

  connect_error() {
    console.log('%c Connection Failed', 'color: lime');
  }
}

function pong(latency) {
  multiplayer.latency = latency;
}

setInterval(function(){
  fps = parseInt(frameRate());
}, 500);

/********* SOCKET IO EVENTS *********/

// Init game and entities
function initGame(data) {
  var startTime = millis();
  game.start();

  player.team = selectedTeam;
  const pos = player.team == 'red' ? {x: -2000, y: 0} : {x: 2000, y: 0};

  player.pos.x = pos.x;
  player.pos.y = pos.y;

  cam.pos.x = pos.x;
  cam.pos.y = pos.y;

  player.enable = true;
  player.show = true;

  cam.targetScale = 1.0;
  splash.opacity = 255;
  sound_drop1.play();

  /* INIT GAME SETTINGS */
  serverConst = data.constants;

  // log size of players
  console.log('%c Players size: %c' + data.players.length,'color: lime','color: yellow');
  // clear every object or player
  players = [];
  objects = [];
  // load players already connected to the server
  const playersLoad = data.players;
  for (var i = 0; i < playersLoad.length; i++) {
    const p = playersLoad[i];
    players.push(new Player(p.id, p.name, p.pos.x, p.pos.y, p.col));
  }
  const objectsLoad = data.objects;
  for (var i = 0; i < objectsLoad.length; i++) {
    const obj = objectsLoad[i];

    switch(obj.name){
      case 'Block':
        objects.push(new Block(obj.pos.x, obj.pos.y));
        break;
      case 'Flag':
        objects.push(new Flag(obj.pos.x, obj.pos.y, obj.team));
        break;
    }
  }
  gameLoaded = true;
  gameStarted = true;
  minimap.build();

  console.log('Game loaded', millis() - startTime);
  
  inGame = true;
}

// When new player is connected
function newPlayer(player) {
  players.push(new Player(player.id, player.name, player.pos.x, player.pos.y, player.col));
  console.log('%c New player, size: %c' + players.length, 'color: lime','color: yellow');
}

// When player leaves
function remPlayer(id) {
  if(id == player.id) { return; }
  var removeIndex = objectIndexOf(players, id, 'id'); // get index by id
  if(removeIndex == -1) {console.log("%c ERROR: remove index not found", 'color: black; background-color: red');return;}
  players.splice(removeIndex, 1);
}

// Refresh player data
function refPlayer(p) {
  if(!gameLoaded) return;
  if(p.id == player.id) { 
    player.hp = p.hp;
    player.kills = p.kills;
    return; 
  }
  var index = objectIndexOf(players, p.id, 'id'); // get index by id
  if(index == -1) { console.log("%c ERROR: pos index not found", 'color: black; background-color: red'); console.log(p.id,player.id); return; }
  players[index].target = {x: p.x, y: p.y};
  players[index].hp = p.hp;
  players[index].targetRotation = p.rotation;
  players[index].selectedEquipment = p.selected;
}

/*** SHOOT ***/
function shot(data){
  //if(!focused) return;

  if(data.shooterID != player.id) {
    var id = sound_rifle.play();
    sound_rifle.pos(
      (data.pos.x -player.pos.x)/200.0, // X
      (data.pos.y -player.pos.y)/200.0, // Y
      -dist(data.pos.x, data.pos.y, player.pos.x, player.pos.y)/100.0 - 1, //Z
    id);
  }
  objects.push(new Bullet(data.shooterID, data.pos, data.speed));
}