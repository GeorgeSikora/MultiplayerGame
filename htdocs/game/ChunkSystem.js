
let chunkSystem;

class ChunkSystem {

    // LENGTH = only 1, 3(default), 5, 7, 9, 11, 13, 15 ... etc.
    static LENGTH = 3; // count of chunks side of grid ... 3 x 3

    constructor() {

        this.lastPos = {x: 0, y: 0};
        this.chunks = [];

        // Create chunks at specific positions
        for(var i = 0; i < ChunkSystem.LENGTH * ChunkSystem.LENGTH; i++) {
            const size = Chunk.SIZE; // chunk size
            const len = ChunkSystem.LENGTH; // length
            const halfLen = floor(len/2); // half length

            const x = i % len - halfLen;
            const y = floor(i / len) - halfLen;

            this.chunks[i] = new Chunk(x * size, y * size);
        }
    }

    update() {

        const pos = getGrid(cam.pos, Chunk.SIZE);

        if(pos.x != this.lastPos.x || pos.y != this.lastPos.y) {

            //const delta = {x: pos.x - this.lastPos.x, y: pos.y - this.lastPos.y};

            var move;

            for(var i = 0; i < this.chunks.length; i++) {
                
                const chunkDist = {x: pos.x - this.chunks[i].pos.x, y: pos.y - this.chunks[i].pos.y};
                var movedX = 0, movedY = 0;
                
                const size = Chunk.SIZE; // chunk size
                const len = ChunkSystem.LENGTH; // chunk length
                const halfLen = ceil(len/2); // half length

                if(chunkDist.x ==  halfLen * size) movedX =  1; // right side
                if(chunkDist.x == -halfLen * size) movedX = -1; // left side

                if(chunkDist.y ==  halfLen * size) movedY =  1; // bottom side
                if(chunkDist.y == -halfLen * size) movedY = -1; // top side
                
                if(movedX == 0 && movedY == 0) continue;
                move = {x: movedX, y: movedY};

                this.chunks[i].unload();

                this.chunks[i].pos.x += movedX * len * size;
                this.chunks[i].pos.y += movedY * len * size;

                this.chunks[i].load();
            }

            if(move == null) { // kamera byla teleportovana, nebo doslo k chybe
                //console.log('chunk move error');
            }
        }
        
        this.lastPos = pos;
        
        const chunksUpdateStart = millis();
        for(var i = 0; i < this.chunks.length; i++) {
            this.chunks[i].update();
        }
        //console.log('Chunks update: ' + (millis() - chunksUpdateStart).toFixed(2) + 'ms');

        var drawingChunks = 0;
        const chunksDrawStart = millis();
        for(var i = 0; i < this.chunks.length; i++) {
            var c = this.chunks[i];
            if(rectRect(cam.pos.x - width / cam.scale / 2, cam.pos.y - height / cam.scale /2, width / cam.scale, height / cam.scale, c.pos.x - Chunk.SIZE/2, c.pos.y - Chunk.SIZE/2, Chunk.SIZE, Chunk.SIZE)) {
                this.chunks[i].draw();
                drawingChunks ++;
            }
        }
        //console.log('redrawing no. of: ' + drawingChunks);
        //console.log('Chunks draw: ' + (millis() - chunksDrawStart).toFixed(2) + 'ms');
    }

    refresh() {
        // get the position of player in the chunks grid
        const pos = getGrid(cam.pos, Chunk.SIZE);

        // refresh positions and data of chunks
        for(var i = 0; i < this.chunks.length; i++) {
            const size = Chunk.SIZE; // chunk size
            const len = ChunkSystem.LENGTH; // chunk length
            const halfLen = floor(len/2); // half length
            // get pos by index
            const x = i % len - halfLen;
            const y = floor(i / len) - halfLen;
            // set pos of chunk
            this.chunks[i].pos.x = pos.x + x * size;
            this.chunks[i].pos.y = pos.y + y * size;
            // and refresh
            this.chunks[i].refresh();
        }
    }
}