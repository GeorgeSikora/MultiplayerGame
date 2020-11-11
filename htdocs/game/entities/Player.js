
let players = []; // other players

/* other players */
class Player extends GameObject{
    constructor(id, name, x, y, col) {
      super(x, y, 64, 64)

      this.id = id;
      this.name = name;
      this.hp = 0;
      this.col = col;

      
      this.guns = [new Rifle(), new Shotgun()];
      this.rotation = 0;
      this.targetRotation = 0;
      this.selectedGun = 0;

      /* EXTRA VALUES */
      this.target = {x:x, y:y};
    }
  
    refresh() { 
      this.pos.x += (this.target.x - this.pos.x) *0.25;
      this.pos.y += (this.target.y - this.pos.y) *0.25;
    }
  
    draw() {
      //fill(this.col);
      //rect(this.pos.x -this.w/2, this.pos.y -this.h/2, this.w, this.h);
      tint(this.col);
      image(img_player, this.pos.x-this.w/2, this.pos.y-this.h/2, this.w, this.h);

      const gun = this.guns[this.selectedGun].img;

      this.rotation += (this.targetRotation - this.rotation) * 0.2;
      push();
      translate(this.pos.x, this.pos.y);
      rotate(this.rotation);
      translate(-gun.width/2, -12);
      tint(255);
      if(this.rotation < -PI/2 || this.rotation > PI/2) {
        translate(0, gun.height/2);
        scale(1.0,-1.0);
      }
      image(gun,0,0);
      pop();
    
      fill(255);
      textAlign(CENTER, BOTTOM);
      text(this.name +'\n' +this.hp +'hp', this.pos.x, this.pos.y-5 -this.h/2);

    }
  }