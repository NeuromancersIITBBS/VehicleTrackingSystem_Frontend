//BOOK function to update the user's location and his destination (ajax POST)
function book (pickupObject) {
	let endpoint = `http:\\vts_backend`;
	let jsObj = {
		location: pickupObject,
		destination: $("#destination").val(),
		timeStamp: new Date().getTime()
	};
	let jsonObj = JSON.stringify(jsObj);
	$.ajax({
		url: endpoint,
		method: 'POST',
		data: jsonObj,
		contentType: 'application/json',
	}).done(function (response) {
		console.log('Success');
		return response;
	}).fail(function () {
		alert('fail!');
	}).always(function () {
	});
}
/////// ajax call for UNBOOKING
function unBook(uniqueId) {
	let endpoint = `http:\\vts_backend`;
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
function gotIn(uniqueId) {
	let endpoint = `http:\\vts_backend`;
	let jsObj = {
		Id: uniqueId,
	};

	let jsonObj = JSON.stringify(jsObj);
	$.ajax({
		url: endpoint,
		method: 'POST',
		data: jsonObj,
		contentType: 'application/json',
	}).done(function (response) {
		console.log('Success');
	}).fail(function () {
		alert('fail!');
	})
}
