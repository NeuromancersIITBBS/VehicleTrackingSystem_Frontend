/** ==============================
 *  TODO: Add a check statement along with a "smart" timer to clear the local storage on time
 *  Suggestion: OnDocumentReady: if the timestamp of localstorage is older than waiting time remove that entry
 * 				Else set a timer for waitingTime-(currTime-timeStamp) time to remove the localstorage
 * 	It all starts with the book request
 * ===============================*/

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
		} else{
			console.error('ID not matching');
		}
	});
	return socket.id;
}
/////// socket call for UNBOOKING
function unbook() {
	const {id} = JSON.parse(localStorage.getItem('userData'));
	socket.emit('unbook',id);
	socket.on('unbookResponse',(response)=>{ 
		if(response.id == id){
			// Remove the data from the local storage
			localStorage.removeItem('userData');
		} else{
			console.error('ID not matching');
		}
	});
}

///////////// socket call for GOTIN
function gotIn() {
	const {id} = JSON.parse(localStorage.getItem('userData'));
	socket.emit('gotIn', id);
	socket.on('gotInResponse',(response)=>{ 
		if(response.id == id){
				// Remove the data from the local storage
			localStorage.removeItem('userData');
		} else{
			console.error('ID not matching');
		}
	});
}
