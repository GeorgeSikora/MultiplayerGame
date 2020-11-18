
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
  
  objects.push(new Flag(-400, 0, 'red'));
  objects.push(new Flag( 400, 0, 'blue'));
  for(var x = 0; x < 10000; x++){
    objects.push(new Grass(16 * round(random(-600,600)), 16 * round(random(-600,600))));
  }
}

let menuOpened = false;
let muted = false;
let buildingEnable = false;
let finalDrawTime = 0;

/*** MAIN LOOP ***/
function draw() {

  /* FPS drop check */
  if(frameRate() < 15){
    //chat.add("fps drop " + frameRate() + " fps");
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
  //background(100, 155, 74);
  background(12);

  /* draw Safe Zone */
  drawSavezone();

  /* update and draw objects */
  var objectsRender = [];
  for (var i = 0; i < objects.length; i++) {
    var obj = objects[i];
    obj.update();
    if(objects[i] == null) continue;
    /* draw only when it is on screen */
    if(rectRect(obj.pos.x-obj.center.x, obj.pos.y-obj.center.y, obj.w, obj.h, cam.pos.x-width/cam.scale/2, cam.pos.y-height/cam.scale/2, width/cam.scale, height/cam.scale)){
      //obj.draw();
      objectsRender.push(obj);
    }
  }
  objectsRender.push(player);

  objectsRender.sort(function(a, b) {
      return a.layer - b.layer;
  });

  for (var i = 0; i < objectsRender.length; i++) {
    objectsRender[i].draw();
  }
  
  //console.log(objectsRender);

  /* refresh and draw other players on server */
  for (var i = 0; i < players.length; i++) {
    players[i].refresh();
    players[i].draw();
  }

  /* draw my player */
  //player.draw();
  
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