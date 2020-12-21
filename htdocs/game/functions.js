
/********* GLOBAL GAME FUNCTIONS *********/

/* get index of specific value */
function objectIndexOf(arr, searchTerm, property) {
    for(var i = 0, len = arr.length; i < len; i++) {
        if (arr[i][property] === searchTerm) {return i;}
    } return -1;
}

/* get the gridded value */
function getGrid(pos, gridSize) {
    var out = {x: pos.x+gridSize/2, y: pos.y+gridSize/2};
    out.x = out.x - out.x%gridSize;
    out.y = out.y - out.y%gridSize;
    out.x -= pos.x<-gridSize/2 ? gridSize:0;
    out.y -= pos.y<-gridSize/2 ? gridSize:0;
    return out;
}

/* left top corner text */
function drawInfo(){
    if(!game.showInfo) return;

    push();
    fill(0);
    textSize(18);
    textAlign(LEFT, TOP);
    /*
    var chunksInfo = '';
    for(var i = 0; i < chunkSystem.chunks.length; i++) {
        const c = chunkSystem.chunks[i];
        chunksInfo += 'chunk ';
        chunksInfo += i;
        chunksInfo += ' inp: ';
        chunksInfo += c.inProcess;
        chunksInfo += ' loaded: ';
        chunksInfo += c.loaded;
        chunksInfo += ' t: ';
        chunksInfo += (c.processEnd - c.processStart);
        chunksInfo += '\n';
    }
    */

    text(
      'connected: '         + socket.connected
    + '\ngame.started: '    + game.started
    + '\nping: '            + multiplayer.latency + 'ms'
    + '\nFPS: '             + game.fps
    + '\nloop time: '       + game.drawTime + ' ms'
    + '\nkills: '           + player.kills 
    + '\nx: '               + round(player.pos.x) + ' y: ' + round(player.pos.y) 
    + "\nPlayers online: "  + (players.length+1)
    + "\nObjects: "         + objects.length
    /*
    + '\nmute: '            + game.muted
    + '\nMaster-vol: '      + int(Howler.volume()*100) + '%'
    + '\nMusic-vol: '       + int(volumeMusic*100) + '%'
    */
    
    // + '\n' + chunksInfo
    ,5, 5);
    pop();
}

/* safe zone at the spawn */
function drawSavezone() {
    if(server.constants.GAME == null) return;
    var zone = server.constants.GAME.SAFE_ZONE; // size of the zone
    if(zone == 0) return;

    push();
    /* draw rectangle with border */
    rectMode(CENTER);
    fill(0);
    strokeWeight(7);
    stroke(127, 0, 0);
    rect( -zone, -zone, zone * 2, zone * 2);
    /* draw text */
    textSize(32);
    textAlign(CENTER, TOP);
    fill(200);
    text("SAFE ZONE\n", 0, -zone + 10);
    pop();
}

/* window automatic resize */
function windowResized() {
    if(window.screen.width < window.innerWidth || window.screen.height < window.innerHeight) {
        return;
    }
    resizeCanvas(window.innerWidth, window.innerHeight);
}