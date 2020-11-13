
/* HERE PUT YOUR SERVER IP OR URL WITH PORT */
const SERVER_URL = '192.168.0.110:3031';

/*** MAIN SETUP ***/
function setup() {
  /* create as monitor screen size */
  createCanvas(window.screen.width, window.screen.height, WEBGL);
  /* resize to the browser window */
  windowResized();
  /* set some default stuff */
  textFont(font_default);
  noStroke();
  /* create necessary game objects */
  player = new MyPlayer(0, post.name, 0, 0, post.color);
  cam = new Camera(player);
  /* connect to the multiplayer server */
  multiplayer = new Multiplayer(SERVER_URL);
  /* set default volume at 30% */
  Howler.volume(0.3);
}

let menuOpened = false;
let muted = false;
let grid;

/*** MAIN LOOP ***/
function draw() {
  /* FPS drop check */
  if(frameRate() < 15) return;

  /* calc player move */
  player.refresh();

  /* send vars and etc. to server */
  multiplayer.refresh();

  /* chceck and repair positions of coliding objects */
  checkCollisions();

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
    if(objects[i] == null) continue;
    /* draw only when it is on screen */
    if(rectRect(obj.pos.x-obj.center.x, obj.pos.y-obj.center.y, obj.w, obj.h, cam.pos.x-width/cam.scale/2, cam.pos.y-height/cam.scale/2, width/cam.scale, height/cam.scale)){
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
  drawInfo();

  tint(255);
  if(muted) {
    image(ico_sounds_off, width-32, 0);
  }else{
    image(ico_sounds_on, width-32, 0);
  }
}

/*** CONTROL EVENTS ***/
function keyPressed(){
  if(keyCode == 27){ // Esc
    var x = document.getElementById("menu");
    if (x.style.display === "none") {
      x.style.display = "block";
      menuOpened = true;
    } else {
      x.style.display = "none";
      menuOpened = false;
    }
  }
  if(menuOpened) return;
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
  if(menuOpened) return;

  if(mouseX > width-32 && mouseX < width && mouseY < 32 && mouseY > 0){
    muted = !muted;
    Howler.mute(muted);
  }
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
  player.shoting();
}

let scoolTimer = 0;
function mouseWheel(event) {
  if(scoolTimer < millis()) {
    if(event.delta < 0) {
      player.selectedGun--;
      if(player.selectedGun < 0) player.selectedGun = player.guns.length-1;
    } else {
      player.selectedGun++;
      if(player.selectedGun > player.guns.length-1) player.selectedGun = 0;
    }
    scoolTimer = millis() + 120;
  }
}