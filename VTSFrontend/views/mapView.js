

var refreshMarker = function refreshMarker(vehicleId) {

    let markerOptions = getLocation(vehicleId);
    let latlng  = new google.maps.LatLng(markerOptions.lat,markerOptions.lng);
    marker.setPosition(latlng);

};

var printSeatsAvailable = function printSeatsAvailable(vehicleId){
    let seats = getSeatOccupancy(vehicleId);
    $('#seatsAvailable').text("seats left : "+seats);
};


