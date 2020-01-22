//controller function 

function updateSeatsAndCode(){
    
    let seats = document.getElementById('occupiedSeats').value;
    let code = document.getElementById('setDestination').value;
    console.log(seats);
    updateDriverInfo(driverID,seats,code); //calling model function
};
