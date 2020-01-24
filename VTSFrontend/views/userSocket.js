// Make Connection
let socket = io.connect('http://localhost:4000');
//let coords;

$(document).ready(async function () {
	$("#confirmBook").click(function () {
		$("#bookIn").hide();
		$("#bookOut").show();
		// Get GPS location of User
		if($("#userLocation").val()==="YourLocation"){
			navigator.geolocation.getCurrentPosition(success,failure);
			function success(position){
			  coords = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
			  uniqueId=bookController(coords);
			console.log(coords);}
			function failure(){}
		}
		else{
			coords=$("#userLocation").val();
			uniqueId=bookController(coords);
		}

		
	});
	$("#unBook").click(function () {
		$("#bookOut").hide();
		$("#bookIn").show();
		unBookController(uniqueId);
	});
	$("#gotIn").click(function () {
		$("#bookOut").hide();
		$("#bookIn").show();
		gotInController(uniqueId);
	});
	// await bovData();
	markers = initMarkers(3);
	socket.on('location', updateLocation);
});
