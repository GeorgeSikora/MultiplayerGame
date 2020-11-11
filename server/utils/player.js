
/*** PLAYER CLASS ***/
class Player {
    constructor(id, name, x, y, col) {
      this.id = id;
      this.name = name;
      
      this.pos = {x:x, y:y};
      this.w = 64;
      this.h = 64;

      this.selectedGun = 0;
      this.rotation = 0;
      
      this.hp = constants.PLAYER_HP;

      this.col = col;

      this.kills = 0;

      this.respawning = false;
    }
    update() {
        io.emit('refPlayer', {id: this.id ,x: this.pos.x, y: this.pos.y, hp: this.hp, kills: this.kills, rotation: this.rotation, selectedGun: this.selectedGun});
    }
}

module.exports = Player;