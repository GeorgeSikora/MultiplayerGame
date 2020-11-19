
class Flag extends GameObject {
    constructor(x, y, team){
        super(x, y, 96, 128);

        this.center = {x: 14, y: 122};

        this.layer = this.pos.y + this.h - this.center.y;
        this.team = team;

        this.captureReady = false;

        this.captured = false;

        objects.push(new TextSign('Press [E] to capture flag', x, y - this.h - 12));
        this.textSign = objects[objects.length-1];
    }
    draw(){
        if(dist(player.pos.x, player.pos.y, this.pos.x, this.pos.y) < 100){
            if(this.team == player.team){

                // flag of MY team

                if(player.capturedFlag != null){

                    // player HAVE flag

                    this.acceptReady = true;
                    this.textSign.str = 'Press [E] to accept flag !';
                }
            } else {

                // flag of ENEMY team

                if(!this.captured && player.capturedFlag == null) {

                    // player can capture the flag

                    this.captureReady = true;
                    this.textSign.str = 'Press [E] to capture flag';
                }
            }
        } else {
            this.acceptReady = false;
            this.captureReady = false;
        }
        this.textSign.show = this.captureReady | this.acceptReady;

        push();
        translate(this.pos.x - this.center.x, this.pos.y - this.center.y);
        image(img_flag_stick, 0, 0);
        if(!this.captured){
            tint(this.team);
            const frame = floor(frameCount / 13) % 3;
            image(img_flag_banner, 0, 0, img_flag_banner.width/3, img_flag_banner.height, frame * img_flag_banner.width/3, 0, img_flag_banner.width/3, img_flag_banner.height);
        }
        pop();

    }
    cap(state){
        this.captured = state;
        return this;
    }
    keyPressed(){

        if(key == 'e'){
            
            // key E pressed

            if(this.captureReady && player.capturedFlag == null){
                
                // key E pressed

                sound_bye.play();
                this.captured = true;
                player.capturedFlag = this.team;
                console.log('Captured ' + this.team + ' flag!');
                this.captureReady = false;
            }

            if(this.acceptReady) {
                
                // key E pressed

                for(var i = 0; i < objects.length; i++){
                    if(objects[i].constructor.name != 'Flag') continue;
                    if(objects[i].team == player.capturedFlag) {
                        objects[i].captured = false;
                        sound_yay.play();
                    }
                }
                player.capturedFlag = null;
                this.acceptReady = false;
            }


        }
    }
    remove(){
        removeObject(this.textSign);
    }
}