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

function initMarkers(numOfMarkers) {
	let markers = [];
	for (let i = 0; i < numOfMarkers; ++i) {
		let marker = new google.maps.Marker({
			position: {
				lat: 20.147993,
				lng: 85.670953
			},
			map: map,
			icon: `http://maps.google.com/mapfiles/kml/paddle/${i + 1}.png`
		});
		markers.push(marker);
	}
	return markers;
}