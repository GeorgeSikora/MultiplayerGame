
let img_player, img_block;
let font_default;

function loadAssets() {
  /* images and textures */
  img_player = loadImage('assets/images/player.png');
  img_block = loadImage('assets/images/block.png');

  /* fonts */
  //font_default = loadFont('assets/fonts/OpenSans-Regular.ttf');
  font_default = loadFont('assets/fonts/ColabReg.otf');

  /* some default stuff */
  textFont(font_default);
  noStroke();
}