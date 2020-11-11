
let img_player, img_block, img_gun, img_rifle, img_shotgun;
let font_default;

function loadAssets() {
  /* images and textures */
  img_player = loadImage('assets/images/player.png');
  img_block = loadImage('assets/images/block.png');
  img_gun = loadImage('assets/images/shotgun.png');

  img_rifle = loadImage('assets/images/rifle.png');
  img_shotgun = loadImage('assets/images/shotgun.png');

  /* fonts */
  //font_default = loadFont('assets/fonts/OpenSans-Regular.ttf');
  font_default = loadFont('assets/fonts/ColabReg.otf');

  /* some default stuff */
  textFont(font_default);
  noStroke();
}