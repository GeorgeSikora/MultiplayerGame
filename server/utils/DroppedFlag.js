

class DroppedFlag extends GameObject {
    constructor(x, y, team){
        super(x, y, 64, 32);

        this.team = team;
    }
}

module.exports = DroppedFlag;