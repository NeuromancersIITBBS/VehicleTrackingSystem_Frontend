
let map;
let markers = [];
let coords ;
  let uniqueId;
// Make Connection
let socket = io.connect('http://localhost:4000');
$(document).ready(async function() {
                $("#confirmBook").click(function(){
                  $("#bookIn").hide();
                  $("#bookOut").show();
                  // // Get GPS location of User
                  // navigator.geolocation.getCurrentPosition(success,failure);
                  // function success(position){
                  //   coords =new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                  // console.log(coords);}
                  // function failure(){}
                  userInfo(coords);
                });
                $("#unBook").click(function(){
                  $("#bookOut").hide();
                  $("#bookIn").show();
                  unBook(uniqueId);
                });
                $("#gotIn").click(function(){
                  $("#bookOut").hide();
                  $("#bookIn").show();
                });
                await bovData();
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
//function to update the user's location and his destination (ajax POST)
function userInfo(coords){

              console.log(coords);
            let endpoint=`http:\\vts_backend`;
            let manualLocationUser=$("#desTi").val();
            console.log(manualLocationUser);
            let colorCode;
            uniqueId=new Date().valueOf();
            switch(manualLocationUser){
              case "BHR":
                        colorCode=;
                        break;
              case "BHR":
                        colorCode=;
                        break;
            case "BHR":
                        colorCode=;
                        break;
            }

            let jsObj = {location:coords,
                          destination:colorCode,
                          Id:uniqueId
                        };
            let jsonObj = JSON.stringify(jsObj);
            console.log(jsonObj);
                  $.ajax({
                    url : endpoint,
                    method : 'POST',
                    data : jsonObj,
                                contentType : "application/json",
                    }).done(function(response){
                                console.log("Success");
                    }).fail(function(){
                                alert("fail!");
                    }).always(function(){
                    });
  }



/// getting status of BOV's

var dataArray=[];
var bovData = async function(){
    let endpoint = "http:\\vts_backend";

await $.ajax({
    url: endpoint,
    method: 'GET',
    dataType: 'json',
    error: function(err){
        alert("Something went wrong, please try again.");
    },
    success: function(res) {
        console.log("Success!");
        console.log(res);
        dataArray=res;
    }
});
}
      dataArray.forEach(function(item){
            switch(item.Id)
            {
              case 0:
              $("#bov1").css("color","item.colorCode");
              $("#bov1").html("<h4>BOV-1</h4><h5>Destiny : "+relation.colorCode+"</h5><h5>Vacancy : "+item.occupiedSeats+"</h5>");
              break;
              case 1:
              $("#bov2").css("color","item.colorCode");
              $("#bov2").html("<h4>BOV-2</h4><h5>Destiny : "+relation.colorCode+"</h5><h5>Vacancy : "+item.occupiedSeats+"</h5>");
              break;
              case 2:
              $("#bov3").css("color","item.colorCode");
              $("#bov3").html("<h4>BOV-3</h4><h5>Destiny : "+relation.colorCode+"</h5><h5>Vacancy : "+item.occupiedSeats+"</h5>");
              break;
            }
      });


/////// ajax call for UNBOOKING
function unBook(uniqueId)
{
  let endPoint="http:\\vts_backend";
  const userId=$.ajax({
    url : endpoint,
    method : 'GET',
    dataType: 'json',
    error: function(err){
        alert("Something went wrong, please try again.");
    },
    success: function(res) {
        console.log("Success!");
        console.log(res);
        return res;
    }

});

// ///////////// ajax call for GOTIN
//
// function gotIn(colorCode){
//   let endPoint="http:\\vts_backend";
//   let jsObj = {Id:uniqueId,
//                colorCode:colorCode
//               };
//
//   let jsonObj = JSON.stringify(jsObj);
//   $.ajax({
//     url : endpoint,
//     method : 'POST',
//     data : jsonObj,
//                 contentType : "application/json",
//     }).done(function(response){
//                 console.log("Success");
//     }).fail(function(){
//                 alert("fail!");
//     }).always(function(){
//     });
// }
