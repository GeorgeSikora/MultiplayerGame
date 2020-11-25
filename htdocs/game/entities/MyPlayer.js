
let player; // my player

/* my single player entity */
class MyPlayer extends GameObject {
  constructor(id, name, x, y, team) {
    super(x, y, 64, 64);

    /* SERVER ID */
    this.id = id;

    /* INFORMATIONS */
    this.name = name;
    this.hp = 0;
    this.kills = 0;
    this.rotation = 0;
    
    /* STATEMENTS */
    this.enable = true;
    this.show = true;

    /* COLLISION MASK */
    this.collision = new Collision(this);
    this.center = {x: this.w/2, y: this.h/2};
  
    /* FLAGS MINIGAME */
    this.capturedFlag = null;
    this.team = team;

    /* MOVEMENT */
    this.maxSpeed = 20;
    this.speed = {x:0, y:0};
    this.targetSpeed = {x:0, y:0};
  
    this.left = 0;
    this.right = 0;
    this.up = 0;
    this.down = 0;

    /* EQUIPMENT AMMOUNTS */
    this.shotgunBullets = 20;
    this.lightBullets = 100;
    this.smokeGranates = 5;

    /* EQUIPMENT */
    this.weapons = [
      new Knife(), 
      new Rifle(), 
      new Shotgun(),
      new HandGranate()
    ];
    this.tools = [
      new BuildBlock(), 
      new BuildFlag('blue'), 
      new BuildFlag('green'), 
      new BuildFlag('red'),
      new BuildFlag('yellow')
    ];
    this.equipment = this.weapons;
    this.selectedEquipment = 0;

    /* OTHER */
    this.botEnable = false;
  }
  
  refresh() {
    if(!this.enable) return;
    
    /* refresh proper layer */
    this.layer = this.pos.y +this.h/2;
    /* control */
    this.targetSpeed.x = (this.right - this.left) * this.maxSpeed;
    this.targetSpeed.y = (this.down - this.up)    * this.maxSpeed;

     /* bot control */
     if(this.botEnable) {
      if((sin(millis()/500) < 0)) {
      this.targetSpeed.x = this.maxSpeed;
      } else {
        this.targetSpeed.x = -this.maxSpeed;
      }
    }

    /* move easing */
    this.speed.x += (this.targetSpeed.x*(deltaTime / 50) - this.speed.x) *0.35 *(deltaTime / 50);
    this.speed.y += (this.targetSpeed.y*(deltaTime / 50) - this.speed.y) *0.35 *(deltaTime / 50);
    /* position move */
    this.pos.x += this.speed.x;
    this.pos.y += this.speed.y;
    /* player rotation */
    this.rotation = atan2(mouseY - height / 2, mouseX - width / 2);
    /* equipment mouse hold using */
    if(!game.menuOpened && mouseIsPressed && this.equipment[this.selectedEquipment].HOLDING_USE) {
      this.equipmentUsage();
    }
    /* small particles, when player run */
    if(this.isMoving()) {
      objects.push(new Particle(this.pos.x + random(-this.w/2, this.w/2), this.pos.y + this.h/2 - 5));
    }
  }
  
  draw() {
    if(!this.show) return;
    /* player */
    push();
    translate(this.pos.x -this.w/2, this.pos.y -this.h/2);
    tint(this.team);
    image(img_player, 0, 0, this.w, this.h);
    pop();
    /* headband */
    if(this.capturedFlag != null) {
      push();
      translate(this.pos.x, this.pos.y);
      tint(this.capturedFlag);
      image(img_headband, -img_headband.width/2, -img_headband.height/2);
      pop();
    }
    /* draw equipment */
    this.equipment[this.selectedEquipment].draw(this);
    /* name and hp */ 
    textSize(16);
    fill(255,255,0);
    textAlign(CENTER, BOTTOM);
    text(this.name +'\n' +this.hp +'hp', this.pos.x, this.pos.y-5 -this.h/2);
  }

  equipmentUsage() {
    if(this.equipment[this.selectedEquipment].BUTTON_USE == 0 || this.equipment[this.selectedEquipment].BUTTON_USE == mouseButton) this.equipment[this.selectedEquipment].use(this);
  }

  mousePressed() {
    if(!this.enable) return;
    this.equipmentUsage();
  }
  
  keyPressed() {
    if (keyCode == 65) this.left  = 1; 
    if (keyCode == 87) this.up    = 1;   
    if (keyCode == 83) this.down  = 1; 
    if (keyCode == 68) this.right = 1;
  }
  
  keyReleased() {
    if (keyCode == 65) this.left  = 0;
    if (keyCode == 87) this.up    = 0;
    if (keyCode == 83) this.down  = 0;
    if (keyCode == 68) this.right = 0;
  }

  isMoving(){
    return this.left || this.right || this.up || this.down;
  }
  
  stopMove() {
    this.left = 0; this.right = 0; this.up = 0; this.down = 0;
  }
}