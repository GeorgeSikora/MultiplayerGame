
const helpList = [
    '/build - toggle build mode',
    '/save - save map',
    '/info - show more game info',
    '/map - on/off minimap'
];

function command(str) {
    const splitStr = str.split(' ');
    const cmd = splitStr.shift();
    const param = splitStr;

    switch(cmd){
        case 'help':
            var page = 0;
            if(param[0] != null){
                page = param[0];
            }
            
            chat.add(new Message().message('page ' + page + ' of ' + 10).build());

            helpList.forEach(line => {
                chat.add(new Message().message(line).build());
            });
            
            if(param[0] == null) chat.add(new Message().message('&4Type: "/help <page>" to see specific page.').build());

            break;
        case 'build':
            chat.add(new Message().message('&2You dont have permissions').build());
            return;

            buildingEnable = !buildingEnable;

            player.selectedEquipment = 0;
            if(buildingEnable){
                player.equipment = player.tools;
                chat.add(new Message().message('Building tools, pro vypnutí opakuj příkaz "/build"').build());
            } else {
                player.equipment = player.weapons;
                chat.add(new Message().message('Weapon guns').build());
            }

            break;
        case 'save':
            var output = [];
            for(var i = 0; i < objects.length; i++){
                var obj = objects[i];
                if(obj.constructor.name != 'Block') continue;
                output.push(obj.pos.x + ' ' + obj.pos.y);
            }
            saveStrings(output,'map.txt');
            break;
        case 'info':
            infoEnable = !infoEnable;
            break;
        case 'map':
            minimap.enable = !minimap.enable;
            break;
        case 'end':
            game.end();
            break;
        case 'restart':
            game.restart();
            break;
        default:
            //eval(cmd);
            break;

    }
}