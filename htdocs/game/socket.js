/*
  SOCKET

  last: 6.11.2020
  version: 0.1
*/

var gameLoaded = false;

let multiplayer, socket;
let fps = 0;

// player pos sender
const SEND_GAP = 100;
let serverConst = []; // server constants

class Multiplayer {
  constructor(url) {
    // main vals
    this.latency = 0;
    this.sendTimer = 0;
    // connect to server
    socket = io.connect(url);
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

    socket.on('shot',     shot); // some player disconnected
    
    socket.on('exception', (err) => {
      console.error('ERROR ' + err.id + ' ' + err.message);
      window.location.replace("/?error="+err.id+"&message="+err.message);
    });

    socket.on('respawn',  () => {player.pos.x = 0; player.pos.y = 0; socket.emit('respawned');}); // some player disconnected

    socket.on('chat-message', msg => {
      var newMsg = new Message();
      newMsg.str = msg.str;
      newMsg.timeout = millis() + CHAT_MESSAGE_DURATION;
      newMsg.opacity = 255;
      newMsg.buildImage();

      chat.add(newMsg);
    });
    
    //socket.on('hp',       (hp) => {player.hp = hp}); // refresh player values, pos, hp, kills
  }

  connected() {
    gameLoaded = false;
    console.log('%c Connected, your id: %c'+socket.id,'color: lime','color: aqua');
    player.id = '/client#' + socket.id;
    // If connected, send initRequest with initial data
    socket.emit('initReq', {
      name:      player.name, 
      password:  'heslo',
      x:         player.pos.x,
      y:         player.pos.y,
      colorID:   player.colorID,
      col:       player.col
    });
  }
  // refresh every frame
  refresh() {
    if(this.sendTimer < millis()) {
      socket.emit('pos', {x: player.pos.x, y: player.pos.y, rotation: player.rotation, selectedGun: player.selectedGun});
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

  /* INIT GAME SETTINGS */
  serverConst = data.constants;
  console.log(serverConst);

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
    if(obj.name == 'Block') objects.push(new Block(obj.pos.x, obj.pos.y));
  }
  gameLoaded = true;

  console.log('Game loaded', millis() - startTime);
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
  players[index].selectedGun = p.selectedGun;
}

/*** SHOOT ***/
function shot(data){
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