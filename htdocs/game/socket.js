
let multiplayer, socket;

var respawnTimeout;

class server {
  static constants = [];
}

class Multiplayer {

  constructor(url) {
    // main vals
    this.latency = 0;
    this.sendTimer = 0;
    // connect to server
    socket = io.connect(url, {
      reconnectionDelay: 1500
    });

    socket.on('init',          initGame);  // send players and map
    socket.on('load-map',      loadMap);
    // built-in events
    socket.on('connect',       this.connected);
    socket.on('connect_error', this.connect_error);
    socket.on('disconnected',  disconnected);
    socket.on('pong',          pong);
    // Player events
    socket.on('refPlayer',        refPlayer); // refresh player values, pos, hp
    socket.on('newPlayer',        newPlayer); // new player connected
    socket.on('remPlayer',        remPlayer); // some player disconnected
    socket.on('shot',             shot);
    socket.on('smoke-granate',    addSmokeGranate);
    socket.on('exception',        exception);
    socket.on('respawn',          respawnPlayer);
    socket.on('setPos',           setMyPos);
    socket.on('chat-message',     newChatMessage);
    socket.on('block-add',        addBlock);
    socket.on('block-rem',        remBlock);
    socket.on('flag-set',         setFlag);
    socket.on('player-set',       setPlayer);
    socket.on('DroppedFlag-add',  addDroppedFlag);
    socket.on('DroppedFlag-rem',  remDroppedFlag);
    socket.on('start', ()=>{game.start();});
    socket.on('end', ()=>{if(!game.started) return; game.end();});
    socket.on('restart', ()=>{if(!game.started) return;game.restart();});
    socket.on('player-teams', (red, blue)=>{game.teams['red']=red;game.teams['blue']=blue;});
    socket.on('chunk', loadChunk);
  }

  connected() {
    game.loaded = false;
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
    console.log('%c Connection Failed', 'color: red');
  }
}

function pong(latency) {
  multiplayer.latency = latency;
}

setInterval(function(){
  game.fps = parseInt(frameRate());
}, 500);

/********* SOCKET IO EVENTS *********/

// Init game and entities
function initGame(data) {

  var startTime = millis();
  game.start();

  const pos = data.spawn;

  player.pos.x = pos.x;
  player.pos.y = pos.y;

  cam.pos.x = pos.x;
  cam.pos.y = pos.y;

  player.enable = true;
  player.show = true;

  sound_drop1.play();

  /* INIT GAME CONSTANTS & SETTINGS */
  server.constants = data.constants;
  console.log(server.constants);
  player.maxSpeed = server.constants.PLAYER.SPEED;

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

  /*
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
  
  minimap.build();
  */
  console.log('Game loaded', millis() - startTime);
  game.loaded = true;
  game.started = true;
}

