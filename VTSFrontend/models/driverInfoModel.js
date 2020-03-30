//function to update the driver's occupiedSeats and final destination (ajax POST)

function updateDriverInfo(driverID, occupiedseats, colorCode) {   //colorcode needs to be implemented properly
	console.log(occupiedseats);
	// let endpoint = `http:\\vts_backend`;
	// let data = { id: driverID, occupiedSeats: occupiedseats, colorCode: colorCode };
	// $.ajax({
	// 	url: endpoint,
	// 	method: 'POST',
	// 	data: JSON.stringify(data),
	// 	contentType: "application/json",
	// 	error: function (xhr) {
	// 		alert("Something went wrong, please try again.");
	// 	},
	// 	success: function (res) {
	// 		console.log("Success!");
	// 	}
	// });
	socket.emit('updateDriverInfo',{ id: driverID, occupiedSeats: occupiedseats, colorCode: colorCode });
}

//function to get USER data
	// let endpoint = `http:\\vts_backend`;
	// $.ajax({
	// 	url: endpoint,
	// 	method: 'GET',
	// 	data: 'json',
	// 	error: function (err) {
	// 		alert("Something went wrong, please try again.");
	// 	},
	// 	success: function (res) {
	// 		return res;
	// 	}
	// });
	socket.on('getUserInfo',(response)=>{allUsers=response;
	console.log(allUsers);});
