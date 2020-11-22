
/* GLOBAL VARIABLES */
let inGame = false;
let muted = false;
let buildingEnable = false;
let finalDrawTime = 0;
let gameLoaded = false;
let gameStarted = false;
let fps = 0;
let music_end_id;
const SEND_GAP = 90; // player pos sender
let serverConst = []; // server constants
let menuOpened = false;

const game = {

    teams: {
        red: 0,
        blue: 0
    },

    setup(){

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
    },
    start(){
        //Howler.stop();
      
        console.log('game started');
        minimap.enable = true;
        inGame = true;
        //music_menu.rate(3, music_menu_id);
        music_menu.fade(volumeMusic, 0, 2000, music_menu_id);
    },
    end() {
        music_end_id = music_end.play();
        music_end.volume(volumeMusic, music_end_id);
        music_end.fade(0, volumeMusic, 1000, music_end_id);
      
        player.enable = false;
      
        cam.target = null;
        cam.easing = 0.02;
        cam.targetPos = {x: 0, y: 0};
        cam.targetScale = 0.35;
      
        minimap.enable = false;
    },
    restart() {

        music_end.fade(volumeMusic, 0.0, 3000, music_end_id);

        setTimeout(()=>{
          if(inGame) return;
          Howler.stop();
          music_menu_id = music_menu.play();
          music_menu.volume(volumeMusic, music_menu_id);
        }, 3000);
      
        gameStarted = false;
      
        socket.disconnect();
      
        objects = [];
        players = [];
        
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
        inGame = false;
    }
};