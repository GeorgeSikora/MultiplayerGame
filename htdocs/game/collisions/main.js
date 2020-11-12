
/* COLLISION */

let col = [];

class Collision {
  constructor(obj){

   this.obj = obj;

    this.pos = obj.pos;
    this.w = obj.w;
    this.h = obj.h;

    this.collidedX = false;
    this.collidedY = false;

    this.enable = true;
    this.static = false;
  }
}

function addCol(c) {
  col.push(c);
  return col[col.length-1];
}

function checkCollisions() {
  for (var i = 0; i < col.length; i++) {
    colider1 = col[i];

    if (colider1.obj == null) continue;
    if(colider1.static) continue;

    var shift = {x: 0, y: 0};
    colider1.colidedX = false;
    colider1.colidedY = false;

    for (var j = 0; j < col.length; j++) {
      var colider2 = col[j];
      if (colider1 == colider2) continue;

      var x1 = colider1.pos.x - colider1.obj.center.x, y1 = colider1.pos.y - colider1.obj.center.y, w1 = colider1.w, h1 = colider1.h;
      var x2 = colider2.pos.x - colider2.obj.center.x, y2 = colider2.pos.y - colider2.obj.center.y, w2 = colider2.w, h2 = colider2.h;

      if (x1 + w1 >= x2 && y1 + h1 >= y2 && x2 + w2 >= x1 && y2 + h2 >= y1) {

        var Xa = x1 + w1 - x2;
        var Xb = x2 + w2 - x1;

        var Ya = y1 + h1 - y2;
        var Yb = y2 + h2 - y1;

        var deltaX = Xa < Xb ? -Xa : Xb;
        var deltaY = Ya < Yb ? -Ya : Yb;

        if (abs(deltaX) > abs(deltaY)) {
            shift.y = deltaY;
            if(colider1.obj.speed != null) colider1.obj.speed.y = constrain(deltaY, -1, 1) * 80; // JELLLY
            if(colider1.obj.speed != null) colider1.obj.speed.y = 0;
            colider1.colidedY = true;
        } else {
            shift.x = deltaX; 
            if(colider1.obj.speed != null) colider1.obj.speed.x = constrain(deltaX, -1, 1) * 80; // JELLY
            if(colider1.obj.speed != null) colider1.obj.speed.x = 0;
            colider1.colidedX = true;
        }
      }
    }
    colider1.pos.x += shift.x;
    colider1.pos.y += shift.y;
  }
}

class Direction {
  constructor(){
    this.UP     = 1;
    this.DOWN   = 2;
    this.LEFT   = 3;
    this.RIGHT  = 4;
    this.NONE   = 0;
  }
}