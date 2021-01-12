
/* SHOTGUN */

class Shotgun extends Equipment {
    constructor(){
        super('shotgun', img_shotgun);
        /* GLOBAL */
        this.SHOTS_INTERVAL = 500;
        this.BUTTON_USE = LEFT;
        /* SPECIAL */
        this.SHOTS = 10;
        this.SPREAD = PI/5;
    }
    use(obj) {
        if(this.shootInterval < millis()){

            const pos = this.getGunHead(obj);

            var id = sound_shotgun.play();
            sound_shotgun.pos(map(mouseX,0,width,-0.2,0.2),map(mouseY,0,height,-0.2,0.2), random(-0.4,-0.6), id);
            //sound_shotgun.pos(map(mouseX,0,width,-1,1),map(mouseY,0,height,-1,1), -0.5, id);
            //sound_shotgun.volume(1, id);
            //sound_shotgun.pos(map(mouseX,0,width,-1,1),map(mouseY,0,height,-1,1), -0.5, id);
            //sound_shotgun.stereo(0, id);

            player.speed.x = cos(obj.rotation + PI) * 22.0;
            player.speed.y = sin(obj.rotation + PI) * 22.0;
            
            socket.emit('shot');
            /*
            for(var i = 0; i < this.SHOTS; i++) {
                socket.emit('shot', {
                    x: pos.x,
                    y: pos.y, 
                    dir: atan2(mouseY - height / 2, mouseX - width / 2) + (i-this.SHOTS/2) * this.SPREAD/this.SHOTS
                });
            }
            */
            this.shootInterval = millis() + this.SHOTS_INTERVAL;
        }
    }
}