// Make Connection
let socket = io.connect('http://localhost:4000');
//let coords;

$(document).ready(async function () {
	$('#confirmBook').click(function () {
		$('#bookIn').hide();
		$('#bookOut').show();
		// Get GPS location of User
		if($('#userLocation').val()==='YourLocation'){
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((position) => {
					pickupObj = {
						pickupPoint: 'Custom', 
						loaction: {
							lat: position.coords.latitude,
							lng: position.coords.longitude
						}
					};
				});
			  } else {
				alert('Geolocation is not supported by this browser.');
			  }
		}
		else{
			pickupObj = {
				pickupPoint: $('#userLocation').val(),
			};
		}
		let userId = bookController(pickupObj);
	});

	$('#unBook').click(function () {
		$('#bookOut').hide();
		$('#bookIn').show();
		unBookController(uniqueId);
	});
	$('#gotIn').click(function () {
		$('#bookOut').hide();
		$('#bookIn').show();
		gotInController(uniqueId);
	});
	// await bovData();
	markers = initMarkers(3);
	socket.on('location', updateLocation);
});
