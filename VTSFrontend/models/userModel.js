/** ==============================
 *  TODO: Add a check statement along with a "smart" timer to clear the local storage on time
 *  Suggestion: OnDocumentReady: if the timestamp of localstorage is older than waiting time remove that entry
 * 				Else set a timer for waitingTime-(currTime-timeStamp) time to remove the localstorage
 * 	It all starts with the book request
 * ===============================*/

const waitingTime = 20*60;

// Utility Function to set time out
//Initiates unbook request if the book request is still on after waiting time
function timeout(timeLeft,bookingId){
	   console.log(bookingId);
	   setTimeout(()=>{
		   const {id} = JSON.parse(localStorage.getItem('userData'));
		   console.log(id);
		   if(id === bookingId){
			   localStorage.removeItem('userData');
			   $('#bookOut').hide();
			   $('#bookIn').show();
			   console.log('Session Timed Out');
			   alert('Book request timed out, please book again.');
		   }
	   },timeLeft*1000);
} 

//BOOK function to update the user's location and his destination 

function book (pickupObject) {

   //var uID = Math.floor((Math.random() * 1000) + 1); 
   
   const userData = {
	   id : null,
	   socketId: socket.id,
	   location: pickupObject,
	   destination: $("#destination").val(),
	   timeStamp: new Date().getTime()
   };
   //userData.id = uID;
   //Initiates unbook request if the book request is still on after waiting time
   localStorage.setItem('userData', JSON.stringify(userData));
   timeout(waitingTime,userData.id);
   socket.emit('book', userData);
   return userData.id;
}

/////// socket call for UNBOOKING
function unbook() {
   const {id} = JSON.parse(localStorage.getItem('userData'));
   //console.log("The id sent to server is : " + id);
   socket.emit('unbook',id);
}

///////////// socket call for GOTIN
function gotIn() {
   const {id} = JSON.parse(localStorage.getItem('userData'));
   socket.emit('gotIn', id);
   
}

//function call in userMap.js
function setupSocketUser(){
   ////// Socket Listeners

   socket.on('bookResponse',(response)=>{
      const userData = JSON.parse(localStorage.getItem('userData'));
      //assigning the id from back-end
      userData.id=response.id;
      //add marker to the map
      addMarker(userData);
      // Store the user data in localStorage
      localStorage.setItem('userData', JSON.stringify(userData));
      console.log('Book request successful !');
      //Initiates unbook request if the book request is still on after waiting time
      timeout(waitingTime,userData.id);
   });

   socket.on('unbookResponse',(response)=>{ 
      const {id} = JSON.parse(localStorage.getItem('userData'));
      //console.log("The same id now is : "+ id);
      //console.log("The response id is : " + response.id);
	   if(id === response.id){
		   //Removing user from the user list
		   const index = allUsers.findIndex(member => member.id == id);
		   removeUserMarker(response);
		   allUsers.splice(index, 1);
		   console.log("Unbook success!!");
		   // Remove the data from the local storage
		   localStorage.removeItem('userData');
	   } else{
		   console.log('ID not matching');
	   }
   });

   socket.on('gotInResponse',(response)=>{ 
      const {id} = JSON.parse(localStorage.getItem('userData'));
	   if(id === response.id){
         const index = allUsers.findIndex(member => member.id == id);
		   removeUserMarker(response);
		   allUsers.splice(index, 1);
		   console.log("Unbook success!!");
		   // Remove the data from the local storage
		   localStorage.removeItem('userData');
	   } else{
		   console.error('ID not matching');
	   }
   });

   socket.on('connectionResponse', (data) => {
      allUsers = data.userList;
      allDrivers = data.driverList;

      // Defined in userMap.js adds the markers of users and drivers
      initMarkers();
   });

   // add new user to map.
   socket.on('addUser', (user) => {
      allUsers.push(user);
      addMarker(user);
      console.log(`Added User ${user.id} in user array`);
   });

   // remove user from the map.
   socket.on('removeUser', (user) => {
      //removing the user marker in map
      console.log("Remove user envoked !!");
      removeUserMarker(user);
      //removing user from the user list
      const index = allUsers.findIndex(member => member.id == user.id);
      allUsers.splice(index, 1);
      // If ID matches remove the session details
      if(localStorage.getItem('userData')){
         if(user.id == JSON.parse(localStorage.getItem('userData')).id){
	         localStorage.removeItem('userData');
	         $('#bookIn').show();
            $('#bookOut').hide();
         }
      }
      console.log(`Removed User ${user.id} from user array`);
   });

   //add new driver marker to map
   socket.on('addDriver',(driverData)=>{
      addDriverMarker(driverData);
      allDrivers.push(driverData);  
   })

   //remove driver from the map
   socket.on('removeDriver',(driverData)=>{
      removeDriverMarker(driverData);
      const index = allDrivers.findIndex(driver=> driver.phoneNumber == driverData.phoneNumber)
      allDrivers.splice(index,1);
   })

   ////////// socket Listener for driverLocationUpdate
   socket.on('updateDriverLocation',(driverData)=>{
     updateDriverMarker(driverData);
   });

   ////////// socket Listener for driverDataUpdate
   socket.on('updateDriverData',(driverData)=>{
      //To be updated.
      console.log("Looking for updates...");
      updateDriverMarker(driverData);
      updateDriverTemplate(driverData);
      updateDriverStatus(driverData);
   });
}
