
/********* MY FUNCTIONS *********/

function objectIndexOf(arr, searchTerm, property) {
    for(var i = 0, len = arr.length; i < len; i++) {
        if (arr[i][property] === searchTerm) {return i;}
    } return -1;
}
