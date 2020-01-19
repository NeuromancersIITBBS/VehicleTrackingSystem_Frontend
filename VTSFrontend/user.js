let map;
let markers = [];
// Make Connection
let socket = io.connect('http://localhost:4000');
$(document).ready(function() {
    markers = initMarkers(3);
    socket.on('location', updateLocation);
});

function updateLocation(data){
    // Query DOM
    let lat = $('#latVal'), 
    lng = $('#lngVal');
    console.log(data);
    lat.text(data.location.lat);
    lng.text(data.location.lng);
    if(data.id < 3){
        let latlng = new google.maps.LatLng(data.location.lat, data.location.lng);
        markers[data.id].setPosition(latlng);
    }
}

function initMap(){
    const options = {
        center: {
            lat: 20.147993,
            lng: 85.670953
        },
        zoom: 15
    };
    map = new google.maps.Map(document.getElementById('map'),options);
};

function initMarkers(numOfMarkers){
    let markers = [];
    for(let i = 0; i < numOfMarkers; ++i){
        let marker =  new google.maps.Marker({
            position: {
                lat: 20.147993,
                lng: 85.670953
            },
            map: map,
            icon: `http://maps.google.com/mapfiles/kml/paddle/${i+1}.png`
       });
       markers.push(marker);
    }
    return markers;
}