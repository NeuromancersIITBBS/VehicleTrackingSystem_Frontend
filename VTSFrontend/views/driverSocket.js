// Make Connection
let socket = io.connect('http://localhost:3000');
let driverID = 0;
let colorCode;
let occupiedSeats;
let allUsers = [];
let allDrivers = [];
let timeGap = 20;
//Dummy Assigning Need to Remove .
let driverData={
	id : '3759y3457',
	occupiedSeats : 0,
	location : {
		pickupPoint : 'custom',
		location : {lat:20.148816, lng:85.671412}
	},
	destination : 'BHR',
	status : 'active'
};

$(document).ready(async function () {


	// Send the request for base data
	socket.emit('onConnection');

	
	
	/**=====================================================================
	 * THE BELOW STATEMENT IS TO BE CHANGED AFTER SIGNUP PAGE IS OPERATIONAL
	** =====================================================================*/
	// Local Storage imlentation
	if(JSON.parse(localStorage.getItem('driverData'))==null){
		console.log("New Session !!");
		localStorage.setItem('driverData', JSON.stringify(driverData));
	}
	else{
		driverData = JSON.parse(localStorage.getItem('driverData'));
		$('#occupiedSeats').parent().find("input").val(driverData.occupiedSeats);
		$('#bovDestination').parent().find("input").val(driverData.destination);
		//defined in driverInfoView.js try to improve the code quality.
		selectOption(driverData.destination);
		$('#status').parent().find("input").val(driverData.status);
	}
	addDriverMarker(driverData);
	// if(navigator.geolocation) {
	// 	navigator.geolocation.getCurrentPosition(async (position) => {
	// 		pickupObj = {
	// 			pickupPoint: 'custom',
	// 			location: {
	// 				lat: position.coords.latitude,
	// 				lng: position.coords.longitude
	// 			}
	// 		};
	// 		console.log(pickupObj);
	// 		driverData.location = pickupObj;
	// 		addDriverMarker(driverData);
	// 		console.log(driverData);
	// 	});
	// } else {
	// 	alert('Geolocation is not supported by this browser.');
	//   }

	//routine to update Loction after every timeGap seconds
	//need to be tested
	setInterval(()=>{
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(async (position) => {
				pickupObj = {
					pickupPoint: 'custom',
					location: {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					}
				};
				driverData.location = pickupObj;
				updateDriverLocationController();
			});
		} else {
			alert('Geolocation is not supported by this browser.');
		  }
	},timeGap*1000); 

	$('#updateDriverInfoBtn').click(()=>{
		if(JSON.parse(localStorage.getItem('driverData'))!=null){
			localStorage.removeItem('driverData');
		}
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(async (position) => {
				pickupObj = {
					pickupPoint: 'custom',
					location: {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					}
				};
				driverData.location= pickupObj;
				//console.log(location);
				
			});
		} else {
			alert('Geolocation is not supported by this browser.');
		}
		driverData.destination= $("#bovDestination").val();
		driverData.status= $("#status").val();
		driverData.occupiedSeats= $("#occupiedSeats").val();
		localStorage.setItem('driverData', JSON.stringify(driverData));
		//let data= JSON.parse(localStorage.getItem('driverData'));
		//console.log(data,driverData);
		//console.log(location);
		updateDriverInfoController(driverData);
		console.log('updated successfully !');
	});
	console.log("I am here.")

	//On Logout Functionalities
	//Need to be tested
	$('#logOut').click( async function(){
		//needs to be updated.
		if(JSON.parse(localStorage.getItem('driverData'))!=null){
			localStorage.removeItem('driverData');
		}
		socket.emit('removeDriver',driverData);
	}); 
});


