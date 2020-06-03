// Make Connection
let socket = io.connect('https://vts189.herokuapp.com');
let driverID = 0;
let colorCode;
let occupiedSeats;
let allUsers = [];
let allDrivers = [];
let timeGap = 20;

//Dummy Assigning Need to Remove .
// let driverData={
// 	phoneNumber : '3759y3457',
// 	key : 'awfdrberigewebu',
// 	occupiedSeats : 0,
// 	location : {
// 		pickupPoint : 'custom',
// 		location : {lat:20.148816, lng:85.671412}
// 	},
// 	destination : 'BHR',
// 	status : 'active'
// };

//function call in driverMap.js

var driverData = JSON.parse(localStorage.getItem('driverData'));

if(driverData == null){
	console.log("At driver page local storage empty");
	window.location.href = "./driverSignUp.html";	
}

function after_init_map_driver(){
	console.log('Init map is executed');
$(document).ready(async function () {

	//localStorage.removeItem('driverData');
	
	var driverData = JSON.parse(localStorage.getItem('driverData'));
	if(driverData == null){
		console.log("At driver page local storage empty");
		window.location.href = "./driverSignUp.html";	
	}
	else{
		var token = driverData.token;
		var location = driverData.location;
		// Send the request for base data
		socket.emit('onConnection');

		// The socket respones are in driverModel.js
		socket.emit('registerDriver', {token, location});
		console.log("Request for activating driver.");

		//addDriverMarker(driverData);
		
		if(driverData.destination !== null){

			driverData = JSON.parse(localStorage.getItem('driverData'));
			console.log("Session recovered, phoneNumber is "+driverData.phoneNumber+"!!")
			$('#occupiedSeats').parent().find("input").val(driverData.occupiedSeats);
			$('#bovDestination').parent().find("input").val(driverData.destination);
			//defined in driverInfoView.js try to improve the code quality.
			selectOption(driverData.destination);
			$('#status').parent().find("input").val(driverData.status);
		}
	}

	//routine to update Loction after every timeGap seconds
	//needs to be tested
	setInterval(()=>{
		$.ajax({
			method: "GET",
			url: "https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572",
			success: function(res,status,xhr){
				const userData = JSON.parse(res);
				const location = {
					lat: userData.latitude,
					lng: userData.longitude, 
				}
				var driverData = JSON.parse(localStorage.getItem('driverData'));
				driverData.location = location;
				localStorage.setItem('driverData', JSON.stringify(driverData));
				updateDriverLocationController();
			},
			error: function(xhr) {
				console.log("Your location could'nt be found.");
				alert("Error");
			},
		});		
	},timeGap*1000); 

	$('#updateDriverInfoBtn').click(()=>{
		// if(JSON.parse(localStorage.getItem('driverData'))!=null){
		// 	localStorage.removeItem('driverData');
		// }
		var driverData = JSON.parse(localStorage.getItem('driverData'));
		$.ajax({
			method: "GET",
			url: "https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572",
			success: function(res,status,xhr){
				const userData = JSON.parse(res);
				console.log(userData);
				const location = {
					lat: userData.latitude,
					lng: userData.longitude, 
				}
				driverData.location = location;
			},
			error: function(xhr) {
				console.log("Your location could'nt be found.");
				alert("Error");
			},
		});
		driverData.destination= $("#bovDestination").val();
		driverData.status= $("#status").val();
		driverData.occupiedSeats= $("#occupiedSeats").val();
		localStorage.setItem('driverData', JSON.stringify(driverData));
		updateDriverLocationController();
		updateDriverInfoController(driverData);
		console.log('updated successfully !');
	});
	//console.log("I am here.")

	//On Logout Functionalities
	//Need to be tested
	$('#logOut').click( async function(event){
		event.preventDefault();
		var driverData = JSON.parse(localStorage.getItem('driverData'));
		$.ajax({
            type: 'POST',
            url: 'https://vts189.herokuapp.com/vts/new_driver/logout',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(driverData),
            success: function(data, status, xhr){
                if(JSON.parse(localStorage.getItem('driverData'))!=null){
					console.log("Removing driverData from local storage..");
					localStorage.removeItem('driverData');
				}
				console.log("Driver logged out");
				socket.emit("unregisterDriver",driverData);
				window.location.href = "./driverSignUp.html";
            },
            error: function(xhr, status, data){
                alert('Error while logging out')
            },
		});
		console.log("I am at Logout");

		//window.location.href = "./driverSignUp.html";
	}); 
});

}
