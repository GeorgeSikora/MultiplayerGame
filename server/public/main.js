


let socket = io.connect('192.168.0.108:3031');

socket.on('constants', loadConstants);

const access = {
    user: 'admin',
    password: 's8j2m6x4n1'
}

socket.emit('get_constants', access);

function loadConstants(constants) {
    var html = '';
    html += '<table>';

    for (var i in constants) {
        if (constants.hasOwnProperty(i)) {
            html += addConstant(i, constants[i]);
        }
    }

    html += '</table>';

    document.body.innerHTML = html;
}

function addConstant(name, value){
    return '<tr><th class="name">'+name+'</th><th class="value">'+
    '<input type="text" value="'+ value + '">'
        
    +'</th></tr>';
}