
let objects = [];

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

function getObject(id) {
    for(var i = 0; i < objects.length; i += 1) {
        if(objects[i].id === id) {
            return objects[i];
        }
    }
    return null;
}

function getObjectIndex(id) {
    for(var i = 0; i < objects.length; i += 1) {
        if(objects[i].id === id) {
            return i;
        }
    }
    return -1;
}

function removeObjectByID(id){
    const index = objects.findIndex(obj => obj.id === id);
    objects.splice(index, 1);
}
  
function removeObject(object){
    objects.splice(objects.indexOf(object), 1);
}