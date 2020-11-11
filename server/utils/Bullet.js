
/*** BULLET CLASS ***/
class Bullet extends GameObject {
    constructor(shooterID, x, y, dir){
        super(x,y,6,6);
        this.shooterID = shooterID;

        this.dir = dir;
        this.speed = 1;

        io.emit('shot', {shooterID: this.shooterID, pos: this.pos, speed: {x: Math.cos(this.dir) * this.speed, y: Math.sin(this.dir) * this.speed}});
    }
    update(){
        if(this.pos.x < -10000 || this.pos.x > 10000 || this.pos.y < -10000 || this.pos.y > 10000) {
            ObjManager.remove(this);
        }
        var move = {x:0, y:0};
        move.x = Math.cos(this.dir) * this.speed * deltaTime;
        move.y = Math.sin(this.dir) * this.speed * deltaTime;

        for(var i = 0; i < objects.length; i++){
            var obj = objects[i];
            if(obj.constructor.name == 'Bullet') continue;
            if(Collision.lineRect(this.pos.x, this.pos.y, this.pos.x+move.x, this.pos.y+move.y, obj.pos.x-obj.w/2, obj.pos.y-obj.h/2, obj.w, obj.h)){
                ObjManager.remove(this);
                return;
            }
        }

        for(var i = 0; i < players.length; i++){
            const p = players[i];

            if(p.id == this.shooterID) continue;

            if(Collision.lineRect(this.pos.x, this.pos.y, this.pos.x+move.x, this.pos.y+move.y, p.pos.x-p.w/2, p.pos.y-p.h/2, p.w, p.h)){
               if(p.pos.x < -constants.SAFE_ZONE || p.pos.x > constants.SAFE_ZONE || p.pos.y < -constants.SAFE_ZONE || p.pos.y > constants.SAFE_ZONE) {
                p.hp -= constants.PLAYER_DAMAGE;

                if(p.hp <= 0) {
                    io.to(p.id).emit('respawn');
                    p.respawning = true;
                    p.pos = {x:0, y:0};
                    p.hp = constants.PLAYER_HP;
                    
                    const killer = players[ObjManager.getPlayer(this.shooterID)];
                    if(killer != null) killer.kills++;
                }
               }
               ObjManager.remove(this);
               console.log(p.name,'get hit');
               return;
            }
        }

        this.pos.x += move.x;
        this.pos.y += move.y;
    }
}
module.exports = Bullet;