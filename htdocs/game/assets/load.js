
function preload() {

  /* Images and Textures */
  img_player = loadImage('assets/images/player.png');
  img_block = loadImage('assets/images/block.png');

  img_knife = loadImage('assets/images/knife.png');
  img_rifle = loadImage('assets/images/rifle.png');
  img_shotgun = loadImage('assets/images/shotgun.png');

  img_flag = loadImage('assets/images/flag-red.png');
  //img_flag = get(0,0,img_flag.width/2,height);

  /* Icons */
  ico_sounds_on = loadImage('assets/images/sounds_on.png');
  ico_sounds_off = loadImage('assets/images/sounds_off.png');
  
  /* Sounds and Music */
  sound_rifle = new Howl({src: ['assets/sounds/riflegun.mp3']});
  sound_shotgun = new Howl({src: ['assets/sounds/shotgun.mp3']});
  sound_knife = new Howl({src: ['assets/sounds/knife.mp3']});
  sound_place = new Howl({src: ['assets/sounds/place.wav']});
  sound_pop = new Howl({src: ['assets/sounds/pop.wav']});

  /* Fonts */
  font_default = loadFont('assets/fonts/OpenSans-Regular.ttf');
}