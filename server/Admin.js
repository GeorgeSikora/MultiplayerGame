
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
    socket.on('set_constants', receivedConst => {
        console.log(receivedConst);
        for(var i = 0; i < receivedConst.length; i++) {
           constants[receivedConst[i].name] = receivedConst[i].value;
        }
    });

    socket.on('Error', () => {
        console.log("Error:");
    });
});

module.exports = ioAdmin;