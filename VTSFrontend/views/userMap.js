//these two functions initialize map
let map;
let markers = [];
function initMap() {
	const options = {
		center: {
			lat: 20.147996,
			lng: 85.670970
		},
		zoom: 15.1
	};
	map = new google.maps.Map(document.getElementById('map'), options);
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
	console.log(userData)
	let marker = new google.maps.Marker({
		position: userData.location.location,
		map: map,
		// types and icons defined in map utilities.
		icon: `http://maps.google.com/mapfiles/kml/paddle/${i + 1}.png`
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
	let marker = new google.maps.Marker({
		position: userData.location.location,
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
		id : userData.id,
		mark : marker
	}
	console.log(markerObj);
	markers.push(markerObj);
}

function updateDriverMarker(driverData){
	const index = markers.findIndex(marker => marker.id == driverData.id);
	console.log(markers[index]);
	markers[index].mark.setMap(driverData.location.location);
}

//Utility function to remove markers
function removeMarker(userData){
	const index = markers.findIndex(marker => marker.id == userData.id);
	console.log(markers[index])
	markers[index].mark.setMap(null);
	markers.splice(index,1);
}

// Check if there is a change in status or destination update the colour of the driver marker.
function updateDriverMarker(driverData){
	const index = markers.findIndex(marker => marker.id == driverData.id);
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