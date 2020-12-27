
// when new player is connected
function newPlayer(player) {
    players.push(new Player(player.id, player.name, player.pos.x, player.pos.y, player.col));
    console.log('%c New player, size: %c' + players.length, 'color: lime','color: yellow');
}

// refresh player data
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

function setPlayer(id, name, value) {

    if(id == player.id){
      player[name] = value;
      return;
    }
  
    var index = objectIndexOf(players, id, 'id'); // get index by id
    if(index == -1) return;
    players[index][name] = value;
}

// when player leaves
function remPlayer(id) {
    if(id == player.id) { return; }
    var removeIndex = objectIndexOf(players, id, 'id'); // get index by id
    if(removeIndex == -1) {console.log("%c ERROR: remove index not found", 'color: black; background-color: red');return;}
    players.splice(removeIndex, 1);
}

