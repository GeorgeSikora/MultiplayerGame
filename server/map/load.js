const fs = require('fs');

try {  
    const data = fs.readFileSync('map/map.txt', 'utf8');
    const lines = data.split(/\r?\n/);

    for(var i = 0; i < lines.length; i++){
        const param = lines[i].split(" ");
        const x = parseInt(param[0]);
        const y = parseInt(param[1]);
        objects.push(new Block(x,y));
    }

} catch(e) {
    console.log('Error:', e.stack);
}