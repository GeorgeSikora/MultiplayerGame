
const SERVER_URL = '192.168.0.110:3031';

let grid;

/*** MAIN SETUP ***/
function setup() {
  /* create as monitor screen size */
  createCanvas(window.screen.width, window.screen.height, WEBGL);
  /* resize to the browser window */
  windowResized();
  /* load assets (images, fonts, sounds) */
  loadAssets();
  /* create necessary game objects */
  player = new MyPlayer(0, name, 0, 0, color);
  cam = new Camera(player);
  /* connect to the multiplayer server */
  multiplayer = new Multiplayer(SERVER_URL);
}

/*** MAIN LOOP ***/
function draw() {

  /* FPS drop check */
  if(frameRate() < 15) return;

  /* background color */
  background(19);

  /* calc player move */
  player.refresh();

  /* send vars and etc. to server */
  multiplayer.refresh();
  
  checkCollisions();

  /* cam ortho */
  cam.ortho();

  /* draw Safe Zone */
  drawSavezone();

  /* update and draw objects */
  for (var i = 0; i < objects.length; i++) {
    var obj = objects[i];
    obj.update();
    /* draw only when it is on screen */
    if(rectRect(obj.pos.x-obj.center.x, obj.pos.y-obj.center.y, obj.w, obj.h, cam.pos.x-width/2, cam.pos.y-height/2, width, height)){
      obj.draw();
    }
  }

  /* refresh and draw other players on server */
  for (var i = 0; i < players.length; i++) {
    players[i].refresh();
    players[i].draw();
  }

  /* draw my player */
  player.draw();
  /*
  grid = getGrid(cam.mouse, 64);
  push();
  tint(255, 100);
  image(img_block, grid.x-64/2, grid.y-64/2);
  pop();
*/
  /* set left top corner ortho pos x0 y0 */
  ortho(0, width, -height, 0);

  /* informations corner */
  fill(255);
  textAlign(LEFT, TOP);
  text('connected: '+socket.connected+'\nping: ' + multiplayer.ping + 'ms\nFPS: ' + fps + '\nkills: ' + player.kills + '\nx: ' + Math.round(player.pos.x) + ' y: ' + Math.round(player.pos.y) + "\nPlayers online: " + (players.length+1) + "\nObjects: " + objects.length, 10,10);
  
  /* INFINITY SHOOTING EXPERIMENTS */
  /*
  if(mouseIsPressed) {
    socket.emit('shot', {x: player.pos.x, y: player.pos.y, dir: atan2(mouseY - height / 2, mouseX - width / 2)});
    const angle = atan2(mouseY - height / 2, mouseX - width / 2) + PI;
    player.speed.x += cos(angle) * 0.6;
    player.speed.y += sin(angle) * 0.6;
  }*/
  /*
  if(mouseIsPressed) {
    if(shootInterval < millis()){
      socket.emit('shot', {x: player.pos.x, y: player.pos.y, dir: atan2(mouseY - height / 2, mouseX - width / 2)});
      shootInterval = millis()+200;
    }
  })
  */
}

function getGrid(pos, gridSize) {
  var out = {x: pos.x+gridSize/2, y: pos.y+gridSize/2};
  out.x = out.x - out.x%gridSize;
  out.y = out.y - out.y%gridSize;
  out.x -= pos.x<-gridSize/2 ? gridSize:0;
  out.y -= pos.y<-gridSize/2 ? gridSize:0;
  return out;
}

/*** CONTROL EVENTS ***/
function keyPressed(){
  /*
  if(keyCode == 70){
    var output = [];

    for(var i = 0; i < objects.length; i++){
      var obj = objects[i];
      if(obj.constructor.name != 'Block') continue;
      output.push(obj.pos.x + ' ' + obj.pos.y);
    }
    saveStrings(output,'map.txt');
  }*/
  player.keyPressed();
}
function keyReleased(){
  player.keyReleased();
}
function mousePressed(){
  /*
  var searched = false;
  for(var i = 0; i < objects.length; i++) {
    var obj = objects[i];
    if(grid.x == obj.pos.x && grid.y == obj.pos.y) {
      removeObject(obj);
      searched = true;
      break;
    }
  }
  if(!searched) {
    objects.push(new Block(grid.x, grid.y));
  }
  */
  
  if(mouseButton == LEFT) player.shoting();
  //if(mouseButton == RIGHT) player.shoting();
}

/*** OTHER STUFF ***/

/* window automatic resize */
function windowResized() {
  if(window.screen.width < window.innerWidth || window.screen.height < window.innerHeight) {
    return;
  }
  resizeCanvas(window.innerWidth, window.innerHeight);
}

/* draw safe zone */
function drawSavezone(){
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
  text("SAFE ZONE", 0, -serverConst.SAFE_ZONE+10);
  pop();
}