function loadMap(data) {

  for(var i = 0; i < chunkSystem.chunks.length; i++) {
    const c = chunkSystem.chunks[i];
    socket.emit('get-chunk', c.pos.x/Chunk.SIZE, c.pos.y/Chunk.SIZE);
  }

  //console.log('loading map...');

  if(!game.started) return;

  clearTimeout(respawnTimeout);

  var pos = {x: 0, y: 0};

  if(data.spawn != null) {
    pos = data.spawn;
  }

  player.enable = true;
  player.pos.x = pos.x;
  player.pos.y = pos.y;

  cam.pos.x = pos.x;
  cam.pos.y = pos.y;
  cam.target = player;

  cam.targetScale = 0.32;

  splash.opacity = 255;

  objects = [];

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

  for(var i = 0; i < objects.length; i++) {
    if(objects[i].constructor.name == 'Block') {
      objects[i].autoTile();
    }
  }

  minimap.build();

  chunkSystem.refresh();
  
  //console.log('loaded !');
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
  if(!game.loaded) return;
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

function respawnPlayer(shooterID, pos) {
  splash.opacity = 255;
  sound_yay.play();
  player.pos.x = pos.x; 
  player.pos.y = pos.y; 
  player.enable = false;

  var index = objectIndexOf(players, shooterID, 'id');
  cam.target = players[index];

  respawnTimeout = setTimeout(() => {
    sound_drop1.play();
    splash.opacity = 255;
    player.enable = true;
    cam.target = player;
    socket.emit('respawned');
  }, 10000);
}

function newChatMessage(msg) {
  var newMsg = new Message();
  newMsg.str = msg.str;
  newMsg.timeout = millis() + Chat.MESSAGE_DURATION;
  newMsg.opacity = 255;
  newMsg.buildImage();

  chat.add(newMsg);
}

function setMyPos(pos) {
  player.pos.x = pos.x;
  player.pos.y = pos.y;
}

function exception(err) {
  console.error('ERROR ' + err.id + ' ' + err.message);
  window.location.replace("/?error="+err.id+"&message="+err.message);
}

function addBlock(pos) {
  sound_place.play();
  objects.push(new Block(pos.x, pos.y));

  for(var i = 0; i < chunkSystem.chunks.length; i++) {
    if(rectRect(pos.x-32, pos.y-32, 64, 64, chunkSystem.chunks[i].pos.x - Chunk.SIZE/2, chunkSystem.chunks[i].pos.y - Chunk.SIZE/2, Chunk.SIZE, Chunk.SIZE)) {
      for(var o = 0; o < objects.length; o++) {
        if(objects[o].constructor.name == 'Block') {
          const blockPos = objects[o].pos;
          if((pos.x-64 == blockPos.x || pos.x == blockPos.x || pos.x+64 == blockPos.x) && (pos.y-64 == blockPos.y || pos.y == blockPos.y || pos.y+64 == blockPos.y)) {
            objects[o].autoTile();
          }
        }
      }
      chunkSystem.chunks[i].refresh();
    }
  }
}

function remBlock(pos) {
  for(var i = 0; i < objects.length; i++) {
    var obj = objects[i];
    if(obj.constructor.name != 'Block') continue;

    if(pos.x == obj.pos.x && pos.y == obj.pos.y) {
      sound_pop.play();
      removeObject(obj);

      for(var i = 0; i < chunkSystem.chunks.length; i++) {
        if(rectRect(pos.x-32, pos.y-32, 64, 64, chunkSystem.chunks[i].pos.x - Chunk.SIZE/2, chunkSystem.chunks[i].pos.y - Chunk.SIZE/2, Chunk.SIZE, Chunk.SIZE)) {
          for(var o = 0; o < objects.length; o++) {
            if(objects[o].constructor.name == 'Block') {
              const blockPos = objects[o].pos;
              if((pos.x-64 == blockPos.x || pos.x == blockPos.x || pos.x+64 == blockPos.x) && (pos.y-64 == blockPos.y || pos.y == blockPos.y || pos.y+64 == blockPos.y)) {
                objects[o].autoTile();
              }
            }
          }
          chunkSystem.chunks[i].refresh();
        }
      }
    }
  }
}

function setFlag(team, captured) {
  for(var i = 0; i < objects.length; i++){
    if(objects[i].constructor.name != 'Flag') continue;
    if(objects[i].team === team) {
        objects[i].captured = captured;
    }
  }
}

function setPlayer(id, name, value) {

  if(id == player.id){
    player[name] = value;
    return;
  }

  var index = objectIndexOf(players, id, 'id'); // get index by id
  if(index == -1) return;
  players[index][name] = value;
}

function addDroppedFlag(pos, team) {
  objects.push(new DroppedFlag(pos.x, pos.y, team));
}

function remDroppedFlag(team) {
  for(var i = 0; i < objects.length; i++) {
    if(objects[i].constructor.name != 'DroppedFlag') continue;
    if(objects[i].team == team) {
        removeObjectIndex(i);
        return;
    }
  }
}

function addSmokeGranate(pos, rot) {
  objects.push(new Granate(pos.x, pos.y, rot));
}

function disconnected() {
  console.log('%c Disconnected','background-color: red; color: black');
}

function loadChunk(x, y, tileMap) {
//console.log('chunk x: ' + x + ' y: ' + y + ' comes to client!');
  for(var i = 0; i < chunkSystem.chunks.length; i++) {
    const c = chunkSystem.chunks[i];
    if(c.pos.x == x * Chunk.SIZE && c.pos.y == y * Chunk.SIZE) {
      c.tileMap = tileMap;
      c.loaded = true;
      
      //console.log('tileMap uploaded');
      break;
    }
  }

  var readyToLoad = true;
  for(var i = 0; i < chunkSystem.chunks.length; i++) {
    const c = chunkSystem.chunks[i];
    //console.log('loaded: ' + c.loaded);
    if(!c.loaded) {
      readyToLoad = false;
      break;
    };
  }

  if(readyToLoad) {
    //console.log('Refreshing all chunks!');
    for(var i = 0; i < chunkSystem.chunks.length; i++) {
      const c = chunkSystem.chunks[i];
      c.refresh();
    }
  }
}