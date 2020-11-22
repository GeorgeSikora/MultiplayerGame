
const helpList = [
    '/build - toggle build mode',
    '/save - save map',
    '/info - show more game info',
    '/map - on/off minimap'
];
const HELP_LIST_PAGES = 1;

function command(str) {
    const splitStr = str.split(' ');
    const cmd = splitStr.shift();
    const param = splitStr;

    switch(cmd){
        case 'help':
            var page = param[0];

            if(page == null) {
                page = 1;
            }
            if(!isNumeric(page)) {
                chat.add(new Message().message('&2Wrong parameter "' + param[0] + '", must be page number.').build());
                break;
            } 
            if(page < 1 || page > HELP_LIST_PAGES) {
                chat.add(new Message().message('&3Page ' + page + ' doesnt exists.').build());
                chat.add(new Message().message('&5Available only from 1 to ' + HELP_LIST_PAGES + ' page').build());
                break;
            }
            
            chat.add(new Message().message('page ' + page + ' of ' + HELP_LIST_PAGES).build());

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

function isNumeric(value) {
    return /^-?\d+$/.test(value);
}