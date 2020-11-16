
/* HERE PUT YOUR SERVER IP OR URL WITH PORT */
const SERVER_URL = '185.221.124.205:3031/client';

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
  player = new MyPlayer(0, post.name, 0, 0, post.colorID);
  cam = new Camera(player);
  chat = new Chat();
  /* connect to the multiplayer server */
  multiplayer = new Multiplayer(SERVER_URL);
  /* set default volume at 30% */
  Howler.volume(0.3);
}

let menuOpened = false;
let muted = false;
let grid;
let finalDrawTime = 0;

/*** MAIN LOOP ***/
function draw() {

  /* FPS drop check */
  if(frameRate() < 15){
    chat.add("fps drop " + frameRate() + " fps");
    return;
  }
  
  var drawTime = millis();

  /* calc player move */
  player.refresh();

  /* send vars and etc. to server */
  multiplayer.refresh();

  /* chceck and repair positions of coliding objects */
  checkCollisions();
  /*
  for(var i = 0; i < objects.length; i++){
    if(objects[i].constructor.name === 'Block'){
      player.collision.collideRect(objects[i]);
    }
  }
  */

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

  chat.draw(10,height-10);

  if(frameCount%50 == 0) finalDrawTime = (millis() - drawTime).toFixed(2);
}