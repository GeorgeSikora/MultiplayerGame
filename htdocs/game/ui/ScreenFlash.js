
let splash;

class ScreenFlash {
    constructor(){
        this.opacity = 255;
        this.targetOpacity = 0;
    }
    draw(){
        if(this.opacity <= 1) return;

        rectMode(CORNER);
        fill(0, this.opacity);
        noStroke();
        rect(0, 0, innerWidth, innerHeight);

        this.opacity += (this.targetOpacity - this.opacity) * 0.04;
    }
}