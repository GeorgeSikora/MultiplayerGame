
/* is just ... "IP:PORT/NAMESPACE" */
let SERVER_URL = 'localhost:3031/client';  // 185.221.124.205

class game {

  /* MAIN VARIABLES */
  static fps = 0;
  static resolution = 0; // height of target resolution
  static smoothPixels = true;

  static constants = {
    SEND_GAP: 90, // player pos sender

    MENU_SCALE: 1.5,
    DEFAULT_SCALE: 1.0,

    SHOW_TILE_ID: false,
    
    SHOW_INFO: false,
    SHOW_CHUNKS_BORDER: false,
  };

  static muted = false;

  static loaded = false;
  static started = false;
  
  /* STATMENTS */
  static menuOpened = false;
  
  /* SHOW & ENABLE */
  static showInfo = false;
  static showChunksBorder = false;
  static buildingEnable = false;
  static showPlayersTarget = false

  /* TEAMS COUNT */
  static teams = {red: 0, blue: 0};

  /* TIMERS */
  static drawTime = 0;

  static setup() {
    /* connect to the multiplayer server */
    multiplayer = new Multiplayer(SERVER_URL);
    socket.emit('get-player-teams');

    chunkSystem = new ChunkSystem();
    loadTiles();

    player  = new MyPlayer(0, session.name, 0, 0, 'lobby');
    cam     = new Camera(player);
    chat    = new Chat();
    splash  = new ScreenFlash();
    minimap = new Minimap();

    player.enable = false;
    player.show = false;

    game.restart();

    sound_drop2.play();
  
    /* JUST FOR DEVELOP, UNDER THIS */
    //Howler.mute(game.muted);

        
    setInterval(function(){
      if (frameRate() != null)
      game.fps = parseInt(frameRate());
    }, 500);
  }


  static draw() {
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


  
  static start() {
    //Howler.stop();

    console.log('game started');
    minimap.enable = true;
    game.started = true;
    //music_menu.rate(3, music_menu_id);
    music_menu.fade(volumeMusic, 0, 2000, this.music_menu_id);
  }

  static end() {
    this.music_end_id = music_end.play();
    music_end.volume(volumeMusic, this.music_end_id);
    music_end.fade(0, volumeMusic, 1000, this.music_end_id);

    player.enable = false;

    cam.target = null;
    cam.easing = 0.02;
    cam.targetPos = {x: 0, y: 0};
    cam.targetScale = 0.35;

    minimap.enable = false;
  }

  static restart() {
    //console.clear();

    // clear chunks
    /*
    for(var i = 0; i < chunkSystem.chunks.length; i++) {
      const c = chunkSystem.chunks[i];
      c.clear();
    }
    */

    /* KVŮLI OBNOVY PROVEDENÝCH ZMĚN U KLIENTŮ, KTEŘÍ NEZNAJÍ F5 :) */
    if(game.started && server.constants.GAME.REFRESH_PAGE_ON_RESTART) location.reload();

    setTimeout(()=>{
      if(game.started) return;
      Howler.stop();
      this.music_menu_id = music_menu.play();
      music_menu.volume(volumeMusic, this.music_menu_id);
    }, 3000);

    socket.disconnect();

    music_end.fade(volumeMusic, 0.0, 3000, this.music_end_id);

    objects = [];
    players = [];

    this.teams = {red: 0, blue: 0};

    player = new MyPlayer(0, session.name, 0, 0, 'white');
    player.enable = false;
    player.show = false;

    cam = new Camera(player);
    cam.targetScale = game.constants.MENU_SCALE;
    cam.scale = 0.5;

    /* connect to the multiplayer server */
    multiplayer = new Multiplayer(SERVER_URL);
    /* set default volume at 30% */
    Howler.volume(0.3);

    objects.push(new FlagSelect(-200, 50, 'red'));
    objects.push(new FlagSelect( 200, 50, 'blue'));

    splash = new ScreenFlash();

    socket.emit('get-player-teams');

    minimap.enable = false;

    game.started = false;
  }
}