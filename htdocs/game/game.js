
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
  multiplayer = new Multiplayer('185.221.124.205:3031');
}

/*** MAIN LOOP ***/
function draw() {

  /* FPS drop check */
  if(frameRate() < 15) return;

  /* calc player move */
  player.refresh();

  /* send vars and etc. to server */
  multiplayer.refresh();

  /* cam ortho */
  cam.ortho();

  /* background color */
  background(19);

  /* draw Safe Zone */
  drawSavezone();

  /* update and draw objects */
  for (var i = 0; i < objects.length; i++) {
    var obj = objects[i];
    obj.update();
    /* draw only when it is on screen */
    if(rectRect(obj.pos.x, obj.pos.y, obj.w, obj.h, cam.pos.x-width/2, cam.pos.y-height/2, width, height)){
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

  /* set left top corner ortho pos x0 y0 */
  ortho(0, width, -height, 0);

  /* informations corner */
  push();
  fill(255);
  textSize(24.4);
  textAlign(LEFT, TOP);
  //text("dhjqF83R9R3sef sefsef 85 UF 835fsd fs", 5, 5);
  text('connected: '+socket.connected+'\nping: ' + multiplayer.ping + 'ms\nFPS: ' + fps + '\nkills: ' + player.kills + '\nx: ' + Math.round(player.pos.x) + ' y: ' + Math.round(player.pos.y) + "\nPlayers online: " + (players.length+1) + "\nObjects: " + objects.length, 5, 5);
  pop();

  /* INFINITY SHOOTING EXPERIMENTS */
  //if(mouseIsPressed) socket.emit('shot', {x: player.pos.x, y: player.pos.y, dir: atan2(mouseY - height / 2, mouseX - width / 2)});
  /*
  if(mouseIsPressed) {
    if(shootInterval < millis()){
      socket.emit('shot', {x: player.pos.x, y: player.pos.y, dir: atan2(mouseY - height / 2, mouseX - width / 2)});
      shootInterval = millis()+200;
    }
  })
  */
}

/*** CONTROL EVENTS ***/
function keyPressed(){
  player.keyPressed();
}
function keyReleased(){
  player.keyReleased();
}
function mousePressed(){
  if(mouseButton == LEFT) 
    player.shoting();
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
  text("SAFE ZONE\n", 0, -serverConst.SAFE_ZONE+10);
  pop();
}