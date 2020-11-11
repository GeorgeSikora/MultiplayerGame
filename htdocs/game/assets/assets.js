
let img_player, img_block, img_knife, img_rifle, img_shotgun;
let font_default;

let sound_rifle, sound_shotgun, sound_knife;

function loadAssets() {
  /* images and textures */
  img_player = loadImage('assets/images/player.png');
  img_block = loadImage('assets/images/block.png');

  img_knife = loadImage('assets/images/knife.png');
  img_rifle = loadImage('assets/images/rifle.png');
  img_shotgun = loadImage('assets/images/shotgun.png');

  sound_rifle = new Howl({src: ['assets/sounds/riflegun.mp3']});
  sound_shotgun = new Howl({src: ['assets/sounds/shotgun.mp3']});
  sound_knife = new Howl({src: ['assets/sounds/knife.mp3']});

  /* fonts */
  //font_default = loadFont('assets/fonts/OpenSans-Regular.ttf');
  font_default = loadFont('assets/fonts/ColabReg.otf');

  /* some default stuff */
  textFont(font_default);
  noStroke();
}