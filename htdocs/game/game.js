
let img_player;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  noStroke();

  if(window.screen.width < window.innerWidth || window.screen.height < window.innerHeight) {
    resizeCanvas(window.screen.width, window.screen.height);
  }

  textFont(loadFont('assets/fonts/OpenSans-Regular.ttf'));
  textSize(14);

  player = new MyPlayer(0, name, 0, 0, color);
  cam = new Camera(player);

  multiplayer = new Multiplayer('192.168.0.108:3031');

  img_player = loadImage('assets/images/player.jpg');
}

function draw() {

  if(frameRate() < 15) { // FPS drop check
    //console.log('fps drop ' + frameRate());
    return;
  }

  background(19);

  /* calc player move */
  player.refresh();

  /* send vars and etc. to server */
  multiplayer.refresh();

  /* cam ortho */
  cam.ortho();

  push();
  translate(0,0,-1);
  fill(0);
  strokeWeight(7);
  stroke(127, 0, 0);
  rect(-serverConst.SAFE_ZONE,-serverConst.SAFE_ZONE,serverConst.SAFE_ZONE*2,serverConst.SAFE_ZONE*2);
  pop();

  /* Draw and update objects */
  for (var i = 0; i < objects.length; i++) {
    var obj = objects[i];
    obj.update();
    //if(obj.pos.x > cam.pos.x-width/2 && obj.pos.x < cam.pos.x+width/2 && obj.pos.y > cam.pos.y-height/2 && obj.pos.y < cam.pos.y+height/2){
    if(rectRect(obj.pos.x,obj.pos.y,obj.w,obj.h,cam.pos.x-width/2,cam.pos.y-height/2,1920,1080)){
      obj.draw();
    }
  }

  /* Draw and refresh other players connected to server */
  for (var i = 0; i < players.length; i++) {
    players[i].refresh();
    players[i].draw();
  }

  /* Draw my player */
  player.draw();

  ortho(0, width, -height, 0); // set left top corner ortho pos x0 y0

  /* Informations corner */
  fill(255);
  textAlign(LEFT, TOP);
  text('connected: '+socket.connected+'\nping: ' + multiplayer.ping + 'ms\nFPS: ' + fps + '\nx: ' + Math.round(player.pos.x) + ' y: ' + Math.round(player.pos.y) + "\nPlayers online: " + (players.length+1) + "\nObjects: " + objects.length, 10,10);
  
  //if(mouseIsPressed) socket.emit('shot', {x: player.pos.x, y: player.pos.y, dir: atan2(mouseY - height / 2, mouseX - width / 2)});
  /*
  if(mouseIsPressed) {
    if(shootInterval < millis()){
      socket.emit('shot', {x: player.pos.x, y: player.pos.y, dir: atan2(mouseY - height / 2, mouseX - width / 2)});
      shootInterval = millis()+200;
    }
  })
  */

  
//cam.scale = map(mouseX,0,width,0.5,6.0);
}

function keyPressed(){
  player.keyPressed();
}

function keyReleased(){
  player.keyReleased();
}

function mousePressed(){

  if(mouseButton == RIGHT)
    player.stopMove();

  player.shoting();
}

/* window automatic resize */
function windowResized() {
  if(window.screen.width < window.innerWidth || window.screen.height < window.innerHeight) {
    return;
  }
  resizeCanvas(window.innerWidth, window.innerHeight);
}