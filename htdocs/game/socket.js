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
    this.ping = 0;
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
    socket.on('pong',          this.pong);
    // own events
    socket.on('refPlayer',     refPlayer); // refresh player values, pos, hp
    socket.on('newPlayer',     newPlayer); // new player connected
    socket.on('remPlayer',     remPlayer); // some player disconnected

    socket.on('shot',     shot); // some player disconnected

    socket.on('respawn',  () => {player.pos = {x:0, y:0}}); // some player disconnected
    socket.on('hp',       (hp) => {player.hp = hp}); // refresh player values, pos, hp
  }

  connected() {
    gameLoaded = false;
    console.log('%c Connected, your id: %c'+socket.id,'color: lime','color: aqua');
    player.id = socket.id;
    // If connected, send initRequest with initial data
    socket.emit('initReq', {
      name:      player.name, 
      password:  'heslo',
      x:         player.pos.x,
      y:         player.pos.y,
      col:       player.col
    });
  }
  // refresh every frame
  refresh() {
    if(this.sendTimer < millis()) {
      socket.emit('pos', {x: player.pos.x, y: player.pos.y});
      this.sendTimer = millis() + SEND_GAP;
    }
  }
  connect_error() {
    console.log('%c Connection Failed', 'color: lime');
  }
  pong(latency) {
    this.ping = latency;
  }
}

setInterval(function(){
  fps = int(frameRate());
}, 500);

/********* SOCKET IO EVENTS *********/

// Init game and entities
function initGame(data) {

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
    objects.push(new Block(obj.pos.x, obj.pos.y, obj.w, obj.h));
  }

  gameLoaded = true;
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
  if(p.id == player.id) { return; }
  var index = objectIndexOf(players, p.id, 'id'); // get index by id
  if(index == -1) { console.log("%c ERROR: pos index not found", 'color: black; background-color: red'); console.log(p.id,player.id); return; }
  players[index].target = {x: p.x, y: p.y};
  players[index].hp = p.hp;
}

const REFRESH_PERIOD = 20; // = 1000/FPS
const SERVER_INTERVAL_REFRESH = 100;

/*** SHOOT ***/
function shot(data){
  objects.push(new Bullet(data.shooterID, data.pos, data.speed));
}