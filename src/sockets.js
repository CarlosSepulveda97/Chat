const Chat = require('./models/Chat');


module.exports = function (io) {

    let users = {
    }
    //conexion socket del SERVER
    io.on('connection', async socket =>{//io tiene a todos los clientes conectados
        console.log('new user connected');

        let messages = await Chat.find({}).limit(8);
        socket.emit('load old msgs', messages);
        //eventos a los cuales esta a la escucha
        socket.on('new user', (data, cb) => {
            console.log("------------")
            console.log(data);
            if (data in users){//esta
                cb(false);
            }else {
                cb(true);
                socket.nickname = data;
                users[socket.nickname] = socket;
                updateNicknames();
            }
        })

        socket.on('send message', async (data, cb) => {

            var msg = data.trim();

            if (msg.substr(0,3) === '/W '){
                msg = msg.substr(3);
                const index = msg.indexOf(' ');
                if (index !== -1){
                    var name = msg.substr(0,index); //substring
                    var msg = msg.substr(index + 1);//substring
                    if (name in users){
                        users[name].emit('whisper', {
                            msg,
                            nick: socket.nickname
                        })
                    }else{
                        cb('Error! please enter a valid user')
                    }
                }else{
                    cb('Error! please enter your message')
                }
            }else{

                var newMSG = new Chat({
                    msg,
                    nick: socket.nickname 
                })
                await newMSG.save()

                io.sockets.emit('new message', {
                    msg: data,
                    nick: socket.nickname
                });
            }
            
        })

        socket.on('disconnect', data =>{
            if (!socket.nickname) return;
            delete users[socket.nickname];
            updateNicknames();
        })

        function updateNicknames(){
            io.sockets.emit('usernames', Object.keys(users));
        }
    })
}
