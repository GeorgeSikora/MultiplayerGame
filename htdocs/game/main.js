
/* set default volumes */
Howler.volume(0.3);
let volumeMusic = 0.5; 

/*** SETUP ***/
function setup() {
  /* create as window screen size */
  createCanvas(innerWidth, innerHeight, WEBGL);
  /* ckeck display resolution, optionally resize */
  windowResized();
  /* set some default stuff */
  textFont(font_default);
  noStroke();
  frameRate(100);
  /* create necessary game objects */
  game.setup();
}

/*** LOOP ***/
function draw() {


  Screen.draw();


}