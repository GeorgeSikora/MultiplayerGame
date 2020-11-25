const Bullet = require("./Bullet");

function diff (num1, num2) {
    if (num1 > num2) {
        return (num1 - num2);
    } else {
        return (num2 - num1);
    }
};

function dist (x1, y1, x2, y2) {
    var deltaX = diff(x1, x2);
    var deltaY = diff(y1, y2);
    var dist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    return (dist);
};

const SHOT_DELAY = 120;

class Turret extends GameObject {
    constructor(x, y) {
        super(x, y, 64, 64);

        this.nextShotTime = 0;

        this.lastDir = 0;
        this.deltaDir = 0;

        this.dir = 0;
        this.targetDir = 0;

        this.playerLastPos = 0;
    }
    update() {

            if(players.length == 0) return;

            var nearesetPlayer = players[0];
            var nearestDistance = Number.MAX_VALUE;
            for(var i = 0; i < players.length; i++) {
                var p = players[i];
                const distance = dist(p.pos.x, p.pos.y, this.pos.x, this.pos.y);
                if(distance < nearestDistance) {
                    nearestDistance = distance;
                    nearesetPlayer = p;
                }
            }

            const player = nearesetPlayer;
            const distance = nearestDistance;

            const playerDeltaPos = {x: player.pos.x - this.playerLastPos.x, y: player.pos.y - this.playerLastPos.y};
            this.playerLastPos = {x: player.pos.x, y: player.pos.y};

            //if(playerDeltaPos.x == 0 && playerDeltaPos.y == 0) return;

            console.log(playerDeltaPos);

            const playerDir = Math.atan2(player.pos.y, player.pos.x);
            this.dir += (playerDir - this.dir) * 0.3;

            this.deltaDir = this.lastDir - this.dir;
            this.lastDir = this.dir;

            const finalAngle = this.dir - (this.deltaDir * (9360 / distance));
            //console.log(finalAngle);

            const dirShift = (playerDeltaPos.x > 0) ? 1 : -1;
            
            if(nearestDistance > 800) return;
        if(this.nextShotTime < getMillis()) {
            objects.push(new Bullet(this, this.pos.x, this.pos.y, playerDir + 0.55 * dirShift)); // playerDir - 0.6

            this.nextShotTime = getMillis() + SHOT_DELAY;
        }
    }
} 

objects.push(new Turret(0, 0));

function getMillis() {
    const hrTime = process.hrtime();
    return (hrTime[0] * 1000 + hrTime[1]/1000000);
}

function mapRange(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}