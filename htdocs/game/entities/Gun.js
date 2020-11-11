
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
    shoot(obj) {}
} 

class Knife extends Gun {
    constructor(){
        super('knife', img_knife);

        this.shake = {x: 0, y: 0};
    }
    draw(obj) {
        push();

        this.shake.x += (0-this.shake.x) * 0.16;
        this.shake.y += (0-this.shake.y) * 0.16;

        translate(obj.pos.x + this.shake.x, obj.pos.y + this.shake.y);
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

    shoot(obj) {
        var id = sound_knife.play();
        sound_knife.pos(map(mouseX,0,width,-1,1),map(mouseY,0,height,-1,1), -1.0, id);

        this.shake.x = cos(obj.rotation)*42;
        this.shake.y = sin(obj.rotation)*42;

        player.speed.x += cos(obj.rotation)*5;
        player.speed.y += sin(obj.rotation)*5;
        /*
        const pos = this.getGunHead(obj);

        if(this.shootInterval < millis()){
            sound_rifle.play();
            socket.emit('shot', {x: pos.x, y: pos.y, dir: atan2(mouseY - height / 2, mouseX - width / 2)});
            this.shootInterval = millis() + this.SHOTS_INTERVAL;
          }
          */
    }
}

class Rifle extends Gun {
    constructor(){
        super('rifle', img_rifle);

        this.AUTOMATIC = true;
        this.SHOTS_INTERVAL = 85;
    }
    shoot(obj) {

        if(this.shootInterval < millis()){
            const pos = this.getGunHead(obj);
            
            player.speed.x += cos(obj.rotation+PI)*1.7;
            player.speed.y += sin(obj.rotation+PI)*1.7;

            sound_rifle.play();
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
        if(this.shootInterval < millis()){

            const pos = this.getGunHead(obj);

            var id = sound_shotgun.play();
            //sound_shotgun.volume(1, id);
            //sound_shotgun.pos(map(mouseX,0,width,-1,1),map(mouseY,0,height,-1,1), -0.5, id);
            //sound_shotgun.stereo(0, id);

            player.speed.x += cos(obj.rotation+PI)*15.0;
            player.speed.y += sin(obj.rotation+PI)*15.0;

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