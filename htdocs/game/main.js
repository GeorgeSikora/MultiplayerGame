
/* set default volumes */
Howler.volume(0.3);
let volumeMusic = 0.5; 

/*** SETUP ***/
function setup() {
  /* create as window screen size */
  createCanvas(innerWidth, innerHeight, WEBGL);
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
  if(frameRate() < 15) {
    //chat.add("fps drop " + frameRate() + " fps");
    return;
  }
  if(frameCount%60 == 0) {
    //console.log(frameRate());
  }
  /*** IMPORTANT THINGS FOR THE GAME UNDER THIS COMMENT ***/

  /* draw start time value */
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

  /* cam refresh */
  cam.refresh();

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
  
    /* push to draw only when it is on screen */
    if(rectRect(obj.pos.x-obj.center.x, obj.pos.y-obj.center.y, obj.w, obj.h, cam.pos.x-width/cam.scale/2, cam.pos.y-height/cam.scale/2, width/cam.scale, height/cam.scale)) {
      objectsRender.push(obj);
    }
  }

  /* chunks update check */
  if(game.started) chunkSystem.update();

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
  
  /* set left top corner ortho pos x0 y0 */
  ortho(0, innerWidth, -innerHeight, 0);

  /* minimap */
  minimap.draw();

  /* informations corner */
  drawInfo();

  /* FPS corner */
  drawFPS();

  /* mute button */
  tint(255);
  image(game.muted ? ico_sounds_off : ico_sounds_on, innerWidth - 32, 0);

  /* chat */
  chat.draw(10, innerHeight - 10);

  /* splash effect */
  splash.draw();

  /* server con error showcase */
  if(!socket.connected) {
    if(game.started) {
      game.restart();
      chat.add(new Message().message('&2Server crashed!').build());
    } else {
      drawCannotConnect();
    }
  }

  /* calculate drawTime */
  if (frameCount % 50 == 0) game.drawTime = (millis() - drawTime).toFixed(2);
}