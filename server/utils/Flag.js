
class Flag extends GameObject {
    constructor(x, y, team){
        super(x, y, 96, 128);
        this.team = team;
        this.captureReady = false;
        this.captured = false;
    }
}

module.exports = Flag;