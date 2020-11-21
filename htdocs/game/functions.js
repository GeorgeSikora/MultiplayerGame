
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

/* safe zone at the spawn */
function drawSavezone(){
    if(serverConst.SAFE_ZONE==0)return;
    push();
    /* set to bottom layer */
    translate(0,0,-1);
    /* draw rectangle with border */
    fill(0);
    strokeWeight(7);
    stroke(127, 0, 0);
    rect(-serverConst.SAFE_ZONE,-serverConst.SAFE_ZONE,serverConst.SAFE_ZONE*2,serverConst.SAFE_ZONE*2);
    /* draw text */
    textSize(32);
    textAlign(CENTER, TOP);
    fill(200);
    text("SAFE ZONE\n", 0, -serverConst.SAFE_ZONE+10);
    pop();
}

/* left top corner text */
let infoEnable = false;
function drawInfo(){
    if(!infoEnable) return;

    push();
    fill(255);
    textSize(18);
    textAlign(LEFT, TOP);
    text(
      'connected: '         + socket.connected
    + '\nstarted: '         + gameStarted
    + '\nping: '            + multiplayer.latency + 'ms'
    + '\nFPS: '             + fps
    + '\nloop time: '       + finalDrawTime + '/' + (1000/60).toFixed(2) + ' ms'
    + '\nkills: '           + player.kills 
    + '\nx: '               + round(player.pos.x) + ' y: ' + round(player.pos.y) 
    + "\nPlayers online: "  + (players.length+1) 
    + "\nObjects: "         + objects.length
    + '\nmute: '            + muted
    + '\nMaster-vol: '      + int(Howler.volume()*100) + '%'
    + '\nMusic-vol: '       + int(volumeMusic*100) + '%'
    ,5, 5);
    pop();
}

/* window automatic resize */
function windowResized() {
    if(window.screen.width < window.innerWidth || window.screen.height < window.innerHeight) {
        return;
    }
    resizeCanvas(window.innerWidth, window.innerHeight);
}