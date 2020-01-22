window.onload = function(){
// Query DOM
let currLocationBtn = document.getElementById('getLocation'),
    lat = document.getElementById('latVal'),
    lng = document.getElementById('lngVal'),
    manualLocationBtn = document.getElementById('manualLocation'),
    updateAllBtn = document.getElementById('updateAllBtn');

    currLocationBtn.addEventListener('click',this.getLocation);
    updateDriverInfoBtn.addEventListener('click', updateSeatsAndCode);
};
// Get GPS location 
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(emitLocation);
    } else { 
        alert('Geolocation is not supported by this browser.');
    }
}
