
let cam;

class Camera {
    constructor(target){

        this.target = target;
        this.scale = 0.8;
        this.pos = {x: 0, y: 0};
        this.easing = 0.1;
        
        this.mouse = {x: 0, y: 0};

    }
    
    ortho(){
        const targetPos = { x: this.target.pos.x, 
                            y: this.target.pos.y };

        this.pos.x += (targetPos.x - this.pos.x) * this.easing;
        this.pos.y += (targetPos.y - this.pos.y) * this.easing;

        const left   = -width  / (this.scale*2);
        const right  =  width  / (this.scale*2);
        const bottom = -height / (this.scale*2);
        const top    =  height / (this.scale*2);
        
        this.mouse.x = map(mouseX, 0.0, width, left+this.pos.x, right+this.pos.x);
        this.mouse.y = map(mouseY, 0.0, height, bottom+this.pos.y, top+this.pos.y);

        ortho(left + this.pos.x, right + this.pos.x, bottom - this.pos.y, top - this.pos.y);
    }
}