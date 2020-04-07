let coords;

/// TO DO: Implement update driverInformation function and also write function to display all Drivers on connection
function updateDriverTemplate(driverData){
	const index =allDrivers.findIndex(driver => driver.id==driverData.id);
	allDrivers[index]=driverData;
	/// Complete the code....
}

// function updateLocation(data) {
// 	console.log(data);
// 	if (data.id < 3) {
// 		let latlng = new google.maps.LatLng(data.location.lat, data.location.lng);
// 		markers[data.id].setPosition(latlng);
// 		switch (data.id) {
// 			case 0:
// 				$("#bov1").css("color", "data.colorCode");
// 				$("#bov1h4").text("BOV-1");
// 				$("#bov1h5").text("Destiny : " + data.colorCode);
// 				$("#bov1h5").text("Vacancy : " + data.occupiedSeats);
// 				break;
// 			case 1:
// 				$("#bov2").css("color", "data.colorCode");
// 				$("#bov2h4").text("BOV-2");
// 				$("#bov2h5").text("Destiny : " + data.colorCode);
// 				$("#bov2h5").text("Vacancy : " + data.occupiedSeats);
// 				break;
// 			case 2:
// 				$("#bov3").css("color", "data.colorCode");
// 				$("#bov3h4").text("BOV-3");
// 				$("#bov3h5").text("Destiny : " + data.colorCode);
// 				$("#bov3h5").text("Vacancy : " + data.occupiedSeats);
// 				break;
// 		}
// 	}
// }


