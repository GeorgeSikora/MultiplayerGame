

class Block extends GameObject {
    constructor(x, y){
        super(x, y, 64, 64);
        this.collision = new Collision(this);
        this.collision.static = true;
        this.center = {x: this.w/2, y: this.h/2};

        this.TL = 0;
        this.TR = 0;
        this.BL = 0;
        this.BR = 0;

        this.texture = null;
        this.staticDraw = true;
    }
    update(){
        
    }
    draw(g){
        //this.layer = this.pos.y - player.h - this.h;
        //g.tint(255);
        //image(tileStructure.island, this.pos.x -this.w/2, this.pos.y -this.h/2);

        /*
        if(this.texture != null) {
            image(this.texture, this.pos.x -this.w/2, this.pos.y -this.h/2);
        }
        */

        if (this.TL==0 && this.TR==0 && this.BL==0 && this.BR==0) {
            g.image(tileStructure.island, this.pos.x-hsize, this.pos.y-hsize);
        } else {
            g.image(tileStructure.TL[this.TL], this.pos.x-hsize, this.pos.y-hsize);
            g.image(tileStructure.TR[this.TR], this.pos.x, this.pos.y-hsize);
            g.image(tileStructure.BL[this.BL], this.pos.x-hsize, this.pos.y);
            g.image(tileStructure.BR[this.BR], this.pos.x, this.pos.y);
        }
        
    }

    autoTile() {
        const size = 64;

        this.TL = 0;
        this.TR = 0;
        this.BL = 0;
        this.BR = 0;

        if (getTile(this.pos.x, this.pos.y-size) == 1) {
            this.TL+=2;
            this.TR+=1;
        }
        if (getTile(this.pos.x, this.pos.y+size) == 1) {
            this.BL+=1;
            this.BR+=2;
        }
        if (getTile(this.pos.x-size, this.pos.y) == 1) {
            this.TL+=1;
            this.BL+=2;
        }
        if (getTile(this.pos.x+size, this.pos.y) == 1) {
            this.TR+=2;
            this.BR+=1;
        }

        if (getTile(this.pos.x-size, this.pos.y-size) == 1 && this.TL==3) this.TL=4;
        if (getTile(this.pos.x+size, this.pos.y-size) == 1 && this.TR==3) this.TR=4;
        if (getTile(this.pos.x-size, this.pos.y+size) == 1 && this.BL==3) this.BL=4;
        if (getTile(this.pos.x+size, this.pos.y+size) == 1 && this.BR==3) this.BR=4;

        /*
        var buff = createGraphics(64, 64);

        if (this.TL==0 && this.TR==0 && this.BL==0 && this.BR==0) {
            buff.image(tileStructure.island, 0, 0);
        } else {
            buff.image(tileStructure.TL[this.TL], 0, 0);
            buff.image(tileStructure.TR[this.TR], hsize, 0);
            buff.image(tileStructure.BL[this.BL], 0, hsize);
            buff.image(tileStructure.BR[this.BR], hsize, hsize);
        }
        this.texture = buff;
        buff.remove();
        */
    }
}

function getTile(x, y) {
    for(var i = 0; i < objects.length; i++) {
        if(objects[i].constructor.name == 'Block') {
            //console.log('yes!');
            const pos = objects[i].pos;
            if(pos.x == x && pos.y == y){
                return 1;
            }
        }
    }
    return 0;
}