const socket = require('socket.io');
const express = require('express');
const app = express();

let server = app.listen(4000, () => {console.log('Now listening to port 4000!')});

let io = socket(server);

io.on('connection', (socket) => {
    console.log('made socket connection on socket: ' + socket.id);
    socket.on('location', (data) => { 
        console.log(`Location updated to ${data.location.lat} and ${data.location.lng}`);
        io.emit('location', data);  
    });

    // socket.on('location', (data) => {
    //     socket.broadcast.emit('typing', data);
    // });
});


