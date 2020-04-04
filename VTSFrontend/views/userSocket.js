// Make Connection
let socket = io.connect('http://localhost:3000');
let allUsers = [];
let uniqueId;

$(document).ready(async function () {
	// Send the request for base data
	socket.emit('onConnection');
	// TODO: PROPAGATE THE BASE DATA
	// alUsers is declared in DriverSocket.
	socket.on('connectionResponse', (data) => {
		allUsers = data.userList;
		allDrivers = data.driverList;

		console.log(allUsers)
	});
	/**=======================================
	 * MOVE THESE CODE TO APPROPRIATE LOCATION 
	** ========================================*/
	socket.on('addUser', (user) => {
		allUsers.push(user);
		console.log(`Added User ${user.id} in user array`);
	});
	socket.on('removeUser', (user) => {
		//removing user from the user list
		const index = userList.findIndex(member => member.id == user.id);
        userList.splice(index, 1);

		console.log(`Removed User ${user.id} from user array`);
		// If ID matches remove the session details
		if(user.id == JSON.parse(localStorage.getItem('userData')).id){
			localStorage.removeItem('userData');
			$('#bookIn').show();
			$('#bookOut').hide();
		}
	});

	/**========================================
	 * PERFORM THE ACTIONS ON APPROPRIATE ARRAY
	** ========================================*/
	if(JSON.parse(localStorage.getItem('userData'))==null){
		console.log("New Session !!")
	}
	else{
		const userData = JSON.parse(localStorage.getItem('userData'));
		var present = new Date().getTime();
		var timePassed= (present - userData.timeStamp)/1000;
		//console.log(timeStamp);
		console.log(present);
		console.log(timePassed);
		if(timePassed < waitingTime){
			timeout(waitingTime-timePassed,userData.id);
			console.log("Welcome Back !!");
			$('#bookIn').hide();
			$('#bookOut').show();
		}
		else{
			console.log("The earlier session was timed out, welcome to new sesioin");
		}
	}
	$('#confirmBook').click(async function () {
		//alert if the pickup and drop locations are same-
		if($('#userLocation').val()===$('#destination').val()){
			alert("The Pickup location and Destination are same !");
		} else{
		let pickupObj = {};
		$('#bookIn').hide();
		$('#bookOut').show();
		
		// Get GPS location of User
		
		if($('#userLocation').val()==='YourLocation'){
			if(navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(async (position) => {
					pickupObj = {
						pickupPoint: 'custom',
						location: {
							lat: position.coords.latitude,
							lng: position.coords.longitude
						}
					};
					uniqueId = await bookController(pickupObj);
				});
			} else {
				alert('Geolocation is not supported by this browser.');
			  }
		}
		else{
			pickupObj = {
				pickupPoint: $('#userLocation').val(),

				// needs to be updated
			};
			uniqueId = await bookController(pickupObj);
		}	
		}

	});

	$('#unBook').click(function () {
		$('#bookOut').hide();
		$('#bookIn').show();
		unbookController();
	});
	$('#gotIn').click(function () {
		$('#bookOut').hide();
		$('#bookIn').show();
		gotInController();
	});
	// await bovData();
	markers = initMarkers(3);
	socket.on('driverInfo', updateLocation);
});
