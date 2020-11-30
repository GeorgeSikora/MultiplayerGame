
let tileStructure, tileBackground, chunkBorder;
let hsize = 32; // half size

function loadTiles() {
  tileStructure = new TileStructure();

  chunkBorder = createGraphics(Chunk.SIZE, Chunk.SIZE);
  chunkBorder.noFill();
  chunkBorder.strokeWeight(2);
  chunkBorder.stroke(255, 0, 255);
  chunkBorder.rect(0, 0, Chunk.SIZE, Chunk.SIZE);

  tileBackground = createGraphics(Chunk.SIZE, Chunk.SIZE);

  for(var y = 0; y < Chunk.SIZE; y += 32) {
    for(var x = 0; x < Chunk.SIZE; x += 32) {
      tileBackground.image(tileset_background, x, y);
    }
  }
}

class TileStructure {
    constructor() {
        //let TL = [], TR = [], BL = [], BR = [], island;

      this.grassStructure = [ 6, 9, 5, 15, 14,
                              7, 10, 1, 13, 3,
                              2, 8, 4, 12, 11];
      this.grass = [16];

      const tileset = tileset_dirt;
      console.log(tileset.width, tileset.height);

      for(var i = 0; i < 15; i++) {
        const x = i%(tileset.width/32);
        const y = floor((i*32)/tileset.width);

        //console.log(x, y);

        this.grass[ this.grassStructure[i]] = tileset.get(x*32, y*32, 32, 32);
      }


        this.TL = [];
        this.TR = [];
        this.BL = [];
        this.BR = [];

        this.size = 64;
        
        /*
        TL = new PImage[5];
        TR = new PImage[5];
        BL = new PImage[5];
        BR = new PImage[5];
        */

        this.createTile(3, 3, 3, 3, this.size, 0           );
        this.createTile(0, 2, 1, 4, 0,    this.size        );
        this.createTile(1, 0, 4, 2, this.size, this.size   );
        this.createTile(2, 4, 0, 1, 0,    this.size*2      );
        this.createTile(4, 1, 2, 0, this.size, this.size*2 );
    
        this.island = tileset_grass.get(0, 0, this.size, this.size);
    }

    createTile(TL_ID, TR_ID, BL_ID, BR_ID, x, y) {
      var t = cutTile(x, y);
      this.TL[TL_ID] = t[0];
      this.TR[TR_ID] = t[1];
      this.BL[BL_ID] = t[2];
      this.BR[BR_ID] = t[3];
    }
}

function cutTile(x, y) {
    var TL, TR, BL, BR;
    TL = tileset_grass.get(x, y, hsize, hsize);
    TR = tileset_grass.get(x+hsize, y, hsize, hsize);
    BL = tileset_grass.get(x, y+hsize, hsize, hsize);
    BR = tileset_grass.get(x+hsize, y+hsize, hsize, hsize);
    return [TL, TR, BL, BR];
  }
/*
  setInterval(() => {
    for(var i = 0; i < objects.length; i++) {
        if(objects[i].constructor.name == 'Block') {
          objects[i].autoTile();
        }
      }
  }, 30000);
  */