
const ioSpectator= io.of('/spectator');

ioSpectator.use((socket, next) => {
    /*
    const query = socket.handshake.query;
    const user = query.user;
    const pass = query.pass;
    */
    /* TODO: Ověří přihlašovací údaje z MySQL databáze */
    return next(new Error('Authentication error'));

    if (user === 'admin' && pass === 's8j2m6x4n1') {
        return next();
    }
    return next(new Error('Authentication error'));
});

ioSpectator.on('connection', socket => {
    socket.emit('chat-message', new Message('&4Ahoj pane spektator'));

    socket.on('initReq', data => { // init request

        socket.emit('chat-message', new Message('&7Jde se na to !'));

        socket.emit('initSpectator', {constants: constants, players: players, objects: objects});
    
    });
});

module.exports = ioSpectator;