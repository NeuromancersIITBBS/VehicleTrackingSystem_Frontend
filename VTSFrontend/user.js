let coords;
let uniqueId;

function updateLocation(data) {
	// Query DOM
	console.log(data);
	if (data.id < 3) {
		let latlng = new google.maps.LatLng(data.location.lat, data.location.lng);
		markers[data.id].setPosition(latlng);
	}
	let endpoint = "http:\\vts_backend";
	 $.ajax({
		url: endpoint,
		method: 'GET',
		dataType: 'json',
		error: function (err) {
			alert("Something went wrong, please try again.");
		},
		success: function (res) {
			console.log("Success!");
			console.log(res);
			let item=res;
				switch (item.Id) {
					case 0:
						$("#bov1").css("color", "item.colorCode");
						$("#bov1h4").text("BOV-1");
						$("#bov1h5").text("Destiny : " + item.colorCode);
						$("#bov1h5").text("Vacancy : " + item.occupiedSeats);
						break;
					case 1:
						$("#bov2").css("color", "item.colorCode");
						$("#bov2h4").text("BOV-2");
						$("#bov2h5").text("Destiny : " + item.colorCode);
						$("#bov2h5").text("Vacancy : " + item.occupiedSeats);
						break;
					case 2:
						$("#bov3").css("color", "item.colorCode");
						$("#bov3h4").text("BOV-3");
						$("#bov3h5").text("Destiny : " + item.colorCode);
						$("#bov3h5").text("Vacancy : " + item.occupiedSeats);
						break;
				}
		}
	});

}


//BOOK function to update the user's location and his destination (ajax POST)
let uniqueId=book(coords) {
	console.log(coords);
	let endpoint = `http:\\vts_backend`;
	let jsObj = {
		location: coords,
		destination:$("#destination").val(),
		Id: new Date().valueOf()
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
		return response;
	}).fail(function () {
		alert("fail!");
	}).always(function () {
	});
}


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
		}
	});
}
///////////// ajax call for GOTIN

function gotIn(uniqueId){
  let endPoint="http:\\vts_backend";
  let jsObj = {Id:uniqueId,
              };

  let jsonObj = JSON.stringify(jsObj);
  $.ajax({
    url : endpoint,
    method : 'POST',
    data : jsonObj,
                contentType : "application/json",
    }).done(function(response){
                console.log("Success");
    }).fail(function(){
                alert("fail!");
    }).always(function(){
    });
}
