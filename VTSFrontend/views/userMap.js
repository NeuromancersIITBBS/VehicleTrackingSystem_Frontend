//these two functions initialize map
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
	map = new google.maps.Map(document.getElementById('map'), options);
};

function initMarkers() {
	let numOfMarkers = allUsers.length

	for (let i = 0; i < numOfMarkers; ++i) {
		addMarker(allUsers[i]);
	}
	numOfMarkers = allDrivers.length
	for (let i = 0; i < numOfMarkers; ++i) {
		addMarker(allDrivers[i]);
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

//Utility function to remove markers
function removeMarker(userData){
	const index = markers.findIndex(marker => marker.id == userData.id);
	console.log(markers[index])
	markers[index].mark.setMap(null);
	markers.splice(index,1);
}