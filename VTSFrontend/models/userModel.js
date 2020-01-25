//BOOK function to update the user's location and his destination (ajax POST)
async function book (pickupObject) {
	let endpoint = `http://localhost:4000/book`;
	let jsObj = {
		location: pickupObject,
		destination: $("#destination").val(),
		timeStamp: new Date().getTime()
	};
	let jsonObj = JSON.stringify(jsObj);
	console.log(jsonObj);
	let response = $.ajax({
		url: endpoint,
		method: 'POST',
		data: jsonObj,
		contentType: 'application/json',
	}).done(function (response) {
		console.log('Success');
		console.log(response);
		// createCookie('uniqueId', response, 100);
		return response;
	}).fail(function () {
		alert('fail!');
	}).always(function () {
	});
	return response;
}
/////// ajax call for UNBOOKING
function unbook(uniqueId) {
	let endpoint = `http://localhost:4000/unbook/${uniqueId}`;
	$.ajax({
		url: endpoint,
		method: 'GET',
		contentType: 'application/json'
	}).done(function (res) {
		console.log("Success!");
	}).fail(function (err) {
		alert("Something went wrong, please try again.");
	}).always(function () {
	});
}
///////////// ajax call for GOTIN
function gotIn(uniqueId) {
	let endpoint = `http://localhost:4000/gotin/${uniqueId}`;	
	$.ajax({
		url: endpoint,
		method: 'GET',
		contentType: 'application/json',
	}).done(function (response) {
		console.log('Success');
	}).fail(function () {
		alert('fail!');
	}).always(function () {
	});
}
