

class Bullet extends GameObject {
    constructor(shooterID, pos, speed) {
        super(pos.x, pos.y, 10, 10);
        this.shooterID = shooterID;
        this.speed = speed;
    }
    update(){
        if(this.pos.x < -10000 || this.pos.x > 10000 || this.pos.y < -10000 || this.pos.y > 10000) {
            removeObject(this);
        }
        var move = {x:0, y:0};
        move.x = this.speed.x * deltaTime;
        move.y = this.speed.y * deltaTime;

        for(var i = 0; i < players.length; i++){
            const p = players[i];

            if(p.id == this.shooterID) continue;

            if(lineRect(this.pos.x, this.pos.y, this.pos.x+move.x, this.pos.y+move.y, p.pos.x-p.w/2, p.pos.y-p.h/2, p.w, p.h)){
                console.log('%c You hit! '+ p.name, 'color: pink');
                removeObject(this);
            }
        }

        if(player.id != this.shooterID) {
            if(lineRect(this.pos.x, this.pos.y, this.pos.x+move.x, this.pos.y+move.y, player.pos.x-player.w/2, player.pos.y-player.h/2, player.w, player.h)){
                console.log('%c Someone hit you!', 'color: pink');
                removeObject(this);
            }
        }
        /*
        for(var i = 0; i < objects.length; i++){
            var obj = objects[i];
            if(obj.constructor.name == 'Bullet') continue;
            if(lineRect(this.pos.x, this.pos.y, this.pos.x+move.x, this.pos.y+move.y, obj.pos.x-obj.w/2, obj.pos.y-obj.h/2, obj.w, obj.h)){
                removeObject(this);
            }
        }
        */

        this.pos.x += move.x;
        this.pos.y += move.y;
    }
    draw(){
        push();
        translate(this.pos.x, this.pos.y);
        rotate(atan2(this.speed.y,this.speed.x));
        fill(255,255,0);
        rect(-this.w/2,-this.h/2, this.w, this.h);
        pop();
    }
}