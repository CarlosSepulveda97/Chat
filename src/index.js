const http = require('http');
const express = require('express');
const socketio = require('socket.io');//el modulo funciona sobre un servidor
const path = require('path');

const app = express(); //se usan websockets para cosas en tiempo real //protocolo websocket, estudiar socket.io
const server = http.createServer(app);//se crea este server para darle un contexto al socket
const io = socketio.listen(server);

//settings

app.set('port', process.env.PORT || 3000);


require('./sockets')(io);

//static files
app.use(express.static(path.join(__dirname, 'public')));

server.listen(3000, () => {
    console.log('Server on port', app.get('port')); //abre el puerto 3000
})

