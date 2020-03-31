//BOOK function to update the user's location and his destination (ajax POST)

function book (pickupObject) {
	// let endpoint = `http://localhost:3000/book`;
	// let jsObj = {
	// 	location: pickupObject,
	// 	destination: $("#destination").val(),
	// 	timeStamp: new Date().getTime()
	// };
	// let jsonObj = JSON.stringify(jsObj);
	// console.log(jsonObj);
	// let response = $.ajax({
	// 	url: endpoint,
	// 	method: 'POST',
	// 	data: jsonObj,
	// 	contentType: 'application/json',
	// }).done(function (response) {
	// 	console.log('Success');
	// 	console.log(response);
	// 	// createCookie('uniqueId', response, 100);
	// 	return response;
	// }).fail(function () {
	// 	alert('fail!');
	// }).always(function () {
	// });
	const userData = {
		id: socket.id,
		location: pickupObject,
		destination: $("#destination").val(),
		timeStamp: new Date().getTime()
	};
	socket.emit('book', userData);
	socket.on('bookResponse',(response)=>{ 
		if(response.id == socket.id){
			// Store the user data in localStorage
			localStorage.setItem('userData', JSON.stringify(userData));	
		}
	});
	return socket.id;
}
/////// ajax call for UNBOOKING
function unbook(uniqueId) {
	// let endpoint = `http://localhost:3000/unbook/${uniqueId}`;
	// $.ajax({
	// 	url: endpoint,
	// 	method: 'GET',
	// 	contentType: 'application/json'
	// }).done(function (res) {
	// 	console.log("Success!");
	// }).fail(function (err) {
	// 	alert("Something went wrong, please try again.");
	// }).always(function () {
	// });
	const {id} = JSON.parse(localStorage.getItem('userData'));
	socket.emit('unbook',id);
	socket.on('unbookResponse',(response)=>{ 
		if(response.id == socket.id){
			// Remove the data from the local storage
			localStorage.removeItem('userData');
		}
	});
}

///////////// ajax call for GOTIN
function gotIn(uniqueId) {
	// let endpoint = `http://localhost:3000/gotin/${uniqueId}`;
	// $.ajax({
	// 	url: endpoint,
	// 	method: 'GET',
	// 	contentType: 'application/json',
	// }).done(function (response) {
	// 	console.log('Success');
	// }).fail(function () {
	// 	alert('fail!');
	// }).always(function () {
	// });
	const {id} = JSON.parse(localStorage.getItem('userData'));
	socket.emit('gotIn', id);
	socket.on('gotInResponse',(response)=>{ 
		if(response.id == socket.id){
				// Remove the data from the local storage
			localStorage.removeItem('userData');
		}
	});
}
