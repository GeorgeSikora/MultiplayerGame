
let selectedTeam;

class FlagSelect extends GameObject {
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
        //this.textSign.color = this.team;

        this.animShift = random(3);
    }
    draw(){
        if(menuOpened == false && dist(cam.mouse.x, cam.mouse.y, this.pos.x, this.pos.y) < 160){
            this.textSign.str = 'Click to select ' + this.team + ' team';
            this.textSign.show = true;
        } else {
            this.textSign.show = false;
        }

        push();
        translate(this.pos.x, this.pos.y);
        
        tint(255);
        if(this.textSign.show ) tint(255, 255, 0);
        image(img_flag_ringle, -img_flag_ringle.width/2, -img_flag_ringle.height/2);

        translate( -this.center.x, -this.center.y);

        tint(255);
        image(img_flag_stick, 0, 0);
        if(!this.captured){
            tint(this.team);
            const frame = floor(frameCount / 13 + + this.animShift) % 3;
            image(img_flag_banner, 0, 0, img_flag_banner.width/3, img_flag_banner.height, frame * img_flag_banner.width/3, 0, img_flag_banner.width/3, img_flag_banner.height);
        }
        pop();

        push();
        translate(this.pos.x, this.pos.y + 32);

        fill(200);
        textSize(20);
        textAlign(CENTER, TOP);
        text(game.teams[this.team] + ' players', 0, 0);
        pop();

    }

    mousePressed(){
        if(dist(cam.mouse.x, cam.mouse.y, this.pos.x, this.pos.y) < 160){
            
            if(!socket.connected) return;

            console.log('Player selected ' + this.team + ' team.');

            // If connected, send initRequest with initial data
            socket.emit('initReq', {
                name:      player.name, 
                password:  'heslo',
                team:       this.team
            });

            selectedTeam = this.team;
        }
    }

    remove(){
        removeObject(this.textSign);
    }
}