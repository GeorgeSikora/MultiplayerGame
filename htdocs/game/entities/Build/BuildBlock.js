
class BuildBlock extends Build {
    constructor(){
        super('block', img_block);
        this.center = {x: 32, y: 32};
    }
    use(obj) {
        if(this.lastGrid.x != this.grid.x || this.lastGrid.y != this.grid.y || this.lastButton != mouseButton){
            this.lastGrid = this.grid;
            this.lastButton = mouseButton;

            if(mouseButton == LEFT){
              socket.emit('block-add', this.grid);
            }
            if(mouseButton == RIGHT){
              socket.emit('block-rem', this.grid);
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