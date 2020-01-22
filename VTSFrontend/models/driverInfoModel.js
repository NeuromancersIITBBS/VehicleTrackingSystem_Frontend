//function to update the driver's occupiedseats and final destination (ajax POST)
function updateDriverInfo(driverID,occupiedseats,colorcode){   //colorcode needs to be implemented properly
    console.log(occupiedseats);
    let endpoint=`http:\\vts_backend`;
    let data = {id:driverID,occupiedSeats : occupiedseats, colorCode : colorcode}
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