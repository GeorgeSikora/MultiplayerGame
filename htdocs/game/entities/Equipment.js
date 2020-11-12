
class Equipment {
    constructor(name, img){
        this.name = name;
        this.img = img;
        this.shootInterval = 0;
        this.AUTOMATIC = false;
        this.SHOTS_INTERVAL = 0;
    }
    draw(obj) {
      push();
      translate(obj.pos.x, obj.pos.y);
      rotate(obj.rotation);
      translate(-this.img.width/2, -12);
      if(obj.rotation < -PI/2 || obj.rotation > PI/2) {
        translate(0, this.img.height/2);
        scale(1.0,-1.0);
      }
      tint(255);
      image(this.img,0,0);
      pop();
    }
    getGunHead(obj) {
        const shift = (obj.rotation < -PI/2 || obj.rotation > PI/2) ? PI : 0;
        return {
            x: obj.pos.x + cos(obj.rotation)*this.img.width/2 + sin(obj.rotation + shift - PI)*12,
            y: obj.pos.y + sin(obj.rotation)*this.img.width/2 + cos(obj.rotation + shift)*12
        }
    }
    shoot(obj) {}
}