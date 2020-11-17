function mousePressed(){
  if(menuOpened) return;
  if(chat.open) return;
  
  /* right top corner mute icon click action */
  if(mouseX > width-32 && mouseX < width && mouseY < 32 && mouseY > 0){
    muted = !muted;
    Howler.mute(muted);
  }

  player.mousePressed();
}
  
let scoolTimer = 0;
function mouseWheel(event) {
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