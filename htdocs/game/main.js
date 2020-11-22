
/* SERVER IP WITH ':' PORT AND '/' NAMESPACE */
let SERVER_URL = '185.221.124.205:3031/client'; 

/*** SETUP ***/
function setup() {
  /* create as window screen size */
  createCanvas(window.screen.width, window.screen.height, WEBGL);
  /* ckeck display resolution, optionally resize */
  windowResized();
  /* set some default stuff */
  textFont(font_default);
  noStroke();
  /* create necessary game objects */
  game.setup();
}

/*** LOOP ***/
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
  for (var i = 0; i < players.length; i++) {
    objectsRender.push(players[i]);
    //players[i].draw();
  }

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
    //players[i].draw();
  }

  /* draw my player */
  //player.draw();
  
  /* set left top corner ortho pos x0 y0 */
  ortho(0, width, -height, 0);

  /* minimap */
  minimap.draw();

  /* informations corner */
  drawInfo();

  tint(255);
  if(muted) {
    image(ico_sounds_off, width-32, 0);
  }else{
    image(ico_sounds_on, width-32, 0);
  }

  chat.draw(10, height-10);

  splash.draw();

  if(inGame && !socket.connected) {
    game.restart();
  }

  if(frameCount%50 == 0) finalDrawTime = (millis() - drawTime).toFixed(2);
}