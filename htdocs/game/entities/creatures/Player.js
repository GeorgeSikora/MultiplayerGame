
let players = []; // other players

/* other players */
class Player extends GameObject {

  static moveEasing = 0.3;

  constructor(id, name, x, y, col) {
    super(x, y, 64, 64);

    this.id = id;
    this.name = name;
    this.hp = 0;
    this.col = col;

    this.selectedEquipment = 'Knife';

    this.rotation = 0;
    this.targetRotation = 0;

    /* FLAGS MINIGAME */
    this.capturedFlag = null;
    this.team = col;

    /* EXTRA VALUES */
    this.target = {x:x, y:y};
    this.center = {x: this.w/2, y: this.h/2}
  }
  
  refresh() { 
    this.pos.x += (this.target.x - this.pos.x) * Player.moveEasing; // 0.25
    this.pos.y += (this.target.y - this.pos.y) * Player.moveEasing; // 0.25

    this.rotation += (this.targetRotation - this.rotation) * 0.2;

    this.layer = this.pos.y +this.h/2;
  }
  
  draw() {

    push();
    translate(this.pos.x, this.pos.y);
    imageMode(CORNER);

    /* player */
    tint(this.col);
    image(img_player, -this.center.x, -this.center.y, this.w, this.h);

    /* headband */
    if(this.capturedFlag != null){
      tint(this.capturedFlag);
      image(img_headband, -img_headband.width/2, -img_headband.height/2);
    }

    /* name */
    fill(255); 
    textSize(16);
    textAlign(CENTER, BOTTOM);
    text(this.name +'\n' +this.hp +'hp', 0, -5 -this.h/2);

    pop();

    /* equipment */
    if(this.selectedEquipment != 0){
      var myObject = eval("new " + this.selectedEquipment + "()");
      myObject.draw(this);
    }

    /* target non smoothed pos */
    if(game.showPlayersTarget) {
      push();
      rectMode(CORNER);
      fill(0,255,0,127);
      translate(this.target.x, this.target.y);
      rect(-this.center.x, -this.center.y, this.w, this.h);
      pop();
    }
  }
}