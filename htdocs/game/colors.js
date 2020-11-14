const BLACK   = '#000000';
const WHITE   = '#FFFFFF';

const RED     = '#DF0000';
const ORANGE  = '#FF8000';
const YELLOW  = '#FFFF00';
const GREEN   = '#00FF00';
const AQUA    = '#00D4D4';
const BLUE    = '#0000FF';
const PURPLE  = '#50007F';

const GRAY   = '#888888';

function getColor(id){
    switch(id){
        case 0: return RED;
        case 1: return ORANGE;
        case 2: return YELLOW;
        case 3: return GREEN;
        case 4: return AQUA;
        case 5: return BLUE;
        case 6: return PURPLE;
    }
}

function getColorToken(id){
    switch(id){
        case 0: return 2;
        case 1: return 3;
        case 2: return 4;
        case 3: return 5;
        case 4: return 6;
        case 5: return 7;
        case 6: return 8;
    }
}