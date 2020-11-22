
function keyPressed(){
    if(keyCode == 27) toggleMenu(); // Esc
    if(menuOpened) return;
    
    chat.keyPressed();
    if(chat.open) return;
    
    player.keyPressed();
    for(var i = 0; i < objects.length; i++) if(objects[i].keyPressed != null) objects[i].keyPressed();
}

function keyReleased(){
    player.keyReleased();
    for(var i = 0; i < objects.length; i++) if(objects[i].keyReleased != null) objects[i].keyReleased();
}

function toggleMenu(){
    var menu = $("#menu");
    if (menu.css('display') === "none") {
        loadScreen('menu');
        menu.show();
        menuOpened = true;
    } else {
        menu.hide();
        menuOpened = false;
    }
}