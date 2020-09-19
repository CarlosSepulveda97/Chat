module.exports = function (io) {
    //conexion socket del SERVER
    io.on('connection', socket =>{//io tiene a todos los clientes conectados
        console.log('new user connected');
        socket.on('send message', function(data){
            console.log(data)
            io.sockets.emit('new message', data);
        })
    })
}
