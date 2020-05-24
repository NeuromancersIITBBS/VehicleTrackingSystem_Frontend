//these two functions initialize map
let map;
let markers = [];
let marker;

function initMap() {
	const options = {
		center: {
			lat: 20.147996,
			lng: 85.670970
		},
		zoom: 15.1
	};
	map = new google.maps.Map(document.getElementById('map'), options);
	setupSocketUser();
	after_init_map_user();
};

// lat: 20.147993,
// lng: 85.670953

function initMarkers() {
	let numOfMarkers = allUsers.length

	for (let i = 0; i < numOfMarkers; ++i) {
		if(typeof allUsers[i].location == undefined){
			console.log(allUsers[i]);
		}
		else{
			addMarker(allUsers[i]);
			console.log("Marker added : "+ allUsers[i]);
		}
	}
	numOfMarkers = allDrivers.length
	for (let i = 0; i < numOfMarkers; ++i) {
		if(typeof allDrivers[i].location == undefined){
			console.log(allDrivers[i]);
		}
		else{
			addMarker(allDrivers[i]);
		}		
	}
	//return markers;
}

// Utility function to add marker to the map.
function addMarker(userData){
	console.log(userData);
	let marker = new google.maps.Marker({
		position: userData.location.location,
		map: map,
		// types and icons defined in map utilities.
		icon: icons[types[userData.destination].type].icon
		//`http://maps.google.com/mapfiles/kml/paddle.png`//for testing purpose
		//icons[types[userData.destination].type].icon
	});
	let contentString = '<strong> Destination : </strong>'+'<strong>'+userData.destination+'</strong>';

	let infowindow = new google.maps.InfoWindow({
		content: contentString
	  });
	marker.addListener('click', function() {
		infowindow.open(map, marker);
	  });
	var markerObj = {
		id : userData.id,
		mark : marker
	}
	console.log(markerObj);
	markers.push(markerObj);
}

// Same as above just made to differentiate user and driverIcons. 
function addDriverMarker(userData){
	console.log("Adding driver marker : "+userData.phoneNumber);
	marker = new google.maps.Marker({
		position: userData.location,
		map: map,
		// types and icons defined in map utilities.
		icon: driverIcons[types[userData.destination].type].icon
	});
	if(userData.status!='active'){
		marker.icon = './views/Images/inactive.png'; 
	}
	else{
	let contentString = '<strong> Destination : </strong>'+'<strong>'+userData.destination+'</strong>';

	let infowindow = new google.maps.InfoWindow({
		content: contentString
	  });
	marker.addListener('click', function() {
		infowindow.open(map, marker);
	  });
	}
	var markerObj = {
		phoneNumber : userData.phoneNumber,
		mark : marker
	}
	console.log(markerObj);
	markers.push(markerObj);
}

//Updates Driver Marker Location
function updateDriverMarker(driverData){
	console.log(driverData);
	const index = markers.findIndex(marker => marker.phoneNumber == driverData.phoneNumber);
	//console.log(markers[index]);
	if(index === -1){
		console.error("Index not found");
	}
	else{
		markers[index].mark.setMap(driverData.location);
		markers[index].mark.position = driverData.location;
		console.log(`Present location is ${markers[index].mark.position}`);
	}
}


// Check if there is a change in status or destination update the colour of the driver marker.
function updateDriverStatus(driverData){
	const index = markers.findIndex(marker => marker.phoneNumber == driverData.phoneNumber);
	console.log("Checking if update is required...");
	if(driverData.status=="active"){
		console.log("Updating marker");
		if(markers[index].mark.icon=='./views/Images/inactive.png'){
			markers[index].mark.icon = driverIcons[types[driverData.destination].type].icon;
			removeDriverMarker(driverData);
			addDriverMarker(driverData);
			console.log("Updated marker to active.");
		}
		//else if(markers[index].mark.icon!=driverIcons[types[driverData.destination].type].icon){
		else{
			markers[index].mark.icon = driverIcons[types[driverData.destination].type].icon;
			console.log("Updating marker color");
			removeDriverMarker(driverData);
			addDriverMarker(driverData);
			console.log("Update completed.");
		}
	}
	else{
		if(markers[index].mark.icon!='./views/Images/inactive.png'){
			markers[index].mark.icon = './views/Images/inactive.png';
			removeDriverMarker(driverData);
			addDriverMarker(driverData);
			console.log("Updated marker to in-active.");
		}
	}
}

//Utility function to remove user marker
function removeUserMarker(userData){
	const index = markers.findIndex(marker => marker.id == userData.id);
	if(index === -1){
		console.error("Marker not found");
	}
	else{
		//console.log(markers[index]);
		markers[index].mark.setMap(null);
		markers.splice(index,1);
		console.log('Removed marker');
	}
}

//Utility function to remove driver marker
function removeDriverMarker(driverData){
	const index = markers.findIndex(marker => marker.phoneNumber == driverData.phoneNumber);
	if(index === -1){
		console.error("Marker not found");
	}
	else{
		//console.log(markers[index]);
		markers[index].mark.setMap(null);
		markers.splice(index,1);
		console.log('Removed marker');
	}
}

