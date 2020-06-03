let map;
let markers = [];
let marker;


function initMap() {
	const options = {
		center: {
			lat: 20.147993,
			lng: 85.670953
		},
		zoom: 15
	};
	map = new google.maps.Map(document.getElementById('drivermap'), options);

	setupSocketDriver();
	after_init_map_driver();
	driverInfoView();
};

function initMarkers() {
	let numOfMarkers = allUsers.length
	
	for (let i = 0; i < numOfMarkers; ++i) {
		addMarker(allUsers[i]);
	}
	numOfMarkers = allDrivers.length;
	console.log(numOfMarkers);
	for (let i = 0; i < numOfMarkers; ++i) {
		if(typeof allDrivers[i].location == undefined){
			console.log(allDrivers[i]);
		}
		else{
			addDriverMarker(allDrivers[i]);
		}		
	}
	//return markers;
}

// Utility function to add user marker to the map.
function addMarker(userData){
	marker = new google.maps.Marker({
		position: userData.location.location,
		map: map,
		// types and icons defined in map utilities.
		icon: icons[types[userData.destination].type].icon
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

function addDriverMarker(driverData){
	let contentString;
	let infowindow;
	console.log(driverData);
	marker = new google.maps.Marker({
		position: driverData.location,
		map: map,
		// types and icons defined in map utilities.
		icon: "./views/Images/newDriver.png"
	});
	if(driverData.destination == null){
		console.log("No destination for driver.");
		driverData.status = 'active';
	}
	else{
		marker.icon = driverIcons[types[driverData.destination].type].icon;
	}
	if(driverData.status != 'active'){
		marker.icon = './views/Images/inactive.png'; 
		contentString = '<strong> Not Active </strong>';
	}
	else{
		if(driverData.destination !== null){
			contentString = '<strong> Destination : </strong>'+'<strong>'+driverData.destination+'</strong>';
		}
		else{
			contentString = '<strong> Destination : N.A</strong>';
		}
	}
	console.log(contentString);
	infowindow = new google.maps.InfoWindow({
		content: contentString
	});
	marker.addListener('click', function() {
		infowindow.open(map, marker);
	});
	var markerObj = {
		phoneNumber : driverData.phoneNumber,
		mark : marker
	}
	console.log(markerObj);
	markers.push(markerObj);
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

//Updates Driver Marker Location
function updateDriverMarker(driverData){

	const index = markers.findIndex(marker => marker.phoneNumber == driverData.phoneNumber);
	//console.log(markers[index]);
	if(index === -1){
		console.error("Index not found");
	}
	else{
		markers[index].mark.setPosition(driverData.location);
		markers[index].mark.position = driverData.location;
		//console.log(`Present location is ${markers[index].mark.position}`);
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