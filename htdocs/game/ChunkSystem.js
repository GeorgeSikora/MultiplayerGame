

class Tile {
    static SIZE = 32;
}

class Chunk {

    static SIZE = 960; // for 17 blocks per chunk .... 15 blocks = 960

    constructor(x, y) {
        this.pos = {x: x, y: y};
        this.texture = createGraphics(Chunk.SIZE, Chunk.SIZE);
        this.bufferTexture = createGraphics(Chunk.SIZE, Chunk.SIZE);

        this.loaded = false;

        this.inProcess = false;
        this.refresh = false;

        /*
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
        */

        this.tileMap = [];
        for(var x = 0; x < Chunk.SIZE/Tile.SIZE; x++){
            this.tileMap[x] = [];
            for(var y = 0; y < Chunk.SIZE/Tile.SIZE; y++){
                this.tileMap[x][y] = 0;
            }
        }
    }

    update() {
        if(this.refresh) {
            this.processStart = millis();

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
                        
                        //this.texture.fill(0, 255, 0);
                        //this.texture.rect(x * Tile.SIZE, y * Tile.SIZE, Tile.SIZE, Tile.SIZE);
                        this.texture.image(tileStructure.grass[this.tileMap[y][x]], x * Tile.SIZE, y * Tile.SIZE, Tile.SIZE, Tile.SIZE)

                        //this.texture.fill(0);
                        //this.texture.text(this.tileMap[y][x], x * Tile.SIZE + Tile.SIZE/2, y * Tile.SIZE + Tile.SIZE/2);
                    }
                }
            }

            this.texture.translate(-this.pos.x, -this.pos.y);
            this.texture.translate(Chunk.SIZE/2, Chunk.SIZE/2);

            //console.log(this.lastIndex);
            if(this.lastIndex == -1) {
                this.inProcess = false;
                this.bufferTexture.image(this.texture, 0, 0);
                console.log('Chunk update: ' + (millis() - this.processStart).toFixed(2) + 'ms');
                this.processEnd = millis();
            }

            /* draw static Objects */
            for (var i = this.lastIndex; i >= 0; i--) {
                const lapsedTime = millis() - startTime;
                if(lapsedTime > 5000) {
                    this.lastIndex = i;
                    break;
                }

                var obj = objects[i];

                if(obj == null) continue;

                if(obj.staticDraw != null) {
                    if(rectRect(obj.pos.x - obj.center.x, obj.pos.y - obj.center.y, obj.w, obj.h, this.pos.x - Chunk.SIZE/2, this.pos.y - Chunk.SIZE/2, Chunk.SIZE, Chunk.SIZE)) {
                        obj.draw(this.texture);
                    }
                }
                if(i == 0) {
                    //console.log((millis() - this.processStart).toFixed(2) + 'ms complete refresh');
                    this.inProcess = false;
                    this.bufferTexture.image(this.texture, 0, 0);
                    console.log('Chunk update: ' + (millis() - this.processStart).toFixed(2) + 'ms');
                    this.processEnd = millis();
                }
            }

            this.texture.pop();
        }
    }

    draw() {
        const cx = this.pos.x - Chunk.SIZE/2;
        const cy = this.pos.y - Chunk.SIZE/2;

        image(this.bufferTexture, cx, cy);
        if(game.showChunksBorder) image(chunkBorder, cx, cy);
    }

    getAutoTile(x, y) {

        if(this.wrongTileTestRemove(x, y)) {
            return 0;
        }

        var TL = 0;
        var TR = 0;
        var BL = 0;
        var BR = 0;

        var z = 0;

        if (this.getTile(x, y - 1) >= 1) {
            TL += 2;
            TR += 1;

            z += 1;
        }
        if (this.getTile(x, y + 1) >= 1) {
            BL += 1;
            BR += 2;

            z += 2;
        }
        if (this.getTile(x - 1, y) >= 1) {
            TL += 1;
            BL += 2;

            z += 3;
        }
        if (this.getTile(x + 1, y) >= 1) {
            TR += 2;
            BR += 1;

            z += 4;
        }
        
        if (this.getTile(x - 1, y + 1) >= 1 && this.getTile(x - 1, y - 1) >= 1 && z == 6) z = 1;

        if (this.getTile(x + 1, y - 1) >= 1 && z == 5) z = 2;

        if (this.getTile(x - 1, y - 1) == 0 && this.getTile(x + 1, y + 1) == 0 && z == 10) z = 11;
        if (this.getTile(x + 1, y - 1) == 0 && this.getTile(x - 1, y + 1) == 0 && z == 10) z = 12;

        if (this.getTile(x - 1, y - 1) == 0 && z == 10) z = 3;
        if (this.getTile(x + 1, y - 1) == 0 && z == 10) z = 13;
        if (this.getTile(x - 1, y + 1) == 0 && z == 10) z = 14;
        if (this.getTile(x + 1, y + 1) == 0 && z == 10) z = 15;


        if (this.getTile(x - 1, y - 1) >= 1 && TL == 3) TL = 4;
        if (this.getTile(x + 1, y - 1) >= 1 && TR == 3) TR = 4;
        if (this.getTile(x - 1, y + 1) >= 1 && BL == 3) BL = 4;
        if (this.getTile(x + 1, y + 1) >= 1 && BR == 3) BR = 4;
        

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

        const TILES = Chunk.SIZE/Tile.SIZE;
        
        if(x >= 0 && y >= 0 && x < TILES && y < TILES) {
            // load from this actual chunk
            if(this.tileMap[y][x] > 0) return 1; else return 0;
        } else {
            // load from neighboring chunk

            var chunkPos = {x: this.pos.x, y: this.pos.y};

            if (x <      0) {chunkPos.x -= Chunk.SIZE; x += TILES;}
            if (y <      0) {chunkPos.y -= Chunk.SIZE; y += TILES;}
            if (x >= TILES) {chunkPos.x += Chunk.SIZE; x -= TILES;}
            if (y >= TILES) {chunkPos.y += Chunk.SIZE; y -= TILES;}

            for(var i = 0; i < 9; i++) {
                const c = chunkSystem.chunks[i];
                if(c.pos.x == chunkPos.x && c.pos.y == chunkPos.y) {
                    return c.tileMap[y][x];
                }
            }

            return 0;
        }
    }

    load() {

        socket.emit('get-chunk', this.pos.x/Chunk.SIZE, this.pos.y/Chunk.SIZE);

        console.log('Loading chunk x' + this.pos.x/Chunk.SIZE + ' y' + this.pos.y/Chunk.SIZE);

        /*
        for(var x = 0; x < Chunk.SIZE/Tile.SIZE; x++){
            for(var y = 0; y < Chunk.SIZE/Tile.SIZE; y++){
                this.tileMap[y][x];
            }
        }
        */
    }

    unload() {
        this.save();
        this.loaded = false;
    }

    save() {
        console.log('Saving chunk x' + this.pos.x/Chunk.SIZE + ' y' + this.pos.y/Chunk.SIZE);
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

            var move;

            for(var i = 0; i < 9; i++) {
                const chunkDist = {x: pos.x - this.chunks[i].pos.x, y: pos.y - this.chunks[i].pos.y};
                var movedX = 0, movedY = 0;

                if(chunkDist.x ==  2 * Chunk.SIZE) movedX =  1;
                if(chunkDist.x == -2 * Chunk.SIZE) movedX = -1;

                if(chunkDist.y ==  2 * Chunk.SIZE) movedY =  1;
                if(chunkDist.y == -2 * Chunk.SIZE) movedY = -1;
                
                if(movedX == 0 && movedY == 0) continue;
                move = {x: movedX, y: movedY};

                this.chunks[i].unload();

                this.chunks[i].pos.x += movedX * 3 * Chunk.SIZE;
                this.chunks[i].pos.y += movedY * 3 * Chunk.SIZE;

                this.chunks[i].load();
            }
            /*
            if(move == null) {
                //console.log('ERROR: chunks not moved!!!');
                return;
            }
            */
            
            /*
            for(var i = 0; i < 9; i++) {
                const c = this.chunks[i];
                const chunkDist = {x: pos.x - c.pos.x, y: pos.y - c.pos.y};

                if(move.x != 0) {
                    if(pos.x == c.pos.x) {

                        var column = move.x == 1 ? Chunk.SIZE/Tile.SIZE-1 : 0;
                        console.log('x !!!', c.pos.x, c.pos.y);

                        for(var y = 0; y < Chunk.SIZE/Tile.SIZE; y++) {
                            console.log(column, y);
                            //c.tileMap[y][column] = c.getAutoTile(column, y);
                        }
                        c.refresh = true;
                        //c.refreshChunk(false);
                    }
                }

                if(move.y != 0) {
                    if(pos.y == c.pos.y) {
                        var row = move.y == 1 ? Chunk.SIZE/Tile.SIZE-1 : 0;
                        console.log('y !!!', c.pos.x, c.pos.y);

                        for(var x = 0; x < Chunk.SIZE/Tile.SIZE; x++) {
                            console.log(x, row);
                            //c.tileMap[row][x] = c.getAutoTile(x, row);
                        }
                        c.refresh = true;
                    }
                }
            }
            */
        }
        
        this.lastPos = pos;
        
        const chunksUpdateStart = millis();
        for(var i = 0; i < 9; i++) {
            this.chunks[i].update();
        }
        //console.log('Chunks update: ' + (millis() - chunksUpdateStart).toFixed(2) + 'ms');

        const chunksDrawStart = millis();
        for(var i = 0; i < 9; i++) {
            this.chunks[i].draw();
        }
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