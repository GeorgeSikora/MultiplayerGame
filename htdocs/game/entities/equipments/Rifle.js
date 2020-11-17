
/* RIFLE */

class Rifle extends Equipment {
    constructor(){
        super('rifle', img_rifle);

        this.HOLDING_USE = true;
        this.BUTTON_USE = LEFT;

        this.SHOTS_INTERVAL = 85;
    }
    use(obj) {
        if(this.shootInterval < millis()){
            const pos = this.getGunHead(obj);
            
            player.speed.x += cos(obj.rotation+PI)*1.7;
            player.speed.y += sin(obj.rotation+PI)*1.7;

            var id = sound_rifle.play();
            sound_rifle.pos(map(mouseX,0,width,-0.2, 0.2),map(mouseY,0,height,-0.2,0.2), -1-random(1), id);

            socket.emit('shot', {x: pos.x, y: pos.y, dir: atan2(mouseY - height / 2, mouseX - width / 2)});
            this.shootInterval = millis() + this.SHOTS_INTERVAL;
          }
    }
}