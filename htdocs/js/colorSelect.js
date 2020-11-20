const colors = [
    {name: 'Red'    ,val: '#DF0000'},
    {name: 'Orange' ,val: '#FF8000'},
    {name: 'Yellow' ,val: '#FFFF00'},
    {name: 'Green'  ,val: '#00FF00'},
    {name: 'Aqua'   ,val: '#00D4D4'},
    {name: 'Blue'   ,val: '#0000FF'},
    {name: 'Purple' ,val: '#50007F'}
];

var outlineDefault = 'none';
var outlineSelected = '5px auto -webkit-focus-ring-color';

/*
let selectedID = 0;
selectColor(selectedID);

function selectColor(id) {
    document.getElementById('color' + selectedID).style.outline = outlineDefault;
    document.getElementById('color' + id).style.outline = outlineSelected;

    selectedID = id;
    //console.log(colors[selectedID].name);
    document.getElementById('selected-color').value = selectedID;
} 
*/

let selectedID = 0;
selectColor(selectedID);

function selectColor(id) {
    document.getElementById('color' + selectedID).style.outline = outlineDefault;
    document.getElementById('color' + id).style.outline = outlineSelected;

    selectedID = id;
    //console.log(colors[selectedID].name);
    document.getElementById('selected-color').value = document.getElementById('color' + selectedID).className;
} 