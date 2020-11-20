
let sockets = [];

let activeServers = [];

const FIRST_PORT = 1700; // 1771
const SERVERS_SIZE = 100;

let i = 0;
function testConnection(){

    if(i >= SERVERS_SIZE) {
        return;
    }

    var socket = io.connect('localhost:'+(FIRST_PORT+i)+'/admin', {
        query: {
            user: 'admin',
            pass: 's8j2m6x4n1'
        },
        reconnection: false
    })

    var id = sockets.push(socket)-1;
    /*
    sockets[id].on('connect', () => {
        //console.log('Socket connected!', sockets[id].io.uri);
        //activeServers.push(sockets[id].io.uri);
        //sockets[id].disconnect();
    });

    sockets[id].on('connect_error', function(){
        //console.log('Socket not connected!', sockets[id].io.uri);
        //sockets[id] = null;
    });
    */

    i++; testConnection();
}

testConnection();

setTimeout(()=>{
    for(var i = 0; i < sockets.length; i++){
        if(sockets[i].connected){
            console.log('Socket connected!',sockets[i].io.uri);
        }
    }
}, 3000);

/*

socket.on('error', (err) => {
    console.error(err);
});

socket.on('constants', loadConstants);

socket.emit('get_constants');

function loadConstants(constants) {
    console.log(constants);
    var html = '';
    html += '<table id="settings-table">';

    for (var i in constants) {
        if (constants.hasOwnProperty(i)) {
            html += addConstant(i, constants[i]);
        }
    }

    html += '</table>';

    document.getElementById("settings").innerHTML = html;
}

function addConstant(name, value){
    return '<tr><th class="name">'+name+'</th><th class="value">'+
    '<input type="text" value="'+ value + '">'
        
    +'</th></tr>';
}

function uploadSettings(){
    var rows = document.getElementById("settings-table").rows.length;
    var constants = [];

    console.log(rows);

    for(var i = 0; i < rows; i++){
        var cell = document.getElementById("settings-table").rows[i].cells;
        var name = cell[0].innerHTML;
        var value = cell[1].getElementsByTagName("input")[0].value;

        constants.push({name: name,value: parseInt(value)});
    }
    console.log(constants);

    socket.emit('set_constants', constants);
}

*/