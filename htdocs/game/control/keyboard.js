/*** CONTROL EVENTS ***/
function keyPressed(){
    if(keyCode == 27) { // Esc
      var x = document.getElementById("menu");
      if (x.style.display === "none") {
        x.style.display = "block";
        menuOpened = true;
      } else {
        x.style.display = "none";
        menuOpened = false;
      }
    }
    if(menuOpened) return;
  
    if(keyCode == 70){
      chat.draw();
    }
  
    chat.keyPressed();
    if(chat.open) return;
  
    player.keyPressed();
  }
  function keyReleased(){
    player.keyReleased();
    chat.keyReleased();
  }