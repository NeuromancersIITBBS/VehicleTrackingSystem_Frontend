// Make Connection
let socket = io.connect('https://vts189.herokuapp.com');
let allUsers = [];
let allDrivers = [];
let uniqueId;
const interval = 20;
// let dummyUser={
// 	id: 'SDSFBJQ34724tu',
// 	location :{
// 		pickupPoint : 'MBLD',
// 		location : {lat:20.148816, lng:85.671412}
// 	},
// 	destination : 'SHR'
// }

//function call in userMap.js
function after_init_map_user(){
$(document).ready(async function () {
	
	//localStorage.removeItem('driverData');

	// Send the request for base data
	socket.emit('onConnection');

	//addMarker(dummyUser);
	//console.log('Marker Added');
	if(JSON.parse(localStorage.getItem('userData'))==null){
		console.log("New Session !!")
	}
	else{
		const userData = JSON.parse(localStorage.getItem('userData'));
		var present = new Date().getTime();
		var timePassed= (present - userData.timeStamp)/1000;
		//console.log(timeStamp);
		console.log("Present time is : " + present);
		console.log("Session time : " + timePassed);
		if(timePassed < waitingTime){
			//timeout function defined in userModal.js
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
			$.ajax({
				method: "GET",
				url: "https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572",
				success: function(res,status,xhr){
					const userData = JSON.parse(res);
					pickupObj = {
						pickupPoint: 'custom',
						location: {
							lat: userData.latitude,
							lng: userData.longitude,
						}
					};
				},
				error: function(xhr) {
					console.log("Your location could'nt be found.");
					alert("Error");
				},
			});
			uniqueId = await bookController(pickupObj);
		}
		else{
			pickupObj = {
				pickupPoint: $('#userLocation').val(),
				location : coordMap($('#userLocation').val())
				// check above lines
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
	//markers = initMarkers(3);
	//socket.on('driverInfo', updateLocation);
});
}