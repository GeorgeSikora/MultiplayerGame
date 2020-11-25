
const helpList = [
    '/build - toggle build mode',
    '/save - save map',
    '/info - show more game info',
    '/map - on/off minimap',
    '/pt - players target pos'
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
            //chat.add(new Message().message('&2You dont have permissions').build());
            //return;

            game.buildingEnable = !game.buildingEnable;

            player.selectedEquipment = 0;
            if(game.buildingEnable){
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
            game.showInfo = !game.showInfo;
            break;
        case 'pt':
            game.showPlayersTarget = !game.showPlayersTarget;
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
        case 'smoke':
            objects.push(new Granate(player.pos.x, player.pos.y, atan2(mouseY - height / 2, mouseX - width / 2)));
            break;
        case 'reload':
            location.reload();
            break;
        case 'bot':
            player.botEnable = !player.botEnable;
            break;
        case 'mirror':
            BuildBlock.MIRROR = !BuildBlock.MIRROR;
            chat.add(new Message().message('mirror building = ' + BuildBlock.MIRROR).build());
            chat.add(new Message().message('mirrorplus building = ' + BuildBlock.MIRRORPLUS).build());
            break;
        case 'mirrorplus':
            BuildBlock.MIRRORPLUS = !BuildBlock.MIRRORPLUS
            chat.add(new Message().message('mirror building = ' + BuildBlock.MIRROR).build());
            chat.add(new Message().message('mirrorplus building = ' + BuildBlock.MIRRORPLUS).build());
            break;
        case 'mr':
            minimap.build();
            break;
        default:
            break;

    }
}

function isNumeric(value) {
    return /^-?\d+$/.test(value);
}