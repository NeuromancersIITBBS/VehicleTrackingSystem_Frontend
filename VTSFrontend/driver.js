
// Updates locations filled manually in input fields (For testing only!)
function manualLocation(){
    let lat = document.getElementById('manualLat').value,
        lng = document.getElementById('manualLng').value,
        id  = document.getElementById('manualID').value;
    socket.emit('location', {
        id: id,
        location: {
            lat: lat, 
            lng: lng
        },
        timestamp: Date.now()
    });
}
// updates all location using hardcoded data (For testing only!)
function updateAll(){
    locations = [{
        id: 0,
        location: {
            lat: 20.144333,
            lng: 85.675789
        },
        timestamp: Date.now()
    },{
        id: 1,
        location: {
            lat: 20.148704,
            lng: 85.677327
        },
        timestamp: Date.now()
    }, {
        id: 2,
        location: {
            lat: 20.148192,
            lng: 85.671001
        },
        timestamp: Date.now()
    }];
    locations.forEach((location) => {
        socket.emit('location', location)
    });

}