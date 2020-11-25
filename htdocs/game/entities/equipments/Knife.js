
/* KNIFE */

class Knife extends Equipment {
    constructor(){
        super('knife', img_knife);
        
        this.BUTTON_USE = LEFT;

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
    use(obj) {
        var id = sound_knife.play();
        //sound_knife.pos(map(mouseX,0,width,-1,1),map(mouseY,0,height,-1,1), -0.5, id);

        this.shake.x = cos(obj.rotation)*42;
        this.shake.y = sin(obj.rotation)*42;

        player.speed.x += cos(obj.rotation) * 2.5;
        player.speed.y += sin(obj.rotation) * 2.5;
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