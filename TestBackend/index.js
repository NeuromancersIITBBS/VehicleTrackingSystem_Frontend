const socket = require('socket.io');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('../VTSFrontend'));

let server = app.listen(3000, () => { console.log('Now listening to port 3000!') });

let io = socket(server);
// To be obtained by database
let users = [];
let uniqueID = 0;

io.on('connection', (socket) => {
    let userDriverList = {"userList":userList, "driverList":driverList};
    console.log('made socket connection: ' + socket.id);

    socket.on('book', (user) => {
        console.log(`BOOK: ${user.id}`);
        userList.push(user);
        // user.ID == id of the user (socket.id of the user)
        // Confirm Booking
        io.emit('bookResponse', {id: 11});
        io.emit('bookResponse', {id: user.id});
        //            2.) Update after every change  
        io.emit('updateMapData', userDriverList);
    });

    socket.on('unbook', (userID) => {
        console.log(`UNBOOK: ${userID}`);
        const index = userList.findIndex(user => user.ID == userID);
        userList.splice(index, 1);
        // Confirm UnBook
        io.emit('unbookResponse', {id: userID});
        // 2 Options: 1.) Update after every 1-2 min
        //            2.) Update after every change  
        io.emit('updateMapData', userDriverList);
    });

    socket.on('gotIn', (userID) => {
        // Works same as unbook
        // Can be used to determine the destination of the BOV
        console.log(`GOTIN: ${userID}`);
        const index = userList.findIndex(user => user.ID == userID);
        userList.splice(index, 1);
        // Confirm GotIn
        io.emit('gotInResponse', {id: userID});
        // 2 Options: 1.) Update after every 1-2 min
        //            2.) Update after every change  
        io.emit('updateMapData', userDriverList);
    });

    // Implementation of first Option
    // setInterval(() => {io.emit('updateMapData', userDriverList)}, updateTimeInterval*1000);
});