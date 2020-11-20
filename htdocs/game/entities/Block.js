

class Block extends GameObject {
    constructor(x, y){
        super(x, y, 64, 64);
        this.collision = new Collision(this);
        this.collision.static = true;
        this.center = {x: this.w/2, y: this.h/2};
    }
    update(){
        
    }
    draw(){
        this.layer = this.pos.y - player.h - this.h;
        tint(255);
        image(img_block, this.pos.x -this.w/2, this.pos.y -this.h/2);
    }
}