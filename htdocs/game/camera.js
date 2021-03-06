
let cam;

class Camera {
    constructor(target) {

        this.target = target;
        
        this.pos        = {x: target.pos.x, y: target.pos.y};
        this.targetPos  = {x: target.pos.x, y: target.pos.y};

        this.targetScale = 1.0;
        this.scale = 1.0;
        
        this.easing = 0.1;
        
        this.mouse = {x: 0, y: 0};
    }
    
    refresh() {
        if (this.target != null) 
            this.targetPos = { x: this.target.pos.x, y: this.target.pos.y };

        this.pos.x += (this.targetPos.x - this.pos.x) * this.easing;
        this.pos.y += (this.targetPos.y - this.pos.y) * this.easing;

        this.scale += ((this.targetScale * width / innerWidth) - this.scale) * this.easing;

        const left   = -width  / (this.scale * 2);
        const right  =  width  / (this.scale * 2);
        const bottom = -height / (this.scale * 2);
        const top    =  height / (this.scale * 2);

        ortho(left + this.pos.x, right + this.pos.x, bottom - this.pos.y, top - this.pos.y);
        
        this.mouse.x = map(mouseX, 0, width,  this.pos.x + left,   this.pos.x + right);
        this.mouse.y = map(mouseY, 0, height, this.pos.y + bottom, this.pos.y + top  );
    }
}