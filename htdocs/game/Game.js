
/* GLOBAL VARIABLES */

let constants = []; // server constants

const SEND_GAP = 90; // player pos sender

class game {

  static fps = 0;
  static menuOpened = false;
  static muted = false;
  static loaded = false;
  static started = false;
  static showInfo = false;
  static showPlayersTarget = false

  static teams = {red: 0, blue: 0};

  static buildingEnable = false;
  static drawTime = 0;

  static setup() {

    player  = new MyPlayer(0, post.name, 0, 0, 'lobby');
    cam     = new Camera(player);
    chat    = new Chat();
    splash  = new ScreenFlash();
    minimap = new Minimap();

    player.enable = false;
    player.show = false;

    /* connect to the multiplayer server */
    multiplayer = new Multiplayer(SERVER_URL);
    socket.emit('get-player-teams');

    game.restart();
    sound_drop2.play();
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

    /* KVŮLI OBNOVY PROVEDENÝCH ZMĚN U KLIENTŮ, KTEŘÍ NEZNAJÍ F5 :) */
    if(game.started && constants.GAME.REFRESH_PAGE_ON_RESTART) location.reload();

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