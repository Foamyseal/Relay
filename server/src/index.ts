export {}

const express = require('express');
const socketIo = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const { addUser, removeUser, getUser, getUsersInRoom } = require('./features/web-sockets/users');

io.on('connection', (socket: any) => {
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });
        console.log(error);
        if(error) return callback(error);
        
        socket.emit('message', { user: 'admin', text: `${user.name} , welcome to the room ${user.room}` })
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined`})

        socket.join(user.room);

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        console.log('server received');
        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();
    });


    socket.on('disconnect', () => {
        console.log('User left');
    });
})

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

