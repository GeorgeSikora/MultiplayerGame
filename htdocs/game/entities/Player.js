
let players = []; // other players

/* other players */
class Player {
    constructor(id, name, x, y, col) {
      this.id = id;
  
      this.name = name;
  
      this.pos = {x:x, y:y};
      this.w = 64;
      this.h = 64;

      this.hp = 100;
      
      this.col = col;

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
      image(img_player, this.pos.x-this.w/2, this.pos.y-this.h/2, this.w, this.h);
    
      fill(255);
      textAlign(CENTER, BOTTOM);
      text(this.name +'\n' +this.hp +'hp', this.pos.x, this.pos.y-5 -this.h/2);

    }
  }