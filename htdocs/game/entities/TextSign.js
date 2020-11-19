

class TextSign extends GameObject {
    constructor(str, x, y){
        super(x, y, 0, 0);
        this.str = str;
        // CHANGE THIS TO "TRUE" !!! for later..
        this.show = false;
        this.opacity = 0;
        this.targetOpacity = 0;
        // and also opacity to 255
        this.layer = y + 1000;
    }
    draw(){
        this.targetOpacity = this.show ? 255 : 0;

        this.opacity += (this.targetOpacity - this.opacity) * 0.2;

        push();
        fill(0, this.opacity/2);
        rectMode(CENTER);
        rect(this.pos.x, this.pos.y +3, 240, 30);
        fill(255, this.opacity);
        textSize(20);
        textAlign(CENTER, CENTER);
        text(this.str, this.pos.x, this.pos.y);
        pop();
    }
}