
class Constants {
    constructor(){

        this.PLAYER = {
            HP:             15,
            SPEED:          30,
            DAMAGE:         1,
            FRIENDLY_FIRE:  false
        };

        this.GAME = {
            SAFE_ZONE:                  0,
            REFRESH_PAGE_ON_RESTART:    false,
            RESTART_TIME:               5
        };

        this.ANTICHEAT = {
            ENABLE: false,
            MIN_SHOOT_GAP: 80
        }
    }
}

module.exports = new Constants();