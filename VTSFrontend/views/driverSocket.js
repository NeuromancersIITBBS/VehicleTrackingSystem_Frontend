// Make Connection
let socket = io.connect('http://localhost:3000');
let driverID = 0;
let colorCode;
let occupiedSeats;
let allUsers = [];
let allDrivers = [];

$(document).ready(async function () {


	// Send the request for base data
	socket.emit('onConnection');

	//Storing the base data and adding markers to map.
	socket.on('connectionResponse', (data) => {
		allUsers = data.userList;
		allDrivers = data.driverList;

		// Defined in userMap.js adds the markers of users and drivers
		initMarkers();

		console.log(allDrivers);
	});

	socket.on('addUser', (user) => {
		allUsers.push(user);
		addMarker(user);
		console.log(`Added User ${user.id} in user array`);
	});
	socket.on('removeUser', (user) => {
		//removing the user marker in map
		removeMarker(user);
		//removing user from the user list
		const index = userList.findIndex(member => member.id == user.id);
        userList.splice(index, 1);

		console.log(`Removed User ${user.id} from user array`);
		

	});
	
	if(JSON.parse(localStorage.getItem('userData'))==null){
		console.log("New Session !!")
	}
	else{
		let driverData = JSON.parse(localStorage.getItem('userData'));
		$('#occupiedSeats').placeholder = driverData.occupancy;
	}

	$('#updateDriverInfoBtn').click(()=>{
		localStorage.removeItem('driverData');
		driverData = {
			id = driverID,
			occupancy = $('#occupiedseats').value(),
			destination = $('#bovDestination').value(),
			status = $('#status').value()
		}
		localStorage.setItem('driverData', JSON.stringify(userData));
		updateDriverInfoController();
	});
	//On Logout Functionalities
	$('#logOut').click( async function(){
		//needs to be updated.

	}); 
});

// // Call back function for getLocation
// function emitLocation(location) {
// 	socket.emit('location', {
// 		id: driverID,
// 		location: {
// 			lat: location.coords.latitude,
// 			lng: location.coords.longitude
// 		},
// 		timestamp: Date.now()
// 	});
// 	console.log(location);
// }


