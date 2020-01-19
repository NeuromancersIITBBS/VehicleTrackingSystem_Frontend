var map;
var marker;
function initMap(){
    const options = {
        center: {
            lat: 20.143341,
            lng: 85.674471
        },
        zoom: 15
    };
    map = new google.maps.Map(document.getElementById('map'),options);
    marker = new google.maps.Marker({position: options.center, map: map});
};