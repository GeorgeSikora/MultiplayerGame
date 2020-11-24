
/* GRANATE */

class Granate extends GameObject {
    constructor(x, y, dir){
        super(x, y, 32, 32);

        this.collision = new Collision(this);
        this.center = {x: this.w/2, y: this.h/2};

        this.dir = dir;

        this.maxSpeed = 20;
    }
    update() {
        if(this.maxSpeed < 0) {
            for(var i = 0; i < 50; i++){
                objects.push(new Smoke(this.pos.x, this.pos.y));
            }
            removeObject(this);
        }

            this.speed = {x: cos(this.dir)*this.maxSpeed, y: sin(this.dir)*this.maxSpeed};

            switch(this.collision.direction) {
                case 'right':
                case 'left':
                    this.speed.x *= -1;
                    break;
                
                case 'top':
                case 'bottom':
                    this.speed.y *= -1;
                    break;
            }

            this.pos.x += this.speed.x;
            this.pos.y += this.speed.y;

        this.maxSpeed -= 0.2;
    }
    draw() {
        push();
        translate(-this.center.x, -this.center.y);
        fill(255, 0, 255);
        rectMode(CORNER);
        rect(this.pos.x, this.pos.y, 32, 32);
        pop();
    }
}