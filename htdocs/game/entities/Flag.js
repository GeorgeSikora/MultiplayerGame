
class Flag extends GameObject {
    constructor(x, y, team){
        super(x, y, 96, 128);

        this.center = {x: 14, y: 122};

        
        this.layer = this.h - this.center.y;

        if(team === 'red'){
            this.img = img_flag_red;
        } else {
            this.img = img_flag_blue;
        }

        objects.push(new TextSign('Press [E] to capture flag', x, y - this.h - 12));
        this.textSign = objects[objects.length-1];
        
    }
    draw(){
        push();
        translate(this.pos.x - this.center.x, this.pos.y - this.center.y);
        let frame = floor(frameCount / 13) % 3;
        image(this.img, 0, 0, this.w, this.h, frame * this.w, 0, this.w, this.h);
        pop();

        this.textSign.show = (dist(player.pos.x, player.pos.y, this.pos.x, this.pos.y) < 100);
    }
}