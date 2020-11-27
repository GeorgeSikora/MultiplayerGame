
let tileStructure;
let hsize = 32;

class TileStructure {
    constructor() {
        //let TL = [], TR = [], BL = [], BR = [], island;

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

        this.createTile(3, 3, 3, 3, this.size, 0      );
        this.createTile(0, 2, 1, 4, 0,    this.size   );
        this.createTile(1, 0, 4, 2, this.size, this.size   );
        this.createTile(2, 4, 0, 1, 0,    this.size*2 );
        this.createTile(4, 1, 2, 0, this.size, this.size*2 );
    
        this.island = tileset_block.get(0, 0, this.size, this.size);
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
    TL = tileset_block.get(x, y, hsize, hsize);
    TR = tileset_block.get(x+hsize, y, hsize, hsize);
    BL = tileset_block.get(x, y+hsize, hsize, hsize);
    BR = tileset_block.get(x+hsize, y+hsize, hsize, hsize);
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