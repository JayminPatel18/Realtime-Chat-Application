// Node server which will handle socket io connections

const io = require('socket.io')(8000,{
    cors:{
        origin: "*"
    }
});

const users = {};

io.on('connection',socket =>{
    socket.on('new-user-joined', name =>{                      // this socket for new user joined to show 
        console.log("New User Joined ", name);
        users[socket.id] = name; 
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {                              // this socket for user meassage to show
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    socket.on('disconnect', message => {                              // this socket for user meassage to show
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });

});