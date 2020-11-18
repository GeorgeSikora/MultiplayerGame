

class TextSign extends GameObject {
    constructor(str, x, y){
        super(x, y, 0, 0);
        this.str = str;
        this.show = true;
        this.layer = 100;
    }
    draw(){
        if(!this.show) return;

        fill(0, 127);
        rectMode(CENTER);
        rect(this.pos.x, this.pos.y +3, 240, 30);
        fill(255);
        textSize(20);
        textAlign(CENTER, CENTER);
        text(this.str, this.pos.x, this.pos.y);
    }
}