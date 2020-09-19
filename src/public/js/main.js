$(function() {
    //conexion socket CLIENTE
    const socket = io();

    //obtaning DOM elements from the interface
    const $messageForm = $('#message-form');
    const $messageBox = $('#message');
    const $chat = $('#chat');

    //obtaning Dom elements from the interface

    const $nickForm = $('#nickForm'); 
    const $nickError = $('#nickError');
    const $nickName = $('#nickname');

    const $users = $('#usernames');


    $nickForm.submit( e =>{
        e.preventDefault();
        console.log($nickName.val())
        socket.emit('new user', $nickName.val(), data => {
            console.log(data)
            if (data){
                $('#nickWrap').hide();
                $('#contentWrap').show();
            }else{
                $nickError.html(`
                    <div class="alert alert-danger">
                        That username already exist
                    </div>
                `)
            }
            $nickName.val('');
        });
    })

    //events 
    $messageForm.submit( e => {
        e.preventDefault('enviando datos');
        console.log($messageBox.val());
        socket.emit('send message', $messageBox.val())
        $messageBox.val('');
    })

    socket.on('new message',  function(data) {
        $chat.append('<b>'+ data.nick + ':</b> ' + data.msg + '</br>' )
    })

    socket.on('usernames', data => {
        let html = '';
        for (let i=0; i<data.length; i++){
            html += `<p class="ml-2"><i class="fas fa-user"></i>${data[i]}</p>`
        }
        $users.html(html);
    })


})
