let map;
let markers = [];



function initMap() {
	const options = {
		center: {
			lat: 20.147993,
			lng: 85.670953
		},
		zoom: 15
	};
	map = new google.maps.Map(document.getElementById('drivermap'), options);
	after_init_map_driver();
	driverInfoView();
};

function initMarkers() {
	let numOfMarkers = allUsers.size()

	for (let i = 0; i < numOfMarkers; ++i) {
		addMarker(allUsers[i]);
	}
	numOfMarkers = allDrivers.size()
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

// Utility function to add user marker to the map.
function addMarker(userData){
	let marker = new google.maps.Marker({
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
	let marker = new google.maps.Marker({
		position: userData.location.location,
		map: map,
		// types and icons defined in map utilities.
		icon: driverIcons[types[driverData.destination].type].icon
	});
	let contentString = '<strong> Destination : </strong>'+'<strong>'+driverData.destination+'</strong>';

	let infowindow = new google.maps.InfoWindow({
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
	if(driverData.status=="active"){
		if(markers[index].marker.icon=='./views/Images/inactive.png'){
			markers[index].marker.icon = driverIcons[types[driverData.destination].type].icon;
		}
		else if(marker[index].marker.icon!=driverIcons[types[driverData.destination].type].icon){
			marker[index].marker.icon = driverIcons[types[driverData.destination].type].icon
		}
	}
	else{
		if(markers[index].marker.icon!='./views/Images/inactive.png'){
			markers[index].marker.icon = './views/Images/inactive.png';
		}
	}
}

//Updates Driver Marker Location
function updateDriverMarker(driverData){
	const index = markers.findIndex(marker => marker.phoneNumber == driverData.phoneNumber);
	console.log(markers[index]);
	markers[index].mark.setMap(driverData.location.location);
}

//Utility function to remove driver marker
function removeDriverMarker(driverData){
	const index = markers.findElement(marker => marker.phoneNumber == driverData.phoneNumber);
	markers[index].setMap(null);
	markers.splice(index,1);
}

//Utility function to remove user marker from the map.
function removeUserMarker(userData){
	const index = markers.findElement(marker => marker.id == userData.id);
	markers[index].setMap(null);
	markers.splice(index,1);
}