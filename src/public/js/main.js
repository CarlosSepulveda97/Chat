$(function() {
    //conexion socket CLIENTE
    const socket = io();

    //obtaning DOM elements from the interface
    const $messageForm = $('#message-form');
    const $messageBox = $('#message');
    const $chat = $('#chat');

    //events 
    $messageForm.submit( e => {
        e.preventDefault('enviando datos');
        console.log($messageBox.val());
        socket.emit('send message', $messageBox.val())
        $messageBox.val('');
    })

    socket.on('new message',  function(data) {
        $chat.append(data + '<br>')
    })

})
