
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

    this.center = {x: 32, y: 32};

    this.direction = 'none';
  }

  collideRect(entity) {
    //if (!entity.enable) return false;
    //checkRectCollision(); // check onGround ... for platform games
  
    var dx = (this.pos.x + this.w / 2.0 + this.center.x) - (entity.pos.x + entity.w / 2.0 + entity.center.x);
    var dy = (this.pos.y + this.h / 2.0 + this.center.y) - (entity.pos.y + entity.h / 2.0 + entity.center.y);
  
    var combined = {x: 0, y: 0};
    combined.x = this.w/2.0 + entity.w/2.0;
    combined.y = this.h/2.0 + entity.h/2.0;
  
    if (abs(dx) < combined.x) {
      if (abs(dy) < combined.y) {
        var overlap = {x: 0, y: 0};
        overlap.x = combined.x - abs(dx);
        overlap.y = combined.y - abs(dy);

        if (overlap.x >= overlap.y) {

          this.collidedY = true;
          entity.collidedY = true;
          // this.obj.speed.y = 0;

          if (dy > 0) {
            //this.collision = Direction.UP;
            this.pos.y += overlap.y;
          } else {
            //this.collision = Direction.DOWN;
            this.pos.y -= overlap.y;
          }
        } else {
          this.collidedX = true;
          entity.collidedX = true;
          //this.obj.speed.x = 0;

          this.obj.speed.x = 0;
          if (dx > 0) {
            //this.collision = Direction.LEFT;
            this.pos.x += overlap.x;
          } else {
            //this.collision = Direction.RIGHT;
            this.pos.x -= overlap.x;
          }
        }
      } else {
        //this.collision = Direction.NONE;
        this.collidedX = false;
        this.collidedY = false;
      }
    } else {
      //this.collision = Direction.NONE;
      this.collidedX = false;
      this.collidedY = false;
    }
    return false;
  }
}

function addCol(c) {
  col.push(c);
  return col[col.length-1];
}

function checkCollisions() {
  for (var i = 0; i < objects.length; i++) {
    var colider1 = objects[i].collision;

    if(colider1 == null) continue;

    if (colider1.obj == null) continue;
    if(colider1.static) continue;

    var shift = {x: 0, y: 0};
    colider1.colidedX = false;
    colider1.colidedY = false;
  
    checkCollisionsWith(colider1);
    //colider1.pos.x += shift.x;
    //colider1.pos.y += shift.y;
  }
  checkCollisionsWith(player);
}
function checkCollisionsWith(colider1){
for (var j = 0; j < objects.length; j++) {
  var colider2 = objects[j].collision;
  if (colider2 == null) continue;
  if (colider1 == colider2) continue;

  var x1 = colider1.pos.x, y1 = colider1.pos.y, w1 = colider1.w, h1 = colider1.h;
  var x2 = colider2.pos.x, y2 = colider2.pos.y, w2 = colider2.w, h2 = colider2.h;

  if(colider1.center != null) {x1 -= colider1.center.x; y1 -= colider1.center.y;}
  if(colider2.center != null) {x2 -= colider2.center.x; y2 -= colider2.center.y;}

  if (x1 + w1 >= x2 && y1 + h1 >= y2 && x2 + w2 >= x1 && y2 + h2 >= y1) {

    var Xa = x1 + w1 - x2;
    var Xb = x2 + w2 - x1;

    var Ya = y1 + h1 - y2;
    var Yb = y2 + h2 - y1;

    var deltaX = Xa < Xb ? -Xa : Xb;
    var deltaY = Ya < Yb ? -Ya : Yb;

    if (abs(deltaX) > abs(deltaY)) {

      if(deltaY > 0) {
        console.log('TOP');
        colider1.direction = 'top';
      } else {
        console.log('BOTTOM');
        colider1.direction = 'bottom';
      }

        //if(round(shift.y) != round(deltaY))
         // shift.y += deltaY;
          colider1.pos.y += deltaY; 
      
        //if(colider1.obj.speed != null) colider1.obj.speed.y = constrain(deltaY, -1, 1) * 80; // JELLLY
        if(colider1.speed != null){ 
          colider1.speed.y = 0;
          colider1.targetSpeed.y = 0;
        }
        colider1.colidedY = true;
    } else {
      if(deltaX > 0) {
        console.log('LEFT');
        colider1.direction = 'left';
      } else {
        console.log('RIGHT');
        colider1.direction = 'right';
      }
      //if(round(shift.x) != round(deltaX))
        //shift.x += deltaX;
        colider1.pos.x += deltaX; 
        //if(colider1.obj.speed != null) colider1.obj.speed.x = constrain(deltaX, -1, 1) * 80; // JELLY
        if(colider1.speed != null) {
          colider1.speed.x = 0;
          colider1.targetSpeed.y = 0;
        }
        colider1.colidedX = true;
    }
  }
}
}

class Direction {
    static UP     = 1;
    static DOWN   = 2;
    static LEFT   = 3;
    static RIGHT  = 4;
    static NONE   = 0;
}