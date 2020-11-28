
class Build extends Equipment {
    constructor(name, img) {
        super(name, img); // img_block // img_flag_blue.get(0,0,96,128)

        this.HOLDING_USE = true;
        this.GRID_SIZE = 1;
        this.GRID_SHIFT = {x: 0, y: 0};
        
        this.center = {x: 0, y: 0};

        this.grid = {x: 0, y: 0};
        this.lastGrid = {x: 0, y: 0};
        this.lastButton = 0;

        this.shake = {x: 0, y: 0};
    }
    draw(obj) {
        push();

        this.shake.x += (0-this.shake.x) * 0.09;
        this.shake.y += (0-this.shake.y) * 0.09;

        translate(obj.pos.x + this.shake.x, obj.pos.y + this.shake.y);
        rotate(obj.rotation);
        translate(24, -16);
        if(obj.rotation < -PI/2 || obj.rotation > PI/2) {
          translate(0, 32);
          scale(1.0,-1.0);
        }
        tint(255);
        image(this.img,0,0,32,32);
        pop();
        
        if(obj != player) return;

        var target = cam.mouse;
        
        target.x += this.GRID_SHIFT.x;
        target.y += this.GRID_SHIFT.y;

        this.grid = getGrid(target, this.GRID_SIZE);

        push();
        tint(255, 100);
        //image(img_block, this.grid.x-64/2, this.grid.y-64/2);
        translate(this.grid.x, this.grid.y);
        translate(-this.center.x, -this.center.y);
        translate(-this.GRID_SHIFT.x, -this.GRID_SHIFT.y);
        if(this.PLACE_SIZE) {
          image(this.img, 0, 0, this.PLACE_SIZE.x, this.PLACE_SIZE.y);
        } else {
          image(this.img, 0, 0);
        }
        pop();
    }
    use(obj) {
        if(this.lastGrid.x != this.grid.x || this.lastGrid.y != this.grid.y || this.lastButton != mouseButton) {
          this.lastGrid = this.grid;
          this.lastButton = mouseButton;

          if(mouseButton == LEFT) {
            //socket.emit('block-add', this.grid);
            //objects.push(new Flag(this.grid.x, this.grid.y,'blue'))
          }
          if(mouseButton == RIGHT) {
            //socket.emit('block-rem', this.grid);
          }
          
          this.shake.x = cos(obj.rotation)*16;
          this.shake.y = sin(obj.rotation)*16;
        }
        /*
        var searched = false;
        for(var i = 0; i < objects.length; i++) {
          var obj = objects[i];
          if(grid.x == obj.pos.x && grid.y == obj.pos.y) {
            
            removeObject(obj);
            searched = true;
            break;
          }
        }
        if(!searched) {
            sound_place.play();
            objects.push(new Block(grid.x, grid.y));
        }
        */
    }
}