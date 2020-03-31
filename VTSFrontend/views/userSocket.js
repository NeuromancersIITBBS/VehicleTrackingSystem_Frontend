// Make Connection
let socket = io.connect('http://localhost:3000');

let uniqueId;

$(document).ready(async function () {
	if(JSON.parse(localStorage.getItem('userData'))==null){
		console.log("New Session !!")
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
			}	}

		});}
	else{
		console.log("Welcome Back !!")
		$('#bookIn').hide();
		$('#bookOut').show();
	}

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
