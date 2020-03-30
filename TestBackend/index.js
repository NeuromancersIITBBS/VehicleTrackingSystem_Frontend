const socket = require('socket.io');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('../VTSFrontend'));

let server = app.listen(4000, () => { console.log('Now listening to port 4000!') });

let io = socket(server);
// To be obtained by database
let users = [];
let uniqueID = 0;

io.on('connection', (socket) => {
	console.log('made socket connection on socket: ' + socket.id);
	socket.on('location', (data) => {
		console.log(`Location updated to ${data.location.lat} and ${data.location.lng}`);
		io.emit('driverInfo', data);
	});






	// BOOK Request: /book (POST)
	// app.post('/book', (req, res) => {
	// 	let user = req.body;
	// 	console.log('Book Request');
	// 	console.log(user);
	// 	user.id = uniqueID++;
	// 	users.push(user);
	// 	// Create a session using cookie-parser/sessions
	// 	res.send(user.id.toString());
	// });
	socket.on('book',(data)=>{
		console.log(data);
		console.log('Book Request');
		let user=data;
		user.id = uniqueID++;
		users.push(data);
		console.log(user.id);
		io.emit('bookResponse',user.id)
		io.emit('getUserInfo',users);
	});

	// UNBOOK Request: /unbook/:id GET
	// app.get('/unbook/:id', (req, res) => {
	// 	const userId = req.params.id;
	// 	console.log('Unbook Request from ' + userId);
	// 	// Find the userId in the array and delete that user
	// 	const index = users.findIndex(element => element.id == userId);
	// 	users.splice(index, 1);
	// 	res.status(200).send("Success");
	// });
	socket.on('unBook',(uniqueId)=>{
		console.log('Unbook Request from ' + uniqueId);
		const index = users.findIndex(element => element.id == uniqueId);
			users.splice(index, 1);
		io.emit('getUserInfo',users);
	});
	//gotin request
	// app.get('/gotin/:id', (req, res) => {
	// 	const userId = req.params.id;
	// 	console.log('Unbook Request from ' + userId);
	// 	// Find the userId in the array and delete that user
	// 	const index = users.findIndex(element => element.id == userId);
	// 	users.splice(index, 1);
	// 	res.status(200).send("Success");
	// });
	socket.on('gotIn',(uniqueId)=>{
		console.log('Unbook Request from ' + uniqueId);
		// Find the userId in the array and delete that user
		const index = users.findIndex(element => element.id == uniqueId);
		users.splice(index, 1);
		io.emit('getUserInfo',users);
	});

	// socket.on('location', (data) => {
	//     socket.broadcast.emit('typing', data);
	// });
});
