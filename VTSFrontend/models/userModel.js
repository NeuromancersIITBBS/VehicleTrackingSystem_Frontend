//BOOK function to update the user's location and his destination (ajax POST)
function book (pickupObject) {
	let endpoint = `http://localhost:4000/book`;
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
		console.log(response);
		return response;
	}).fail(function () {
		alert('fail!');
	}).always(function () {
	});
}
/////// ajax call for UNBOOKING
function unBook(uniqueId) {
	let endpoint = `http://localhost:4000/unbook/${uniqueId}`;
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
		}
	});
}
///////////// ajax call for GOTIN
function gotIn(uniqueId) {
	let endpoint = `http://localhost:4000/gotin/${uniqueId}`;
	let jsObj = {
		id: uniqueId,
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
