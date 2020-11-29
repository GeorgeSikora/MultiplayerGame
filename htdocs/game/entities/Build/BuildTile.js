
class BuildTile extends Build {

    constructor(){
        super('tile', tileStructure.grass[10]);
        this.center = {x: 24, y: 24};

        this.GRID_SIZE = 32;
        //this.GRID_SHIFT = {x: -24, y: -24};
        this.PLACE_SIZE = {x: 48, y: 48};
    }
    use(obj) {
        if(this.lastGrid.x != this.grid.x || this.lastGrid.y != this.grid.y || this.lastButton != mouseButton){
          
            this.lastGrid = this.grid;
            this.lastButton = mouseButton;

            if(mouseButton == LEFT) {
              this.setTiles(1);
            }
            if(mouseButton == RIGHT) {
              this.setTiles(0);
            }
            /*
            for(var i = 0; i < 9; i++) {
              const c = chunkSystem.chunks[i];
              if(this.grid.x > c.pos.x - Chunk.SIZE/2 && this.grid.y > c.pos.y - Chunk.SIZE/2 && this.grid.x <= c.pos.x - Chunk.SIZE/2 + Chunk.SIZE && this.grid.y <= c.pos.y - Chunk.SIZE/2 + Chunk.SIZE) {
                const tile = {x: (this.grid.x - c.pos.x)/Tile.SIZE + Chunk.SIZE/Tile.SIZE/2 -1, y: (this.grid.y - c.pos.y)/Tile.SIZE + Chunk.SIZE/Tile.SIZE/2 -1};
                
                c.tileMap[tile.y][tile.x] = (c.tileMap[tile.y][tile.x] == 0) ? 1 : 0;
              }
            }
            */

            this.shake.x = cos(obj.rotation)*16;
            this.shake.y = sin(obj.rotation)*16;
        }
    }

    setTiles(state){
      this.setTile(this.grid.x,    this.grid.y,    state);
      this.setTile(this.grid.x,    this.grid.y+32, state);
      this.setTile(this.grid.x+32, this.grid.y,    state);
      this.setTile(this.grid.x+32, this.grid.y+32, state);
    }

    setTile(x, y, state) {
      for(var i = 0; i < 9; i++) {
        const c = chunkSystem.chunks[i];
        if(x > c.pos.x - Chunk.SIZE/2 && y > c.pos.y - Chunk.SIZE/2 && x <= c.pos.x - Chunk.SIZE/2 + Chunk.SIZE && y <= c.pos.y - Chunk.SIZE/2 + Chunk.SIZE) {
          const tile = {x: (x - c.pos.x)/Tile.SIZE + Chunk.SIZE/Tile.SIZE/2 -1, y: (y - c.pos.y)/Tile.SIZE + Chunk.SIZE/Tile.SIZE/2 -1};
          c.tileMap[tile.y][tile.x] = state;
          c.refresh = true;
          return;
        }
      }
    }
}