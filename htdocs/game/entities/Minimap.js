
let minimap;

class Minimap {
    constructor(){
        this.scale = 13;
        this.img = null;

        this.enable = true;

        this.opacity = 0;
        this.targetOpacity = 0;
    }

    draw(){
        this.targetOpacity = this.enable ? 255 : 0;
        this.opacity += (this.targetOpacity - this.opacity) * 0.1;

        if(this.img == null) return;

        push();
        
        /* POSITION */
        translate(this.img.width/2 +5, this.img.height/2 +5);

        tint(255, this.opacity);
        imageMode(CENTER);
            
        /* draw builded map */
        image(this.img, 0, 0);

        noStroke();
        rectMode(CENTER);

        /* other players */
        for(var i = 0; i < players.length; i++){
            const p = players[i];
            var c = color(p.team)
            c.setAlpha(this.opacity);
            fill(c);
            rect(p.pos.x/this.scale, p.pos.y/this.scale, 6, 6);
        }
            
        /* my player */
        fill(255, 255, 0, this.opacity);
        rect(player.pos.x/this.scale, player.pos.y/this.scale, 6, 6);

        /* red flag */
        const posRed = this.getFlagPos('red');
        var c = color('red');
        c.setAlpha(this.opacity);
        tint(c);
        if(posRed != null) image(img_flag_icon, posRed.x/this.scale, posRed.y/this.scale);

        /* blue flag */
        const posBlue = this.getFlagPos('blue');
        var c = color('blue');
        c.setAlpha(this.opacity);
        tint(c);
        if(posBlue != null) image(img_flag_icon, posBlue.x/this.scale, posBlue.y/this.scale);

        pop();
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
        
        this.img = createGraphics(map.w/this.scale, map.h/this.scale);

        this.img.push();

        this.img.translate(-left/this.scale, -top/this.scale);
        this.img.strokeWeight(1);
        this.img.stroke(0);

        // objects and buildings
        for(var i = 0; i < objects.length; i++){
            const o = objects[i];
            if(o instanceof Block) {
                this.img.rectMode(CENTER);
                this.img.fill('#564064');
                this.img.rect(o.pos.x/this.scale, o.pos.y/this.scale, o.w/this.scale, o.h/this.scale);
            }
        }

        // teams spawn
        const spawnRed  = {x: -2000, y: 0};
        const spawnBlue = {x:  2000, y: 0};

        spawnRed.x  /= this.scale;
        spawnRed.y  /= this.scale;
        spawnBlue.x /= this.scale;
        spawnBlue.y /= this.scale;
       
        this.img.fill('red');
        this.img.ellipse(spawnRed.x, spawnRed.y, 6, 6);
        
        this.img.fill('blue');
        this.img.ellipse(spawnBlue.x, spawnBlue.y, 6, 6);

        this.img.pop();
    }

    getFlagPos(team){
        for(var i = 0; i < objects.length; i++){
            const o = objects[i];
            if(o instanceof Flag) {
                if(o.captured) {
                    for(var p = 0; p < players.length; p++){
                        if(players[p].capturedFlag == team) {
                            return players[p].pos;
                        }
                    }
                    if(player.capturedFlag == team){
                        return player.pos;
                    }
                } else {
                    if(o.team == team) {
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