

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
    
    var html = '';

    for (var i in constants) {
        if(typeof constants[i] == 'object') {
            html += '<div class="constants-table" name="'+ i +'">';
            html += '<h1>'+ i +'</h1>';
            html += addTable(constants[i]);
            html += '</div>';
        }
    }

    //constants = constants.PLAYER;


    /*
    html += '<table id="settings-table">';
    for (var i in constants) {
        if (constants.hasOwnProperty(i)) {
            html += addConstant(i, constants[i]);
        }
    }
    html += '</table>';
    */

    document.getElementById("settings").innerHTML = html;
}

function addTable(constants){
    var html = '';
    html += '<table class="settings-table">';
    for (var i in constants) {
        if (constants.hasOwnProperty(i)) {
            html += addConstant(i, constants[i]);
        }
    }
    html += '</table>';
    return html;
}

function addConstant(name, value){
    return '<tr><th class="name">'+name+'</th><th class="value">'+
    '<input type="text" value="'+ value + '">'
        
    +'</th></tr>';
}

function uploadSettings(){


    const tables = document.getElementsByClassName("constants-table");

    var constants = [];

    for(var i = 0; i < tables.length; i++) {
        const name = tables[i].getAttribute("name");
        constants.push({name: name, array: uploadTable(tables[i])});
    }

    console.log(constants);

    socket.emit('set_constants', constants);
}

function uploadTable(documentos) {
    
    var constants = [];

    var rows = documentos.getElementsByClassName("settings-table")[0].rows;

    for(var i = 0; i < rows.length; i++){
        var cell = rows[i].cells;
        var name = cell[0].innerHTML;
        var value = cell[1].getElementsByTagName("input")[0].value;
        
        if(Number.isInteger(parseInt(value))) value = parseInt(value);
        if(value == 'false') value = false;
        if(value ==  'true') value = true;

        constants.push({name: name, value: value});
        /*
        if(isInteger(value)) {
            constants.push({name: name,value: parseInt(value)});
        } else {

        }*/
    }

    return constants;
}