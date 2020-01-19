// Make Connection
let socket = io.connect('http://localhost:4000');
let driverID = 0;

window.onload = function(){

// Query DOM
let currLocationBtn = document.getElementById('getLocation'),
    lat = document.getElementById('latVal'),
    lng = document.getElementById('lngVal'),
    manualLocationBtn = document.getElementById('manualLocation'),
    updateAllBtn = document.getElementById('updateAllBtn');

// Listen for location value
socket.on('location', (data) => {
    console.log(data);
    lat.innerHTML = data.location.lat;
    lng.innerHTML = data.location.lng;
});

// Event Listeners
currLocationBtn.addEventListener('click', getLocation);
manualLocationBtn.addEventListener('click', manualLocation);
updateAllBtn.addEventListener('click', updateAll);
updateDriverInfoBtn.addEventListener('click', updateDriverInfo);
};

// Updates locations filled manually in input fiels (For testing only!)
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

// Get GPS location 
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(emitLocation);
    } else { 
        alert('Geolocation is not supported by this browser.');
    }
}

// Call back function for getLocation
function emitLocation(location){
    socket.emit('location', {
        id: driverID,
        location: {
            lat: location.coords.latitude, 
            lng: location.coords.longitude
        },
        timestamp: Date.now()
    });
    console.log(location);
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


//function to update the driver's occupiedseats and final destination (ajax POST)
function updateDriverInfo(occupiedseats,colorcode){   //colorcode needs to be implemented properly
    console.log(occupiedseats);
    let endpoint=`http:\\vts_backend`;
    let data = {occupiedSeats : occupiedseats, colorCode : colorcode}
    $.ajax({
        url: endpoint,
        method: 'POST',
        data:JSON.stringify(data),
        contentType : "application/json",
        error: function(xhr){
          alert("Something went wrong, please try again.");
        },
        success: function(res) {
          console.log("Success!");   
        }
  });
}