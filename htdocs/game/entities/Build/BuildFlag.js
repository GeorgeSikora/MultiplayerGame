
class BuildFlag extends Build {
    constructor(team){
        super('flag', ((team == 'blue') ? img_flag_blue : img_flag_red).get(0,0,96,128));
        this.team = team;
        this.center = {x: 14, y: 122};
    }
    use(obj) {
        if(this.lastGrid.x != this.grid.x || this.lastGrid.y != this.grid.y || this.lastButton != mouseButton){
            this.lastGrid = this.grid;
            this.lastButton = mouseButton;

            if(mouseButton == LEFT){
                //objects.push(new Flag(this.grid.x, this.grid.y, this.team));
            }
            if(mouseButton == RIGHT){
            }
            
            var removed = false;
            for(var i = 0; i < objects.length; i++) {
                var o = objects[i];
                if(o.constructor.name == 'Flag' && o.team == this.team) {removeObject(o); removed = true;}
            }

            if(!removed) {
                if(this.team == 'blue'){
                    chat.add(new Message().message('&7Modrá vlajka položena !').build());
                } else {
                    chat.add(new Message().message('&2Červená vlajka položena !').build());
                }
            }
            
            sound_place.play();
            objects.push(new Flag(this.grid.x, this.grid.y, this.team));
            
            this.shake.x = cos(obj.rotation)*16;
            this.shake.y = sin(obj.rotation)*16;
        }
         /*
            var searched = false;
            for(var i = 0; i < objects.length; i++) {
                var obj = objects[i];
                if(obj.constructor.name != 'Flag') continue;
                if(this.grid.x == obj.pos.x && this.grid.y == obj.pos.y) {
                    removeObject(obj);
                    searched = true;
                    break;
                }
            }
            if(!searched) {
                sound_place.play();
                objects.push(new Flag(this.grid.x, this.grid.y, this.team));
            }
            */
    }
}