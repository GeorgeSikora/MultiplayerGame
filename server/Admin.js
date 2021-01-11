
const ioAdmin = io.of('/admin');

// middleware
ioAdmin.use((socket, next) => {
    const query = socket.handshake.query;
    const user = query.user;
    const pass = query.pass;

    if (user === 'admin' && pass === 's8j2m6x4n1') {
        return next();
    }
    return next(new Error('Authentication error'));
});

ioAdmin.on('connection', socket => {
    console.log("New admin connected");
    /********* SERVER ADMIN *********/
    socket.on('get_constants', () => {
        socket.emit('constants', constants);
    });
    socket.on('set_constants', receivedTables => {

        console.log(c.CYAN + 'Admin set constants:'+ c.RESET);

        for(var i = 0; i < receivedTables.length; i++) {

            var receivedConst = receivedTables[i].array;
            var tableName = receivedTables[i].name;

            console.log(c.MAGENTA + tableName + c.RESET);
            console.log(receivedConst);
            
            for(var j = 0; j < receivedConst.length; j++) {
                constants[tableName][receivedConst[j].name] = receivedConst[j].value;
            }
        }
    });

    socket.on('Error', () => {
        console.log("Error:");
    });
});

module.exports = ioAdmin;