
let player; // my player

/* my single player entity */
class MyPlayer extends GameObject{
  constructor(id, name, x, y, colorID) {
    super(x,y,64,64);

    this.collision = new Collision(this);
    this.center = {x: this.w/2, y: this.h/2};

    this.id = id;
    this.name = name;
    this.hp = 0;
    this.kills = 0;
    this.colorID = colorID;
    this.col = getColor(colorID);

    this.weapons = [new Knife(), new Rifle(), new Shotgun()];
    this.tools = [new Build()];

    this.equipment = this.weapons;
    this.selectedEquipment = 0;
    this.rotation = 0;

    /* EXTRA VALUES */
    this.maxSpeed = 15;
    this.speed = {x:0, y:0};
    this.targetSpeed = {x:0, y:0};
  
    this.left = 0;
    this.right = 0;
    this.up = 0;
    this.down = 0;
  }
  
  refresh() { 
    /* control */
    this.targetSpeed.x = (this.right - this.left) * this.maxSpeed;
    this.targetSpeed.y = (this.down - this.up)    * this.maxSpeed;
    /* move easing */
    this.speed.x += (this.targetSpeed.x*(deltaTime / 50) - this.speed.x) *0.35 *(deltaTime / 50);
    this.speed.y += (this.targetSpeed.y*(deltaTime / 50) - this.speed.y) *0.35 *(deltaTime / 50);
    /* position move */
    this.pos.x += this.speed.x;
    this.pos.y += this.speed.y;
    /* player rotation */
    this.rotation = atan2(mouseY - height / 2, mouseX - width / 2);
    /* gun automatic shoot */
    if(!menuOpened && 
        mouseIsPressed && 
        this.equipment[this.selectedEquipment].HOLDING_USE
      ){
      this.equipmentUsage();
    }
  }
  
  draw() {
    this.layer = this.pos.y +this.h/2;
    /* player */
    push();
    translate(this.pos.x-this.w/2, this.pos.y-this.h/2);
    tint(this.col);
    image(img_player,0,0, this.w, this.h);
    pop();
    /* gun */
    this.equipment[this.selectedEquipment].draw(this);
    /* name & hp */ 
    textSize(16);
    fill(255,255,0);
    textAlign(CENTER, BOTTOM);
    text(this.name +'\n' +this.hp +'hp', this.pos.x, this.pos.y-5 -this.h/2);
  }

  equipmentUsage() {
    if(this.equipment[this.selectedEquipment].BUTTON_USE == 0 || this.equipment[this.selectedEquipment].BUTTON_USE == mouseButton) this.equipment[this.selectedEquipment].use(this);
  }

  mousePressed(){
  this.equipmentUsage();
  }
  
  keyPressed(){
    if (keyCode == 65) this.left  = 1; 
    if (keyCode == 87) this.up    = 1;   
    if (keyCode == 83) this.down  = 1; 
    if (keyCode == 68) this.right = 1;
  }
  
  keyReleased(){
    if (keyCode == 65) this.left  = 0;
    if (keyCode == 87) this.up    = 0;
    if (keyCode == 83) this.down  = 0;
    if (keyCode == 68) this.right = 0;
  }
  
  stopMove(){
    this.left = 0; this.right = 0; this.up = 0; this.down = 0;
  }
}