

class HandGranate extends Equipment {
    constructor(quantity) {
        super('hand granate', img_granate_smoke);

        this.BUTTON_USE = LEFT;
    }
    use(obj) {

        const pos = this.getGunHead(obj);
        
        //player.speed.x = cos(obj.rotation+PI)*1.7;
        //player.speed.y = sin(obj.rotation+PI)*1.7;

        //var id = sound_rifle.play();
        //sound_rifle.pos(map(mouseX,0,width,-0.2, 0.2),map(mouseY,0,height,-0.2,0.2), -1-random(1), id);

        //objects.push(new Granate(pos.x, pos.y, atan2(mouseY - height / 2, mouseX - width / 2)));
        if(player.smokeGranates > 0) {
            socket.emit('smoke-granate', pos, atan2(mouseY - height / 2, mouseX - width / 2));
            player.smokeGranates--;
        } else {
            chat.add(new Message().message('&3You dont have enought smoke granated!').build());
        }
    }
}