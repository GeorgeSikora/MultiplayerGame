
let music_menu_id;

function preload() {

  /* Images and Textures */
  img_grass = loadImage('assets/images/grass.png');

  img_player = loadImage('assets/images/player.png');
  img_headband = loadImage('assets/images/headband.png');

  img_block = loadImage('assets/images/block.png');

  img_knife = loadImage('assets/images/knife.png');
  img_rifle = loadImage('assets/images/rifle.png');
  img_shotgun = loadImage('assets/images/shotgun.png');

  img_flag_stick   = loadImage('assets/images/flag/stick.png');
  img_flag_banner  = loadImage('assets/images/flag/banner.png');
  img_flag_dropped = loadImage('assets/images/flag/dropped.png');
  img_flag_icon    = loadImage('assets/images/flag/icon.png');
  img_flag_ringle  = loadImage('assets/images/flag/ringle.png');

  /* Icons */
  ico_sounds_on = loadImage('assets/images/sounds_on.png');
  ico_sounds_off = loadImage('assets/images/sounds_off.png');
  
  /* Sounds*/
  sound_rifle = new Howl({src: ['assets/sounds/riflegun.mp3']});
  sound_shotgun = new Howl({src: ['assets/sounds/shotgun.mp3']});
  sound_knife = new Howl({src: ['assets/sounds/knife.mp3']});
  sound_place = new Howl({src: ['assets/sounds/place.wav']});
  sound_pop = new Howl({src: ['assets/sounds/pop.wav']});

  sound_yay = new Howl({src: ['assets/sounds/yay.mp3']});
  sound_bye = new Howl({src: ['assets/sounds/bye.mp3']});
  sound_wow = new Howl({src: ['assets/sounds/wow.mp3']});
  
  sound_drop1 = new Howl({src: ['assets/sounds/drop1.mp3']});
  sound_drop2 = new Howl({src: ['assets/sounds/drop2.mp3']});
  /* Music */
  music_end = new Howl({src: ['assets/music/Wolfgang Lohr - Astronomia (Electro Swing Cover) (Coffin Dance Meme Song Remix).mp3'], loop: false});
  music_menu = new Howl({src: ['assets/music/Kevin MacLeod - Tempting Secrets.mp3'], loop: true});

  /* Fonts */
  font_default = loadFont('assets/fonts/OpenSans-Regular.ttf');
}