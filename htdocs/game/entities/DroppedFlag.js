
class DroppedFlag extends GameObject {
    constructor(x, y, team){
        super(x, y, 64, 32);
        this.center = {x: 32, y: 16};

        this.layer = this.pos.y - this.h - this.center.y;
        this.team = team;

        this.pickReady = false;

        objects.push(new TextSign('Press [E] to pick flag', x, y - this.h - 12));
        this.textSign = objects[objects.length-1];
    }
    draw(){
        if(dist(player.pos.x, player.pos.y, this.pos.x, this.pos.y) < 64){
            if(this.team == player.team){

                // flag of MY team

                if(player.capturedFlag == null){

                    // player DONT HAVE flag captured

                    this.returnReady = true;
                    this.textSign.str = 'Press [E] to return flag !';
                }
            } else {

                // flag of ENEMY team

                if(player.capturedFlag == null) {

                    // player DONT HAVE flag captured

                    this.pickReady = true;
                    this.textSign.str = 'Press [E] to pick flag !';
                }
            }
        } else {
            this.returnReady = false;
            this.pickReady = false;
        }
        this.textSign.show = (player.capturedFlag == null) & (this.returnReady | this.pickReady);

        push();
        translate(this.pos.x - this.center.x, this.pos.y - this.center.y);
        tint(this.team);
        image(img_flag_dropped, 0, 0);
        pop();

    }
    keyPressed(){

        if(key == 'e'){
            
            // key E pressed

            if(this.pickReady && player.capturedFlag == null){
                
                // key E pressed

                socket.emit('DroppedFlag-pick', this.team);
                sound_bye.play();

                //removeObject(this);
            }

            if(this.returnReady) {
                
                // key E pressed
                
                socket.emit('DroppedFlag-return', this.team);
                sound_wow.play();
                
                /*
                for(var i = 0; i < objects.length; i++){
                    if(objects[i].constructor.name != 'Flag') continue;
                    if(objects[i].team == this.team) {
                        objects[i].captured = false;
                        sound_yay.play();
                    }
                }

                removeObject(this);
                */
            }
        }
    }
    remove(){
        removeObject(this.textSign);
    }
}