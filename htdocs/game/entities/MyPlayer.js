
let player; // my player

/* my single player entity */
class MyPlayer {
    constructor(id, name, x, y, col) {
      this.id = id;

      this.name = name;
  
      this.pos = {x:x, y:y};
      this.w = 64;
      this.h = 64;

      this.hp = 100;
      
      this.col = col;

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
      if(!focused) this.stopMove();
  
      this.targetSpeed.x = (this.right - this.left) * this.maxSpeed;
      this.targetSpeed.y = (this.down - this.up)    * this.maxSpeed;
      
      this.speed.x += (this.targetSpeed.x*(deltaTime / 50) - this.speed.x) *0.35 *(deltaTime / 50);
      this.speed.y += (this.targetSpeed.y*(deltaTime / 50) - this.speed.y) *0.35 *(deltaTime / 50);
    
      this.pos.x += this.speed.x;
      this.pos.y += this.speed.y;
    }
  
    draw() {
      push();
      translate(this.pos.x-this.w/2, this.pos.y-this.h/2);
      if(mouseX > width/2) {
        translate(this.w, 0);
        scale(-1.0,1.0);
      }
      image(img_player,0,0, this.w, this.h);
      pop();
    
      fill(255,255,0);
      textAlign(CENTER, BOTTOM);
      text(this.name +'\n' +this.hp +'hp', this.pos.x, this.pos.y-5 -this.h/2);
    }

    shootInterval = 0;
    shoting() {
      if(this.shootInterval < millis()){
        socket.emit('shot', {x: player.pos.x, y: player.pos.y, dir: atan2(mouseY - height / 2, mouseX - width / 2)});
        this.shootInterval = millis() + serverConst.PLAYER_MIN_SHOOT_GAP;
      }
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