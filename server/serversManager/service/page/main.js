

let socket = io.connect('localhost:3031/admin', {
    query: {
        user: 'admin',
        pass: 's8j2m6x4n1'
    }
});

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