// Make Connection
let socket = io.connect('http://localhost:3000');

let uniqueId;

$(document).ready(async function () {
	$('#confirmBook').click(async function () {
		//if else statement should be added for checking if destination and pickup points are same-
		let pickupObj = {};
		$('#bookIn').hide();
		$('#bookOut').show();
		// Get GPS location of User

		if($('#userLocation').val()==='YourLocation'){
			if(navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(async (position) => {
					pickupObj = {
						pickupPoint: 'custom',
						loaction: {
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
	});

	$('#unBook').click(function () {
		$('#bookOut').hide();
		$('#bookIn').show();
		unbookController(uniqueId);
	});
	$('#gotIn').click(function () {
		$('#bookOut').hide();
		$('#bookIn').show();
		gotInController(uniqueId);
	});
	// await bovData();
	markers = initMarkers(3);
	socket.on('driverInfo', updateLocation);
});
