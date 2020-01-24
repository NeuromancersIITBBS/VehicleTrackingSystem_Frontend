// Make Connection
let socket = io.connect('http://localhost:5500');
let driverID = 0;
let colorCode;
let occupiedSeats;
let allUsers = [];
let myUsers = [];

window.onload = function () {


	// Listen for location value
	socket.on('location', (data) => {
		console.log(data);
		lat.innerHTML = data.location.lat;
		lng.innerHTML = data.location.lng;
	});

};

// Call back function for getLocation
function emitLocation(location) {
	socket.emit('location', {
		id: driverID,
		location: {
			lat: location.coords.latitude,
			lng: location.coords.longitude
		},
		timestamp: Date.now()
	});
	console.log(location);
}
