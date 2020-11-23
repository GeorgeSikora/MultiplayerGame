
const BLACK   = '#000000'; // 0
const WHITE   = '#FFFFFF'; // 1
const RED     = '#DF0000'; // 2
const ORANGE  = '#FF8000'; // 3
const YELLOW  = '#FFFF00'; // 4
const GREEN   = '#00FF00'; // 5
const AQUA    = '#00D4D4'; // 6
const BLUE    = '#5078FF'; // 7
const PURPLE  = '#50007F'; // 8
const GRAY    = '#666666'; // 9
const PINK    = '#FF69B4'; // A

function getColorToken(id){
    switch(id){
        case 'black':   return '0';
        case 'white':   return '1';
        case 'red':     return '2';
        case 'orange':  return '3';
        case 'yellow':  return '4';
        case 'green':   return '5';
        case 'aqua':    return '6';
        case 'blue':    return '7';
        case 'purple':  return '8';
        case 'gray':    return '9';
        case 'pink':    return 'a';
        default: return '4'; // default is yellow
    }
}