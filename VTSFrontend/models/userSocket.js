// Make Connection
let socket = io.connect('http://localhost:4000');
let coords;

$(document).ready(async function () {
	$("#confirmBook").click(function () {
		$("#bookIn").hide();
		$("#bookOut").show();
		// // Get GPS location of User
		// navigator.geolocation.getCurrentPosition(success,failure);
		// function success(position){
		//   coords =new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
		// console.log(coords);}
		// function failure(){}
		userInfo(coords);
	});
	$("#unBook").click(function () {
		$("#bookOut").hide();
		$("#bookIn").show();
		unBook(uniqueId);
	});
	$("#gotIn").click(function () {
		$("#bookOut").hide();
		$("#bookIn").show();
	});
	// await bovData();
	markers = initMarkers(3);
	socket.on('location', updateLocation);
});