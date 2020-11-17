

class Build extends Equipment {
    constructor(){
        super('build', img_block);

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
          translate(0, this.img.height/2);
          scale(1.0,-1.0);
        }
        tint(255);
        image(this.img,0,0,32,32);
        pop();
            
        grid = getGrid(cam.mouse, 64);
        push();
        tint(255, 100);
        image(img_block, grid.x-64/2, grid.y-64/2);
        pop();
    }
    use(obj) {
        //sound_knife.pos(map(mouseX,0,width,-1,1),map(mouseY,0,height,-1,1), -0.5, id);

        this.shake.x = cos(obj.rotation)*10;
        this.shake.y = sin(obj.rotation)*10;

        var searched = false;
        for(var i = 0; i < objects.length; i++) {
          var obj = objects[i];
          if(grid.x == obj.pos.x && grid.y == obj.pos.y) {
            sound_pop.play();
            removeObject(obj);
            searched = true;
            break;
          }
        }
        if(!searched) {
            sound_place.play();
            objects.push(new Block(grid.x, grid.y));
        }
    }
}