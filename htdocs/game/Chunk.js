
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

        // go through only in process
        if(!this.inProcess) return;

        const processStartTime = millis();

        this.texture.push();
        this.texture.textAlign(CENTER, CENTER);
        this.texture.textSize(12);


        for(var x = 0; x < Chunk.SIZE/Tile.SIZE; x++) {
            for(var y = 0; y < Chunk.SIZE/Tile.SIZE; y++) {
                this.wrongTileTestRemove(x, y);
            }
        }

        /* draw tilemap */
        for(var x = 0; x < Chunk.SIZE/Tile.SIZE; x++) {
            for(var y = 0; y < Chunk.SIZE/Tile.SIZE; y++) {
                var tile = this.tileMap[y][x];
                if(tile == 0) continue;
                 
                tile = this.getAutoTile(x, y);

                if(tile == 0) continue;
                
                this.texture.image(tileStructure.grass[tile], x * Tile.SIZE, y * Tile.SIZE, Tile.SIZE, Tile.SIZE);
                
                if(game.constants.SHOW_TILE_ID) {
                    this.texture.fill(255, 127);
                    this.texture.rect(x * Tile.SIZE, y * Tile.SIZE, Tile.SIZE, Tile.SIZE);

                    this.texture.fill(0);
                    this.texture.text(tile, x * Tile.SIZE + Tile.SIZE/2, y * Tile.SIZE + Tile.SIZE/2);
                }

            }
        }

        this.texture.translate(-this.pos.x, -this.pos.y);
        this.texture.translate(Chunk.SIZE/2, Chunk.SIZE/2);

        //console.log(this.lastIndex);
        if(this.lastIndex == -1) {
            this.inProcess = false;
            this.bufferTexture.image(this.texture, 0, 0);
            console.log('Chunk update: ' + (millis() - this.refreshStartTime).toFixed(2) + 'ms');
            this.processEnd = millis();
        }

        /* draw static Objects */
        for (var i = this.lastIndex; i >= 0; i--) {
            const lapsedTime = millis() - processStartTime;
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
                //console.log('Chunk update: ' + (millis() - this.refreshStartTime).toFixed(2) + 'ms');
                this.inProcess = false;
                this.bufferTexture.image(this.texture, 0, 0);
                this.processEnd = millis();
            }
        }

        this.texture.pop();
    }

    draw() {
        const cx = this.pos.x - Chunk.SIZE/2;
        const cy = this.pos.y - Chunk.SIZE/2;

        image(this.bufferTexture, cx, cy);
        if(game.showChunksBorder) image(chunkBorder, cx, cy);
    }

    getAutoTile(x, y) {

        /*
        var TL = 0;
        var TR = 0;
        var BL = 0;
        var BR = 0;
        */

        var z = 0;

        if (this.getTile(x, y - 1) >= 1) {
            //TL += 2;
            //TR += 1;
            z += 1;
        }
        if (this.getTile(x, y + 1) >= 1) {
            //BL += 1;
            //BR += 2;
            z += 2;
        }
        if (this.getTile(x - 1, y) >= 1) {
            //TL += 1;
            //BL += 2;
            z += 3;
        }
        if (this.getTile(x + 1, y) >= 1) {
            //TR += 2;
            //BR += 1;
            z += 4;
        }
        
        if (this.getTile(x - 1, y + 1) != 0 && this.getTile(x - 1, y - 1) >= 1 && z == 6) z = 1;

        if (this.getTile(x + 1, y - 1) != 0 && this.getTile(x - 1, y + 1) == 0 && z == 5) z = 2; // TODO: OPRAVIT !

        if (this.getTile(x - 1, y - 1) == 0 && this.getTile(x + 1, y + 1) == 0 && z == 10) z = 11;
        if (this.getTile(x + 1, y - 1) == 0 && this.getTile(x - 1, y + 1) == 0 && z == 10) z = 12;

        if (this.getTile(x - 1, y - 1) == 0 && z == 10) z = 3;
        if (this.getTile(x + 1, y - 1) == 0 && z == 10) z = 13;
        if (this.getTile(x - 1, y + 1) == 0 && z == 10) z = 14;
        if (this.getTile(x + 1, y + 1) == 0 && z == 10) z = 15;

        /*
        if (this.getTile(x - 1, y - 1) >= 1 && TL == 3) TL = 4;
        if (this.getTile(x + 1, y - 1) >= 1 && TR == 3) TR = 4;
        if (this.getTile(x - 1, y + 1) >= 1 && BL == 3) BL = 4;
        if (this.getTile(x + 1, y + 1) >= 1 && BR == 3) BR = 4;
        */
        
        //console.log(TL, TR, BL, BR);

        return z;
    }

    wrongTileTestRemove(x, y) {

        return;
        
        var tile = this.tileMap[y][x];

        if(tile == 0) {
            if ((this.getTile(x, y-1) != 0 && this.getTile(x, y+1) != 0) || (this.getTile(x-1, y) != 0 && this.getTile(x+1, y) != 0)) {
                this.tileMap[y][x] = 1;
                return;
            }
        } else {
            if ((this.getTile(x, y-1) == 0 && this.getTile(x, y+1) == 0) || (this.getTile(x-1, y) == 0 && this.getTile(x+1, y) == 0)) {
                this.tileMap[y][x] = 0;
                return;
            }
            if((this.getTile(x, y-1) == 0 && this.getTile(x-1, y) == 0 && this.getTile(x+1, y) != 0 && this.getTile(x, y+1) != 0) ||
               (this.getTile(x, y-1) != 0 && this.getTile(x-1, y) != 0 && this.getTile(x+1, y) == 0 && this.getTile(x, y+1) == 0)) {
                //this.tileMap[y][x] = 0;
                return;
            }
        }

        /*
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
        */
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

            for(var i = 0; i < chunkSystem.chunks.length; i++) {
                const c = chunkSystem.chunks[i];
                if(c.pos.x == chunkPos.x && c.pos.y == chunkPos.y) {
                    return c.tileMap[y][x];
                }
            }

            return 0;
        }
    }

    refresh() {
        this.refreshStartTime = millis();
        this.inProcess = true;
        
        //this.texture.clear();
        this.texture.image(tileBackground, 0, 0);

        this.lastIndex = objects.length - 1;
    }

    load() {

        socket.emit('get-chunk', this.pos.x/Chunk.SIZE, this.pos.y/Chunk.SIZE);

        //console.log('Loading chunk x' + this.pos.x/Chunk.SIZE + ' y' + this.pos.y/Chunk.SIZE);

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
        //console.log('Saving chunk x' + this.pos.x/Chunk.SIZE + ' y' + this.pos.y/Chunk.SIZE);
    }
}
