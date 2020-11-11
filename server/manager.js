
class ObjectManager {
    remove(obj){
        var index = objects.indexOf(obj);
        if(index == -1) return;
        objects.splice(index, 1);
    }
    getPlayer(playerID) {
        for(var i = players.length-1; i >= 0; i--) {
           if (players[i].id == playerID) return i;
        } return -1;
    }
}

module.exports = new ObjectManager();