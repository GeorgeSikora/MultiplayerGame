

class Tile {
    static SIZE = 32;
}

class Chunk {

    static SIZE = 960; // for 17 blocks per chunk .... 15 blocks = 960

    constructor(x, y) {
        this.pos = {x: x, y: y};
        this.texture = createGraphics(Chunk.SIZE, Chunk.SIZE);
        this.bufferTexture = createGraphics(Chunk.SIZE, Chunk.SIZE);

        this.inProcess = false;
        this.refresh = false;

        this.tileMap = [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,1,1,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,1,1,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ];

        /*
        this.tileMap = [];
        for(var x = 0; x < Chunk.SIZE/Tile.SIZE; x++){
            this.tileMap[x] = [];
            for(var y = 0; y < Chunk.SIZE/Tile.SIZE; y++){
                this.tileMap[x][y] = (x == 0) ? 1 : 0;
            }
        }
        */
    }

    update() {
        if(this.refresh) {
            this.processStart = millis();

            //console.log('Refreshing...');

            this.refresh = false;
            this.inProcess = true;
            
            //this.texture.clear();
            this.texture.image(tileBackground, 0, 0);

            this.lastIndex = objects.length - 1;

            //console.log((millis() - this.processStart).toFixed(2) + 'ms clear');
        }

        if(this.inProcess) {

            const startTime = millis();

            this.texture.push();
            this.texture.textAlign(CENTER, CENTER);
            this.texture.textSize(12);

            /* draw tilemap */

            for(var x = 0; x < Chunk.SIZE/Tile.SIZE; x++) {
                for(var y = 0; y < Chunk.SIZE/Tile.SIZE; y++) {
                    
                    if(this.tileMap[y][x] != 0) this.tileMap[y][x] = this.getAutoTile(x, y);

                    if(this.tileMap[y][x] != 0) {
                        
                        this.texture.fill(0, 255, 0);
                        this.texture.rect(x * Tile.SIZE, y * Tile.SIZE, Tile.SIZE, Tile.SIZE);

                        this.texture.fill(0);
                        this.texture.text(this.tileMap[y][x], x * Tile.SIZE + Tile.SIZE/2, y * Tile.SIZE + Tile.SIZE/2);
                    }
                }
            }

            this.texture.translate(-this.pos.x, -this.pos.y);
            this.texture.translate(Chunk.SIZE/2, Chunk.SIZE/2);

            //console.log(this.lastIndex);
            if(this.lastIndex == -1) {
                this.inProcess = false;
                this.bufferTexture.image(this.texture, 0, 0);
            }

            /* draw static Objects */
            for (var i = this.lastIndex; i >= 0; i--) {
                const lapsedTime = millis() - startTime;
                if(lapsedTime > 8) {
                    this.lastIndex = i;
                    break;
                }

                var obj = objects[i];

                if(obj.staticDraw) {
                    if(rectRect(obj.pos.x - obj.center.x, obj.pos.y - obj.center.y, obj.w, obj.h, this.pos.x - Chunk.SIZE/2, this.pos.y - Chunk.SIZE/2, Chunk.SIZE, Chunk.SIZE)) {
                        obj.draw(this.texture);
                    }
                }
                if(i == 0) {
                    //console.log((millis() - this.processStart).toFixed(2) + 'ms complete refresh');
                    this.inProcess = false;
                    this.bufferTexture.image(this.texture, 0, 0);
                }
            }


            this.texture.pop();
        }
    }

    draw() {
        // draw chunk
        image(this.bufferTexture, this.pos.x - Chunk.SIZE/2, this.pos.y - Chunk.SIZE/2);

        // draw chunk border
        
        noFill();
        stroke(255, 0, 255);
        rectMode(CORNER);
        rect(this.pos.x - Chunk.SIZE/2, this.pos.y - Chunk.SIZE/2, Chunk.SIZE, Chunk.SIZE);
    }

    getAutoTile(x, y) {

        if(this.wrongTileTestRemove(x, y)) {
            console.log('xdddasdioasiodasiod');
            return 0;
        }

        var TL = 0;
        var TR = 0;
        var BL = 0;
        var BR = 0;

        var z = 0;

        if (this.getTile(x, y - 1) == 1) {
            TL += 2;
            TR += 1;

            z += 1;
        }
        if (this.getTile(x, y + 1) == 1) {
            BL += 1;
            BR += 2;

            z += 2;
        }
        if (this.getTile(x - 1, y) == 1) {
            TL += 1;
            BL += 2;

            z += 3;
        }
        if (this.getTile(x + 1, y) == 1) {
            TR += 2;
            BR += 1;

            z += 4;
        }
        
        if (this.getTile(x - 1, y + 1) == 1 && this.getTile(x - 1, y - 1) == 1 && z == 6) z = 1;

        if (this.getTile(x + 1, y - 1) == 1 && z == 5) z = 2;

        if (this.getTile(x - 1, y - 1) != 1 && this.getTile(x + 1, y + 1) != 1 && z == 10) z = 11;
        if (this.getTile(x + 1, y - 1) != 1 && this.getTile(x - 1, y + 1) != 1 && z == 10) z = 12;

        if (this.getTile(x - 1, y - 1) != 1 && z == 10) z = 3;
        if (this.getTile(x + 1, y - 1) != 1 && z == 10) z = 13;
        if (this.getTile(x - 1, y + 1) != 1 && z == 10) z = 14;
        if (this.getTile(x + 1, y + 1) != 1 && z == 10) z = 15;


        if (this.getTile(x - 1, y - 1) == 1 && TL == 3) TL = 4;
        if (this.getTile(x + 1, y - 1) == 1 && TR == 3) TR = 4;
        if (this.getTile(x - 1, y + 1) == 1 && BL == 3) BL = 4;
        if (this.getTile(x + 1, y + 1) == 1 && BR == 3) BR = 4;
        

        //console.log(TL, TR, BL, BR);

        //return '' + (TL + TR*2 + BL*4 + BR*8);

        return z;
    }

