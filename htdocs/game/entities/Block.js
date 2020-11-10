

class Block extends GameObject {
    constructor(x, y){
        super(x, y, 64, 64);
    }
    update(){
        
    }
    draw(){
        image(img_block, this.pos.x, this.pos.y);
    }
}