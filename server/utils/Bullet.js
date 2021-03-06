
/*** BULLET CLASS ***/

const ioClient = require("../Client");
const constants = require("../constants");

class Bullet extends GameObject {
    constructor(shooterID, x, y, dir) {
        super(x, y, 6, 6);
        this.shooterID = shooterID;

        this.dir = dir;
        this.speed = 1;

        for(var i = 0; i < players.length; i++) {
            ioClient.to(players[i].id).emit('shot', {shooterID: this.shooterID, pos: this.pos, speed: {x: Math.cos(this.dir) * this.speed, y: Math.sin(this.dir) * this.speed}});
        }
    }
    update() {
        if(this.pos.x < -10000 || this.pos.x > 10000 || this.pos.y < -10000 || this.pos.y > 10000) {
            ObjManager.remove(this);
        }

        var move = {x:0, y:0};
        move.x = Math.cos(this.dir) * this.speed * deltaTime;
        move.y = Math.sin(this.dir) * this.speed * deltaTime;

        for(var i = 0; i < objects.length; i++){
            var obj = objects[i];
            if(obj.constructor.name == 'Bullet') continue;
            if(obj.constructor.name == 'Turret') continue;
            if(Collision.lineRect(this.pos.x, this.pos.y, this.pos.x+move.x, this.pos.y+move.y, obj.pos.x-obj.w/2, obj.pos.y-obj.h/2, obj.w, obj.h)){
                ObjManager.remove(this);
                return;
            }
        }

        for(var i = 0; i < players.length; i++) {
            const p = players[i];
            if(p.id == this.shooterID) continue;
            if(p.respawning) continue;

            if(Collision.lineRect(this.pos.x, this.pos.y, this.pos.x+move.x, this.pos.y+move.y, p.pos.x-p.w/2, p.pos.y-p.h/2, p.w, p.h)){
                const ZONE = constants.GAME.SAFE_ZONE;
               if(p.pos.x <= -ZONE || p.pos.x >= ZONE || p.pos.y <= -ZONE || p.pos.y >= ZONE) {

                    var killer = players[ObjManager.getPlayer(this.shooterID)];
                    
                    if(this.shooterID.constructor.name == 'Turret') {
                        killer = {name: 'turret'};
                    }

                    if(killer != null && (killer.team != p.team || constants.PLAYER.FRIENDLY_FIRE)) {
                        p.hp -= constants.PLAYER.DAMAGE;

                        if(p.hp <= 0) {

                            if(p.capturedFlag != null) {
                                objects.push(new DroppedFlag(p.pos.x, p.pos.y, p.capturedFlag));
                                ioClient.emit('player-set', p.id, 'capturedFlag', null);
                                ioClient.emit('DroppedFlag-add', p.pos, p.capturedFlag);
                                p.capturedFlag = null;
                            }

                            const pos = p.team == 'red' ? spawnRed : spawnBlue;
                            
                            ioClient.to(p.id).emit('respawn', this.shooterID, pos);

                            p.respawning = true;
                            p.pos = {x: pos.x, y: pos.y};
                            p.hp = constants.PLAYER.HP;

                            ioClient.emit('chat-message', new Message('&a'+killer.name+' zabil hráče '+p.name));
                            killer.kills++;
                        }
                    }
                }

                ObjManager.remove(this);
                return;
            }
        }
        this.pos.x += move.x;
        this.pos.y += move.y;
    }
}

module.exports = Bullet;