
class Smoke extends GameObject {

	constructor(x, y) {
    super(x, y, 0, 0);

    this.diameter = 5;
    this.targetDiameter = random(150, 500); 

    this.direction = random(TWO_PI);
    this.directionSpeed = random(0.6, 1.4);

    this.timeOut = millis() + 3500;
    this.opacity = random(50, 200);
    //this.opacity = random(50, 500);
    this.layerShift = height;

    this.timeShift = random(TWO_PI);

    this.oscillationType = ceil(random(4));
    this.oscillationSpeed = random(0.1, 1.5);

    var id = sound_smoke.play();
    sound_smoke.volume(0.1, id);
  }
  
	update() {

		if(this.timeOut < millis()) {
      this.opacity -= 0.8;
    }

    this.pos.x += cos(this.direction) * this.directionSpeed;
    this.pos.y += sin(this.direction) * this.directionSpeed;
    
    switch(this.oscillationType) {
      case 1:
        this.pos.x += sin(millis()/100 + this.timeShift) * this.oscillationSpeed;
        this.pos.y += sin(millis()/100 + this.timeShift) * this.oscillationSpeed;
        break;
      case 2:
        this.pos.x += sin(millis()/100 + this.timeShift) * this.oscillationSpeed;
        this.pos.y += cos(millis()/100 + this.timeShift) * this.oscillationSpeed;
        break;
      case 3:
        this.pos.x += cos(millis()/100 + this.timeShift) * this.oscillationSpeed;
        this.pos.y += sin(millis()/100 + this.timeShift) * this.oscillationSpeed;
        break;
      case 4:
        this.pos.x += cos(millis()/100 + this.timeShift) * this.oscillationSpeed;
        this.pos.y += cos(millis()/100 + this.timeShift) * this.oscillationSpeed;
        break;
    }

    this.diameter += (this.targetDiameter - this.diameter) * 0.02;
    this.w = this.h = this.diameter;
    this.center = {x: this.w/2, y: this.h/2};
    
    this.layer = this.pos.y + this.layerShift;

    if(this.opacity < 0){
      removeObject(this);
      return;
    }
  }
  
  draw() {
    noStroke();
    fill(255, this.opacity);
    ellipse(this.pos.x, this.pos.y, this.diameter);
  }
}