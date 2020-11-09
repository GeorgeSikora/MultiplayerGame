
class GameObject {
    constructor(x, y, w, h) {
        this.id = -1;
        
        this.pos = {x:x, y:y};
        this.w = w;
        this.h = h;
    }
    update(){
        // Basicly nothing
    }
    draw(){
        // Basicly nothing
    }
}

module.exports = GameObject;