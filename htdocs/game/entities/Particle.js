
class Particle extends GameObject {
	constructor(x, y) {
    super(x, y, 0, 0);

    this.w = random(2, 10);
    this.h = this.w;
    
    this.timeOut = millis() + 100;
    this.opacity = random(120, 150);
    this.layerShift = random(16);
  }
  
	update() {

		if(this.timeOut < millis()) {
      this.opacity -= 3;
    }
    if(this.opacity < 1){
      removeObject(this);
      return;
    }

    this.pos.x += random(-2, 2);
    this.pos.y += random(-2, 2);
    
    this.layer = this.pos.y + this.layerShift;
  }
  
	draw() {
    noStroke();
    fill(92, 59, 56, this.opacity);
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y, this.w, this.h);
	}
}