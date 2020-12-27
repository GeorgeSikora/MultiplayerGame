
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

/* function for loading screens in menu */
function loadScreen(screen) {
    $('#content').load("menu/" + screen + ".html");
}  

/* left top corner text */
function drawInfo(){
    if(!game.showInfo) return;
    fill(85, 255, 85);
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
    ,5, 15);
}

function drawFPS() {
  fill(255, 255, 0);
  textSize(12);
  textAlign(LEFT, TOP);
  text(game.fps, 5, 5);
}

function drawCannotConnect() {
    fill(255, 16, 16);
    textSize(32);
    textAlign(CENTER, TOP);
    text('Cannot connect to the server', innerWidth/2, 32);
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

function setResolution(selected) {
    game.resolution = int(selected);
    windowResized();
}

function setSmoothPixels(state) {
    if (state == "true") {
        $('canvas').css('image-rendering', 'auto');
        game.smoothPixels = true;
    } else {
        $('canvas').css('image-rendering', 'pixelated');
        game.smoothPixels = false;
    }
}

/* window automatic resize */
function windowResized() {
    if(window.screen.width < window.innerWidth || window.screen.height < window.innerHeight) {
        return;
    }

    var ratio = game.resolution == 0 ? 1 : innerHeight / game.resolution;
    resizeCanvas(innerWidth / ratio, innerHeight / ratio);

    document.getElementById('defaultCanvas0').style.width = window.innerWidth + "px";
    document.getElementById('defaultCanvas0').style.height = window.innerHeight + "px";

    // fixing camera scale tearing
    if (cam) cam.scale = (cam.targetScale * width / innerWidth);
}