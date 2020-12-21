
/* is just ... "IP:PORT/NAMESPACE" */
let SERVER_URL = 'localhost:3031/client';  // 185.221.124.205

class game {

  /* MAIN VARIABLES */
  static fps = 0;
  static constants = {
    SEND_GAP: 90, // player pos sender

    MENU_SCALE: 1.5,
    DEFAULT_SCALE: 1.0,

    SHOW_TILE_ID: false,
    
    SHOW_INFO: false,
    SHOW_CHUNKS_BORDER: false,
  };

  static muted = true;

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
    
    player  = new MyPlayer(0, post.name, 0, 0, 'lobby');
    cam     = new Camera(player);
    chat    = new Chat();
    splash  = new ScreenFlash();
    minimap = new Minimap();

    player.enable = false;
    player.show = false;

    console.log(cam.targetScale, cam.scale);

    game.restart();

    sound_drop2.play();
  
    /* JUST FOR DEVELOP, UNDER THIS */
    Howler.mute(game.muted);
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

    player = new MyPlayer(0, post.name, 0, 0, 'white');
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