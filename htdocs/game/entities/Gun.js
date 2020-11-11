
class Gun {
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

    shoot(obj) {

        const pos = this.getGunHead(obj);

        if(this.shootInterval < millis()){
            const SHOTS = 10;
            const SPREAD = PI/5;
            for(var i = 0; i < SHOTS; i++) {
              socket.emit('shot', {x: pos.x, y: pos.y, dir: atan2(mouseY - height / 2, mouseX - width / 2) + (i-SHOTS/2) * SPREAD/SHOTS});
            }
            /*
            socket.emit('shot', {x: player.pos.x, y: player.pos.y, dir: atan2(mouseY - height / 2, mouseX - width / 2)});
            */
           this.shootInterval = millis() + this.SHOTS_INTERVAL;
          }
    }
} 

class Rifle extends Gun {
    constructor(){
        super('rifle', img_rifle);

        this.AUTOMATIC = true;
        this.SHOTS_INTERVAL = 100;
    }
    shoot(obj) {

        const pos = this.getGunHead(obj);

        if(this.shootInterval < millis()){
            socket.emit('shot', {x: pos.x, y: pos.y, dir: atan2(mouseY - height / 2, mouseX - width / 2)});
            this.shootInterval = millis() + this.SHOTS_INTERVAL;
          }
    }
}

class Shotgun extends Gun {
    constructor(){
        super('shotgun', img_shotgun);
        /* GLOBAL */
        this.AUTOMATIC = false;
        this.SHOTS_INTERVAL = 500;
        /* SPECIAL */
        this.SHOTS = 10;
        this.SPREAD = PI/5;
    }
    shoot(obj) {
        const pos = this.getGunHead(obj);
        if(this.shootInterval < millis()){
            for(var i = 0; i < this.SHOTS; i++) {
                socket.emit('shot', {
                    x: pos.x,
                    y: pos.y, 
                    dir: atan2(mouseY - height / 2, mouseX - width / 2) + (i-this.SHOTS/2) * this.SPREAD/this.SHOTS
                });
            }
            this.shootInterval = millis() + this.SHOTS_INTERVAL;
        }
    }
}