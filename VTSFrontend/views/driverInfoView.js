//View function

function updateSeatsAndCode() {

	let seats = document.getElementById('occupiedSeats').value;
	let code = document.getElementById('setDestination').value;
	console.log(seats);
	updateDriverInfoController(driverID, seats, code); //calling model function
};

function getUserInformation() {
	let res = getUserInfoController(); //calling model function
	res.forEach((item) => {
		allUsers.push(item);
		let latlng = new google.maps.LatLng(item.coords.lat, item.coords.lng);
		setMarker(mapAll, latlng, item.colorCode);// map which has all users
		if (item.colorCode == colorCode) {
			myUsers.push(item);
			setMarker(mapMy, latlng, item.colorCode);// map which has his Users
		}
	});
};

function setMarker(map, latlng, color){
	new google.maps.Marker({
		map: map, position: latlng,
		icon: {
			path: google.maps.SymbolPath.CIRCLE,
			fillColor: color,
			scale: 4
		}
	});
};
