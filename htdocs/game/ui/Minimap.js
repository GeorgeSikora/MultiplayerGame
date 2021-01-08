
let minimap;

/* AUTOREFRESH
setInterval(() => {
    minimap.build();
}, 3000);
*/

class Minimap {
    constructor(){
        this.scale = 13;
        this.img = null;

        this.enable = true;

        this.opacity = 0;
        this.targetOpacity = 0;

        /* AUTOMATIC SCALE */
        this.autoScale = false;
        this.MAX_WIDTH = 400;
        this.MAX_HEIGHT = 300;
    }

    draw() {
        this.targetOpacity = this.enable ? 255 : 0;
        this.opacity += (this.targetOpacity - this.opacity) * 0.1;

        if(this.img == null || this.opacity < 1) return;
 
        push();
        
        /* position */
        translate(5, 5);

        tint(255, this.opacity);
        imageMode(CORNER);
            
        /* draw builded map */
        image(this.img, 0, 0);

        noStroke();
        rectMode(CENTER);
        translate(this.center.x, this.center.y);

        /* other players */
        for(var i = 0; i < players.length; i++){
            const p = players[i];
            var c = color(p.team)
            c.setAlpha(this.opacity);
            fill(c);
            rect(p.pos.x/this.scale, p.pos.y/this.scale, 64/this.scale, 64/this.scale);
        }
            
        /* my player */
        fill(255, 255, 0, this.opacity);
        rect(player.pos.x/this.scale, player.pos.y/this.scale, 64/this.scale, 64/this.scale);
        
        imageMode(CENTER);

        /* red flag */
        this.drawFlag('red');

        /* blue flag */
        this.drawFlag('blue');
        
        /* blue flag */
        this.drawFlag('green');
        
        /* blue flag */
        this.drawFlag('yellow');

        pop();
    }

    build() {

        // calc the border
        var left = 0, top = 0, right = 0, bottom = 0;
        for(var i = 0; i < objects.length; i++){

            const o = objects[i];
            const pos =  o.pos;

            if(pos.x - o.w < left)    left = pos.x - o.w;
            if(pos.x + o.w > right)   right = pos.x + o.w;
            if(pos.y - o.h < top)     top = pos.y - o.h;
            if(pos.y + o.h > bottom)  bottom = pos.y + o.h;
        }

        // calc width & height of map
        const map = {w: right - left, h: bottom - top};

        // if the map is empty
        if(map.w == 0 || map.h == 0) return;

        // automatic scaling, if turned on
        if(this.autoScale) {
            if(map.w > map.h) {
                this.scale = map.w/this.MAX_WIDTH;
            } else {
                this.scale = map.h/this.MAX_HEIGHT;
            }
        }

        // set the center shift of zero position x,y in map
        this.center = {x: -left/this.scale, y: -top/this.scale};

        // get scaled map dimensions
        const mapScaled = {w: map.w/this.scale, h: map.h/this.scale};

        // create image, where we will draw the stuff
        this.img = createGraphics(mapScaled.w, mapScaled.h);

        // center the stuff to drawing with the center point
        this.img.translate(this.center.x, this.center.y);

        // border weight and color
        this.img.imageMode(CENTER);
        this.img.rectMode(CENTER);
        this.img.strokeWeight(1);
        this.img.stroke(0);

        // objects and buildings
        for(var i = 0; i < objects.length; i++) {
            const o = objects[i];
            if(o instanceof Block) {
                this.img.fill('#564064');
                this.img.rect(o.pos.x/this.scale, o.pos.y/this.scale, o.w/this.scale, o.h/this.scale);
                //this.img.image(img_block, o.pos.x/this.scale, o.pos.y/this.scale, o.w/this.scale, o.h/this.scale);
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

        this.img.remove();
    }

    drawFlag(team) {
        const pos = this.getFlagPos(team);
        var c = color(team);
        c.setAlpha(this.opacity);
        tint(c);
        if(pos != null) image(img_flag_icon, pos.x/this.scale, pos.y/this.scale);
    }

    getFlagPos(team) {
        for(var i = 0; i < objects.length; i++) {
            const o = objects[i];

            if(o instanceof Flag) {
                if(o.captured) {
                    for(var p = 0; p < players.length; p++) {
                        /* some player has a flag */
                        if(players[p].capturedFlag == team) return players[p].pos;
                    }
                    if(player.capturedFlag == team) {
                        /* my player has a flag */
                        return player.pos;
                    }
                } else {
                    /* object is just standing flag */
                    if(o.team == team) return o.pos;
                }
            }
            if(o instanceof DroppedFlag) {
                /* flag is dropped somewhere */
                if(o.team == team) return o.pos;
            }
        }
        /* flag not found :( */
    }
}