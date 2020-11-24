/********** COLLISION FUNCTIONS **********/

class Collisions {
  // RECTANGLE/RECTANGLE
  rectRect(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h) {
    return (r1x + r1w >= r2x &&    // r1 right edge past r2 left
            r1x <= r2x + r2w &&    // r1 left edge past r2 right
            r1y + r1h >= r2y &&    // r1 top edge past r2 bottom
            r1y <= r2y + r2h);     // r1 bottom edge past r2 top
  }

  // LINE/RECTANGLE
  lineRect(x1, y1, x2, y2, rx, ry, rw, rh) {
    var left   = this.lineLine(x1,y1,x2,y2, rx,ry,rx, ry+rh);
    var right  = this.lineLine(x1,y1,x2,y2, rx+rw,ry, rx+rw,ry+rh);
    var top    = this.lineLine(x1,y1,x2,y2, rx,ry, rx+rw,ry);
    var bottom = this.lineLine(x1,y1,x2,y2, rx,ry+rh, rx+rw,ry+rh);
    return (left || right || top || bottom);
  }

  // LINE/LINE
  lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {
    var uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    var uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    return (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1);
  }
}

module.exports = new Collisions();