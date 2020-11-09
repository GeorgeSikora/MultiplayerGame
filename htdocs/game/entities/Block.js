

class Block extends GameObject {
    constructor(x, y, w, h){
        super(x, y, w, h);
    }
    update(){
        
    }
    draw(){
        fill(0,100,100);
        rect(this.pos.x, this.pos.y, this.w, this.h);
    }
}