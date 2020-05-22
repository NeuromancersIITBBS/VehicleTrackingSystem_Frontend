//This file contains all the socket listeners for driver.
//Updates driver information to all socket clients
function updateDriverInfo() {   
	socket.emit('updateDriverData',driverData);
	console.log('Calling for driver update');
	updateDriverStatus(driverData);
	//Driver object
	//socket.emit('updateDriverInfo',{ id: driverID, occupiedSeats: occupiedseats, colorCode: colorCode });
}

function updateDriverLocation(){
	socket.emit('updateDriverLocation',driverData);
	updateDriverMarker(driverData);
}

function setupSocketDriver(){

	//Storing the base data and adding markers to map.
	
	socket.on('connectionResponse', (data) => {

		//Arrays declared in driverSocket
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
		removeUserMarker(user);
		//removing user from the user list
		const index = allUsers.findIndex(member => member.id == user.id);
		allUsers.splice(index, 1);

		console.log(`Removed User ${user.id} from user array`);

	});

	//Listening to socket calls

	//Add new driver marker to map
	socket.on('addDriver',(driverData)=>{
		addDriverMarker(driverData);
		allDrivers.push(driverData);
	})

	//Remove driver from the map
	socket.on('removeDriver',(driverData)=>{
		removeDriverMarker(driverData);
		const index = allDrivers.findIndex(driver=> driver.phoneNumber == driverData.phoneNumber)
		allDrivers.splice(index,1);
	})

	//Update Location of the driver marker
	socket.on('updateDriverLocation',(driverData)=>{
		console.log("Calling updateDriverMarker function.");
		updateDriverMarker(driverData);
	});

	//Update the Colour of the marker if needed.
	socket.on('updateDriverData',(driverData)=>{
		updateDriverStatus(driverData);
	});

}