
/* SERVER IP WITH ':' PORT AND '/' NAMESPACE */
let SERVER_URL = 'localhost:3031/client';  // 185.221.124.205

/*** SETUP ***/
function setup() {
  /* create as window screen size */
  createCanvas(window.screen.width, window.screen.height, WEBGL);
  /* ckeck display resolution, optionally resize */
  windowResized();
  /* set some default stuff */
  textFont(font_default);
  noStroke();
  frameRate(100);
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

  if(frameCount%60 == 0){
   // console.log(frameRate());
  }

  var drawTime = millis();

  /* calc player move */
  player.refresh();

  /* send vars and etc. to server */
  multiplayer.refresh();

  /* refresh other players on server */
  for (var i = 0; i < players.length; i++) {
    players[i].refresh();
    //players[i].draw();
  }

  /* chceck and repair positions of coliding objects */
  checkCollisions();

  /* cam ortho */
  cam.ortho();

  /* background color */
  background(12); //background(100, 155, 74);

  /* draw Safe Zone */
  //drawSavezone();

  /* update and draw objects */
  var objectsRender = [];
  for (var i = objects.length-1; i >= 0; i--) {
    var obj = objects[i];

    obj.update();

    /* if this is not equal, it means the objects was removed */
    if(objects[i] != obj) continue;
    if(obj.staticDraw) continue;
  
    /* draw only when it is on screen */
    if(rectRect(obj.pos.x-obj.center.x, obj.pos.y-obj.center.y, obj.w, obj.h, cam.pos.x-width/cam.scale/2, cam.pos.y-height/cam.scale/2, width/cam.scale, height/cam.scale)) {
      //obj.draw();
      objectsRender.push(obj);
    }
  }

  /********************************************************************************************/
  if(game.started)
    chunkSystem.update();
  /********************************************************************************************/

  /* add my player to render */
  objectsRender.push(player);
  
  /* add other players to render */
  for (var i = 0; i < players.length; i++) {
    objectsRender.push(players[i]);
    //players[i].draw();
  }

  /* sort the objects to render */
  objectsRender.sort(function(a, b) {
      return a.layer - b.layer;
  });

  /* draw objects to render */
  for (var i = 0; i < objectsRender.length; i++) {
    objectsRender[i].draw();
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
  if(game.muted) {
    image(ico_sounds_off, width-32, 0);
  }else{
    image(ico_sounds_on, width-32, 0);
  }

  chat.draw(10, height-10);

  splash.draw();

  if(!socket.connected) {
    if(game.started) {
      game.restart();
      chat.add(new Message().message('&2Server crashed!').build());
    } else {
      fill(255, 16, 16);
      textSize(32);
      textAlign(CENTER, TOP);
      text('Cannot connect to the server', width/2, 32);
    }
  }

  if (frameCount % 50 == 0) game.drawTime = (millis() - drawTime).toFixed(2);
}

setInterval(() => {
  //staticDrawEnd = false;
}, 3000);