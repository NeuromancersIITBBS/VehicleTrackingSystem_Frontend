let uniqueId;

function updateLocation(data) {
	// Query DOM
	let lat = $('#latVal'),
		lng = $('#lngVal');
	console.log(data);
	lat.text(data.location.lat);
	lng.text(data.location.lng);
	if (data.id < 3) {
		let latlng = new google.maps.LatLng(data.location.lat, data.location.lng);
		markers[data.id].setPosition(latlng);
	}
}


//function to update the user's location and his destination (ajax POST)
function userInfo(coords) {

	console.log(coords);
	let endpoint = `http:\\vts_backend`;
	let manualLocationUser = $("#desTi").val();
	console.log(manualLocationUser);
	let colorCode;
	uniqueId = new Date().valueOf();
	switch (manualLocationUser) {
		case "BHR":
			colorCode =1;
			break;
		case "BHR":
			colorCode =1;
			break;
		case "BHR":
			colorCode =1;
			break;
	}

	let jsObj = {
		location: coords,
		destination: colorCode,
		Id: uniqueId
	};
	let jsonObj = JSON.stringify(jsObj);
	console.log(jsonObj);
	$.ajax({
		url: endpoint,
		method: 'POST',
		data: jsonObj,
		contentType: "application/json",
	}).done(function (response) {
		console.log("Success");
	}).fail(function () {
		alert("fail!");
	}).always(function () {
	});
}



/// getting status of BOV's

var dataArray = [];
var bovData = async function () {
	let endpoint = "http:\\vts_backend";

	await $.ajax({
		url: endpoint,
		method: 'GET',
		dataType: 'json',
		error: function (err) {
			alert("Something went wrong, please try again.");
		},
		success: function (res) {
			console.log("Success!");
			console.log(res);
			dataArray = res;
		}
	});
}
dataArray.forEach(function (item) {
	switch (item.Id) {
		case 0:
			$("#bov1").css("color", "item.colorCode");
			$("#bov1").html("<h4>BOV-1</h4><h5>Destiny : " + relation.colorCode + "</h5><h5>Vacancy : " + item.occupiedSeats + "</h5>");
			break;
		case 1:
			$("#bov2").css("color", "item.colorCode");
			$("#bov2").html("<h4>BOV-2</h4><h5>Destiny : " + relation.colorCode + "</h5><h5>Vacancy : " + item.occupiedSeats + "</h5>");
			break;
		case 2:
			$("#bov3").css("color", "item.colorCode");
			$("#bov3").html("<h4>BOV-3</h4><h5>Destiny : " + relation.colorCode + "</h5><h5>Vacancy : " + item.occupiedSeats + "</h5>");
			break;
	}
});


/////// ajax call for UNBOOKING
function unBook(uniqueId) {
	let endPoint = "http:\\vts_backend";
	const userId = $.ajax({
		url: endpoint,
		method: 'GET',
		dataType: 'json',
		error: function (err) {
			alert("Something went wrong, please try again.");
		},
		success: function (res) {
			console.log("Success!");
			console.log(res);
			return res;
		}

	});
}
// ///////////// ajax call for GOTIN
//
// function gotIn(colorCode){
//   let endPoint="http:\\vts_backend";
//   let jsObj = {Id:uniqueId,
//                colorCode:colorCode
//               };
//
//   let jsonObj = JSON.stringify(jsObj);
//   $.ajax({
//     url : endpoint,
//     method : 'POST',
//     data : jsonObj,
//                 contentType : "application/json",
//     }).done(function(response){
//                 console.log("Success");
//     }).fail(function(){
//                 alert("fail!");
//     }).always(function(){
//     });
// }
