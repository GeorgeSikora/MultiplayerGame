
class Flag extends GameObject {
    constructor(x, y, team){
        super(x, y, 96, 128);

        this.center = {x: 14, y: 122};

        this.layer = this.pos.y + this.h - this.center.y;
        this.team = team;

        this.captured = false;

        this.captureReady = false;

        this.autoAccept = false;

        objects.push(new TextSign('I am just flag :)', x, y - this.h - 12));
        this.textSign = objects[objects.length-1];
    }

    draw(){
        if(dist(player.pos.x, player.pos.y, this.pos.x, this.pos.y) < 100){
            if(this.team == player.team){

                // flag of MY team

                if(player.capturedFlag != null){

                    // player HAVE flag

                    if(this.autoAccept) {
                        this.acceptFlag();
                    } else {
                        this.acceptReady = true;
                        this.textSign.str = 'Press [E] to accept flag !';
                    }
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
        tint(255);
        translate(this.pos.x, this.pos.y);

        // RING
        /*
        tint(255);
        if(this.textSign.show ) tint(255, 255, 0);
        image(img_flag_ringle, -img_flag_ringle.width/2, -img_flag_ringle.height/2);
        */

        translate( -this.center.x, -this.center.y);
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

        if(key == 'e' || key == 'E'){
            
            // key E pressed

            if(this.captureReady && player.capturedFlag == null){
                
                // key E pressed

                this.captureFlag();
                this.captureReady = false;
            }

            if(this.acceptReady) {
                
                // key E pressed

                this.acceptFlag();
                this.acceptReady = false;
            }
        }
    }
    captureFlag(){
        
        socket.emit('flag-capture', this.team);

        sound_bye.play();
        /*
        this.captured = true;
        */
        player.capturedFlag = this.team;
    }
    acceptFlag(){

        socket.emit('flag-accept', player.capturedFlag);

        sound_wow.play();
        /*
        for(var i = 0; i < objects.length; i++){
            if(objects[i].constructor.name != 'Flag') continue;
            if(objects[i].team == player.capturedFlag) {
                objects[i].captured = false;
                sound_yay.play();
            }
        }
        */
        player.capturedFlag = null;
    }
    remove(){
        removeObject(this.textSign);
    }
}