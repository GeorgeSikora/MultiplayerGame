
let minimap;

class Minimap {
    constructor(){
        this.scale = 12;
        this.img = null;
    }
    draw(){
        if(this.img != null) {
            push();
            tint(255);
            imageMode(CENTER);
            translate(width/2, this.img.height/2);

            image(this.img, 0, 0);

            const posRed = this.getFlagPos('red');
            tint('red');
            if(posRed != null) image(img_flag_icon, posRed.x/this.scale, posRed.y/this.scale);

            const posBlue = this.getFlagPos('blue');
            tint('blue');
            if(posBlue != null) image(img_flag_icon, posBlue.x/this.scale, posBlue.y/this.scale);

            pop();
        }
    }
    build(){
        var left = 0, top = 0, right = 0, bottom = 0;
        for(var i = 0; i < objects.length; i++){
            const o = objects[i];
            const pos =  o.pos;
            if(pos.x - o.w < left)    left = pos.x - o.w;
            if(pos.x + o.w > right)   right = pos.x + o.w;
            if(pos.y - o.h < top)     top = pos.y - o.h;
            if(pos.y + o.h > bottom)  bottom = pos.y + o.h;
        }
        const map = {w: right - left, h: bottom - top};

        console.log(left,right,top,bottom);
        console.log(map.w/this.scale, map.h/this.scale);
        
        this.img = createGraphics(map.w/this.scale, map.h/this.scale);
        this.img.push();
        this.img.translate(-left/this.scale, -top/this.scale);

        this.img.strokeWeight(1);
        this.img.stroke(0);

        for(var i = 0; i < objects.length; i++){
            const o = objects[i];
            if(o instanceof Block) {
                this.img.rectMode(CENTER);
                this.img.fill('#564064');
                this.img.rect(o.pos.x/this.scale, o.pos.y/this.scale, o.w/this.scale, o.h/this.scale);
            }
        }

        // draw spawns
        const spawnRed  = {x: -2000, y: 0};
        const spawnBlue = {x:  2000, y: 0};

        spawnRed.x /= this.scale;
        spawnRed.y /= this.scale;
        spawnBlue.x /= this.scale;
        spawnBlue.y /= this.scale;

        this.img.fill('red');
        this.img.rect(spawnRed.x, spawnRed.y, 10, 10);
        
        this.img.fill('blue');
        this.img.rect(spawnBlue.x, spawnBlue.y, 10, 10);

        this.img.pop();
    }
    getFlagPos(team){
        for(var i = 0; i < objects.length; i++){
            const o = objects[i];
            if(o instanceof Flag) {
                if(o.captured) {
                    for(var p = 0; p < players.length; p++){
                        if(players[p].capturedFlag == team) {
                            console.log(players[p].pos);
                            return players[p].pos;
                        }
                    }
                    if(player.capturedFlag == team){
                        return player.pos;
                    }
                } else {
                    if(o.team == team) {
                        console.log(o.pos);
                        return o.pos;
                    }
                }
            }
            if(o instanceof DroppedFlag) {
                if(o.team == team) return o.pos;
            }
        }
    }
}