const ioInfo = io.of('/info');

// middleware
ioInfo.use((socket, next) => {
    const query = socket.handshake.query;
    const user = query.user;
    const pass = query.pass;

    /* TODO: Ověří přihlašovací údaje z MySQL databáze */
    return next();

    if (user === 'admin' && pass === 's8j2m6x4n1') {
        return next();
    }
    return next(new Error('Authentication error'));
});

ioInfo.on('connection', socket => {
    //console.log('New client connected');
});