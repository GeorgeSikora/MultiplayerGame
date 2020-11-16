function mousePressed(){
    if(menuOpened) return;
    if(chat.open) return;
  
    if(mouseX > width-32 && mouseX < width && mouseY < 32 && mouseY > 0){
      muted = !muted;
      Howler.mute(muted);
    }
    /*
    var searched = false;
    for(var i = 0; i < objects.length; i++) {
      var obj = objects[i];
      if(grid.x == obj.pos.x && grid.y == obj.pos.y) {
        removeObject(obj);
        searched = true;
        break;
      }
    }
    if(!searched) {
      objects.push(new Block(grid.x, grid.y));
    }
    */
    player.shoting();
  }
  
  let scoolTimer = 0;
  function mouseWheel(event) {
    if(scoolTimer < millis()) {
      if(event.delta < 0) {
        player.selectedGun--;
        if(player.selectedGun < 0) player.selectedGun = player.guns.length-1;
      } else {
        player.selectedGun++;
        if(player.selectedGun > player.guns.length-1) player.selectedGun = 0;
      }
      scoolTimer = millis() + 120;
    }
  }