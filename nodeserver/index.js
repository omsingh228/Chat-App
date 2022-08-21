//Node server which will handle sockket.io connections. socket.io will create a double-way connection between server and client, whichever will have update will post it. So client didn't have to post update for each message. 
const io = require('socket.io')(5000);

const users = {};

io.on('connection', socket => {

    //If any person joins with unique name, let other person know!
    socket.on('new-user-joined', name => {  //We will write a code in client.js for this... new-user-joined is a defined event in syntax 
        //console.log("New User",name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name); //We will write a code in client.js for this
    });

    //If any person sends a message, broadcast it to other people
    socket.on('send', message => { //send is a defined event in syntax
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });   //We will write a code in client.js for this
    });

    //If any person joins with unique name, let other person know!
    socket.on('disconnect', message => { //disconnect is a defined event in syntax
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
    });
})