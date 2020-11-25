const fs = require('fs');

function loadMap(map){

    objects = [];

    try {
        const data = fs.readFileSync('map/'+map+'.txt', 'utf8');
        const lines = data.split(/\r?\n/);

        console.log('loading ' + lines.length + ' lines');

        if(map != 'lobby') {
            const redFlag = getPos(lines, 0);
            objects.push(new Flag(redFlag.x, redFlag.y, 'red'));
            
            const blueFlag = getPos(lines, 1);
            objects.push(new Flag(blueFlag.x, blueFlag.y, 'blue'));
        }
        
        spawnRed = getPos(lines, 2);

        spawnBlue = getPos(lines, 3);

        for(var i = 4; i < lines.length; i++){
            const param = lines[i].split(" ");
            const x = parseInt(param[0]);
            const y = parseInt(param[1]);
            objects.push(new Block(x,y));
        }

    } catch(e) {
        console.log('Error:', e.stack);
    }
}

function getPos(lines, i) {
    const param = lines[i].split(" ");
    const x = parseInt(param[0]);
    const y = parseInt(param[1]);
    return {x: x, y: y};
}

module.exports = loadMap;