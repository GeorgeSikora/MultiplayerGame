
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

  static idMap = [ 
    6,  9, 5, 15, 14,
    7, 10, 1, 13, 3,
    2,  8, 4, 12, 11
  ];

  constructor() {
    this.grass = loadTileset(tileset_dirt);
  }
}

function loadTileset(img) {
  var tileset = [16];

  // set default preview
  tileset[0] = img.get(1 * 32, 1 * 32, 32, 32);

  // load every tile to the array
  for(var i = 0; i < 15; i++) {
    // get position from index
    const x = i%(img.width/32);
    const y = floor((i*32)/img.width);
    // set the index to specific tile
    tileset[TileStructure.idMap[i]] = img.get(x * 32, y * 32, 32, 32);
  }
  return tileset;
}