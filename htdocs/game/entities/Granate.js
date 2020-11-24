
/* GRANATE */

class Granate extends GameObject {
    constructor(x, y, dir){
        super(x, y, 32, 32);

        this.collision = new Collision(this);
        this.center = {x: this.w/2, y: this.h/2};

        this.dir = dir;

        this.maxSpeed = 20;

        this.lastDir = 'none';
    }
    update() {
        if(this.maxSpeed < 0) {
            for(var i = 0; i < 50; i++){
                objects.push(new Smoke(this.pos.x, this.pos.y));
            }
            removeObject(this);
            return;
        }

        this.speed = {x: cos(this.dir)*this.maxSpeed, y: sin(this.dir)*this.maxSpeed};

        switch(this.collision.direction) {
            case 'right':
            case 'left':
                this.speed.x *= -1;
                if(this.lastDir == 'top' || this.lastDir == 'bottom' || this.lastDir == 'none')
                if(ceil(random(2)) == 1){
                    sound_wall_hit2.play();
                } else {
                    sound_wall_hit.play();
                }
                break;
            
            case 'top':
            case 'bottom':
                this.speed.y *= -1;
                if(this.lastDir == 'right' || this.lastDir == 'left' || this.lastDir == 'none')
                if(ceil(random(2)) == 1){
                    sound_wall_hit2.play();
                } else {
                    sound_wall_hit.play();
                }
                break;
        }
        this.lastDir = this.collision.direction;

        this.pos.x += this.speed.x;
        this.pos.y += this.speed.y;

        this.maxSpeed -= 0.2;
    }
    draw() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.dir);
        translate(-this.center.x, -this.center.y);
        fill(255, 0, 255);
        imageMode(CORNER);
        image(img_granate_smoke, 0, 0);
        pop();
    }
}