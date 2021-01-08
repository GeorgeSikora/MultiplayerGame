
var screens = {
    game: function() { game.draw() }
}

class Screen {

    static active = screens[Object.keys(screens)[0]];

    static draw() {
        Screen.active();
    }

}

console.log();