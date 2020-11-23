
class Particle extends GameObject {
    constructor(x, y){
        super(x, y, 5, 5);
        this.timeOut = millis() + 3000;
    }
    refresh(){
        if(timeOut < millis()) {

        }
    }
    draw(){
        fill(255, 0, 255);
        ellipse(pos.x, pos.y, 5, 5);
    }
}