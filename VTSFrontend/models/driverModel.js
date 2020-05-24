//This file contains all the socket listeners for driver.
//Updates driver information to all socket clients
function updateDriverInfo() {   
	const driverData = JSON.parse(localStorage.getItem('driverData'));
	socket.emit('updateDriverData',driverData);
	console.log('Calling for driver update');
	updateDriverStatus(driverData);
	//Driver object
	//socket.emit('updateDriverInfo',{ id: driverID, occupiedSeats: occupiedseats, colorCode: colorCode });
}

function updateDriverLocation(){
	const driverData = JSON.parse(localStorage.getItem('driverData'));
	socket.emit('updateDriverLocation',driverData);
	updateDriverMarker(driverData);
}

function setupSocketDriver(){

	

	//Storing the base data and adding markers to map.
	
	socket.on('connectionResponse', (data) => {

		//Arrays declared in driverSocket
		allUsers = data.userList;
		allDrivers = data.driverList;
		console.log('All users :' + allUsers);
		console.log('All Drivers : ' + allDrivers);
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
		if(JSON.parse(localStorage.getItem('driverData'))==null){
			console.error("Something is wrong");
		}
		else{
			var sessionDriver = JSON.parse(localStorage.getItem('driverData'));
			if(sessionDriver.phoneNumber === driverData.phoneNumber){
				sessionDriver.timeStamp = driverData.timeStamp;
				localStorage.setItem('driverData', JSON.stringify(sessionDriver));
				console.log("Driver marker added.")
			}
		}
		addDriverMarker(driverData);
		allDrivers.push(driverData);
		console.log("Added driver with phoneNumber : " + driverData.phoneNumber);
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