    wrongTileTestRemove(x, y) {
        if ((this.getTile(x, y-1) == 0 && this.getTile(x, y+1) == 0) || 
            (this.getTile(x-1, y) == 0 && this.getTile(x+1, y) == 0) || 
            ((this.getTile(x-1, y-1) == 0 && this.getTile(x+1, y+1) == 0) &&
            (this.getTile(x-1, y+1) == 0 && this.getTile(x+1, y-1) == 0)))
        {
            return true;
        }
        
        var count = 0;
        for(var yy = -1; yy <= 1; yy++) {
            for(var xx = -1; xx <= 1; xx++) {
                if (this.getTile(x, y) == 1) count++;
                if(count >= 3) return false;
            }
        }
        
        return true;
    }

    getTile(x, y) {
        if(x >= 0 && y >= 0 && x < Chunk.SIZE/Tile.SIZE && y < Chunk.SIZE/Tile.SIZE) {
            if(this.tileMap[y][x] > 0) return 1; else return 0;
        } else {
            return 0;
        }
    }
}


let chunkSystem;

class ChunkSystem {
    constructor() {

        this.lastPos = {x: 0, y: 0};

        this.chunks = [];

        for(var i = 0; i < 9; i++) {
            const x = i%3 -1;
            const y = floor(i/3) -1;
            
            this.chunks[i] = new Chunk(x * Chunk.SIZE, y * Chunk.SIZE);
        }
    }

    update() {

        const pos = getGrid(cam.pos, Chunk.SIZE);

        if(pos.x != this.lastPos.x || pos.y != this.lastPos.y) {

            //const delta = {x: (pos.x - this.lastPos.x) / Chunk.SIZE, y: (pos.y - this.lastPos.y) / Chunk.SIZE};
            const delta = {x: pos.x - this.lastPos.x, y: pos.y - this.lastPos.y};

            for(var i = 0; i < 9; i++) {
                const x = i%3 -1;
                const y = floor(i/3) -1;

                if(this.chunks[i].pos.x == pos.x - Chunk.SIZE*2) {
                    this.chunks[i].pos.x += 3 * Chunk.SIZE;
                    this.chunks[i].refresh = true;
                }

                if(this.chunks[i].pos.x == pos.x + Chunk.SIZE*2) {
                    this.chunks[i].pos.x -= 3 * Chunk.SIZE;
                    this.chunks[i].refresh = true;
                }

                if(this.chunks[i].pos.y == pos.y - Chunk.SIZE*2) {
                    this.chunks[i].pos.y += 3 * Chunk.SIZE;
                    this.chunks[i].refresh = true;
                }

                if(this.chunks[i].pos.y == pos.y + Chunk.SIZE*2) {
                    this.chunks[i].pos.y -= 3 * Chunk.SIZE;
                    this.chunks[i].refresh = true;
                }
                
                // this.chunks[i].pos.x = pos.x + x * Chunk.SIZE;
                //this.chunks[i].pos.y = pos.y + y * Chunk.SIZE;
                
                //this.chunks[i].pos.x += delta.x * Chunk.SIZE;
                //this.chunks[i].pos.y += delta.y * Chunk.SIZE;

                //if(delta.x == x || delta.y == y) {
                //    this.chunks[i].refresh = true;
                //}
            }
        }
        
        this.lastPos = pos;
        
        const chunksUpdateStart = millis();
        for(var i = 0; i < 9; i++) {
            this.chunks[i].update();
        }
        if(millis() - chunksUpdateStart > 0.5)
        console.log('Chunks update: ' + (millis() - chunksUpdateStart).toFixed(2) + 'ms');

        const chunksDrawStart = millis();
        for(var i = 0; i < 9; i++) {
            this.chunks[i].draw();
        }
        //if(frameCount%60 == 1) console.log('Chunks draw: ' + (millis() - chunksDrawStart) + 'ms');
    }

    refresh() {
        
        const pos = getGrid(cam.pos, Chunk.SIZE);

        for(var i = 0; i < 9; i++) {
            
            const x = i%3 -1;
            const y = floor(i/3) -1;

            this.chunks[i].pos.x = pos.x + x * Chunk.SIZE;
            this.chunks[i].pos.y = pos.y + y * Chunk.SIZE;

            this.chunks[i].refresh = true;
        }
    }
}