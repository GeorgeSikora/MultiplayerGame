
let 
  img_player, 
  img_block, 
  img_knife, 
  img_rifle, 
  img_shotgun,

  ico_sounds_on,
  ico_sounds_off,

  sound_rifle, 
  sound_shotgun, 
  sound_knife,

  font_default
;

function preload() {

  /* Images and Textures */
  img_player = loadImage('assets/images/player.png');
  img_block = loadImage('assets/images/block.png');

  img_knife = loadImage('assets/images/knife.png');
  img_rifle = loadImage('assets/images/rifle.png');
  img_shotgun = loadImage('assets/images/shotgun.png');

  /* Icons */
  ico_sounds_on = loadImage('assets/images/sounds_on.png');
  ico_sounds_off = loadImage('assets/images/sounds_off.png');
  
  /* Sounds and Music */
  sound_rifle = new Howl({src: ['assets/sounds/riflegun.mp3']});
  sound_shotgun = new Howl({src: ['assets/sounds/shotgun.mp3']});
  sound_knife = new Howl({src: ['assets/sounds/knife.mp3']});

  /* Fonts */
  font_default = loadFont('assets/fonts/OpenSans-Regular.ttf');
}