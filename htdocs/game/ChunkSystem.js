

class Chunk {

    static SIZE = 2000;

    constructor(x, y) {
        this.pos = {x: x, y: y};
        this.texture = createGraphics(Chunk.SIZE, Chunk.SIZE);

        this.inProcess = false;
        this.refresh = false;
    }

    update() {
        if(this.refresh) {
            this.processStart = millis();

            //console.log('Refreshing...');

            this.refresh = false;
            this.inProcess = true;
            
            this.texture.clear();

            this.lastIndex = objects.length - 1;

            //console.log((millis() - this.processStart).toFixed(2) + 'ms clear');
        }

        if(this.inProcess) {

            const startTime = millis();

            this.texture.push();
            this.texture.translate(-this.pos.x + Chunk.SIZE/2, -this.pos.y + Chunk.SIZE/2);

            for (var i = this.lastIndex; i >= 0; i--) {
                const lapsedTime = millis() - startTime;
                if(i == 0) {
                    //console.log((millis() - this.processStart).toFixed(2) + 'ms complete refresh');
                    this.inProcess = false;
                }
                if(lapsedTime > 5) {
                    this.lastIndex = i;
                    break;
                }

                var obj = objects[i];

                if(obj.staticDraw) {
                    if(rectRect(obj.pos.x - obj.center.x, obj.pos.y - obj.center.y, obj.w, obj.h, this.pos.x - Chunk.SIZE/2, this.pos.y - Chunk.SIZE/2, Chunk.SIZE, Chunk.SIZE)) {
                        obj.draw(this.texture);
                    }
                }
            }

            this.texture.pop();
        }
    }

    draw() {
        // draw chunk
        image(this.texture, this.pos.x - Chunk.SIZE/2, this.pos.y - Chunk.SIZE/2);

        // draw chunk border
        /*
        noFill();
        stroke(255, 0, 255);
        rectMode(CORNER);
        rect(this.pos.x - Chunk.SIZE/2, this.pos.y - Chunk.SIZE/2, Chunk.SIZE, Chunk.SIZE);
        */
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
            console.log(delta.x, delta.y);

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
        console.log('Chunks update: ' + (millis() - chunksUpdateStart) + 'ms');

        const chunksDrawStart = millis();
        for(var i = 0; i < 9; i++) {
            this.chunks[i].draw();
        }
        //if(frameCount%60 == 1) console.log('Chunks draw: ' + (millis() - chunksDrawStart) + 'ms');
    }

    refresh() {
        for(var i = 0; i < 9; i++) {
            this.chunks[i].refresh = true;
        }
    }
}