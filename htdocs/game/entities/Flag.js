
class Flag extends GameObject {
    constructor(x, y){
        super(x, y, img_flag.width, img_flag.height);
    }
    draw(){
        push();
        translate(0,0,0);
        image(img_flag, 0, 0);
        pop();
    }
}