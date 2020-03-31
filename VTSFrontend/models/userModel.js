
//BOOK function to update the user's location and his destination (ajax POST)

function book (pickupObject) {
	const userData = {
		id: socket.id,
		location: pickupObject,
		destination: $("#destination").val(),
		timeStamp: new Date().getTime()
	};
	//localStorage.setItem('userData', JSON.stringify(userData));
	console.log('Book request successful !');
	socket.emit('book', userData);
	socket.on('bookResponse',(response)=>{ 
		if(response.id == socket.id){
			// Store the user data in localStorage
			localStorage.setItem('userData', JSON.stringify(userData));	
		}
	});
	return socket.id;
}
/////// socket call for UNBOOKING
function unbook(id) {
	const {id} = JSON.parse(localStorage.getItem('userData'));
	socket.emit('unbook',id);
	socket.on('unbookResponse',(response)=>{ 
		if(respons9980e.id == socket.id){
			// Remove the data from the local storage
			localStorage.removeItem('userData');
		}
	});
}

///////////// socket call for GOTIN
function gotIn() {
	const {id} = JSON.parse(localStorage.getItem('userData'));
	socket.emit('gotIn', id);
	socket.on('gotInResponse',(response)=>{ 
		if(response.id == socket.id){
				// Remove the data from the local storage
			localStorage.removeItem('userData');
		}
	});
}
