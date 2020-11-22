
class Grass extends GameObject {
    constructor(x, y){
        super(x, y, 16, 16);

        this.layer = y -999;

        this.img = img_grass;
        this.imgIndex = round(random(1,10));
    }
    draw(){
        image(this.img, this.pos.x, this.pos.y, this.w, this.h, this.imgIndex * this.w, 0, this.w, this.h);
    }
}