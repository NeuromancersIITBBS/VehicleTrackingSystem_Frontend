
//Updates driver information to all socket clients
function updateDriverInfo() {   
	socket.broadcast.emit('updateDriverData',driverData);
	console.log('updated Driver data');
	//Driver object
	//socket.emit('updateDriverInfo',{ id: driverID, occupiedSeats: occupiedseats, colorCode: colorCode });
}

function updateDriverLocation(){
	socket.emit('updateDriverLocation',driverData);
}

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
	removeMarker(user);
	//removing user from the user list
	const index = userList.findIndex(member => member.id == user.id);
	userList.splice(index, 1);

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
	removeMarker(driverData);
	const index = allDrivers.findIndex(driver=> driver.id == driverData.id)
	allDrivers.splice(index,1);
})

//Update Location of the driver marker
socket.on('updateDriverLocation',(driverData)=>{
	updateDriverMarker(driverData);
});

//Update the Colour of the marker if needed.
socket.on('updateDriverData',(driverData)=>{
	updateMarkerStatus(driverData);
});
