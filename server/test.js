

function arrayObjectIndexOf(myArray, searchTerm, property) {
    for(var i = 0, len = myArray.length; i < len; i++) {
       if (myArray[i][property] == searchTerm) return i;
    } return -1;
}

function getPlayer(playerID) {
    for(var i = players.length-1; i >= 0; i--) {
       if (players[i].id == playerID) return i;
    } return -1;
}

module.exports = {
    arrayObjectIndexOf,
    getPlayer
};