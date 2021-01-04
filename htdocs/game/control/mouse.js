
function mousePressed(){
    if(game.menuOpened) return;

    /* right top corner mute icon click action */
    const ratio = game.resolution == 0 ? 1 : game.resolution / innerHeight;
    if(mouseX > width - 32 * ratio && mouseX < width && mouseY < 32 * ratio && mouseY > 0){
        Howler.mute(game.muted = !game.muted);
    }

    if(chat.open) return;

    player.mousePressed();
    for(var i = 0; i < objects.length; i++) if(objects[i].mousePressed != null) objects[i].mousePressed();
}

function mouseReleased(){
    for(var i = 0; i < objects.length; i++) if(objects[i].mouseReleased != null) objects[i].mouseReleased();
}
  
let scoolTimer = 0;
function mouseWheel(event) {
    if(game.menuOpened) return;

    if(scoolTimer < millis()) {
        if(event.delta < 0) {
            player.selectedEquipment--;
            if(player.selectedEquipment < 0) player.selectedEquipment = player.equipment.length-1;
        } else {
            player.selectedEquipment++;
            if(player.selectedEquipment > player.equipment.length-1) player.selectedEquipment = 0;
        }
        scoolTimer = millis() + 120;
    }
}