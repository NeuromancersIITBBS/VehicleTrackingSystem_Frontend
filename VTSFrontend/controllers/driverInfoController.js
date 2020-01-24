//Function that calls updateDriverInfo model function.
function updateDriverInfoController(driverId,occupiedSeats,colorCode){
    updateDriverInfo(driverId,occupiedSeats,colorCode);
}



//Function that calls getUserInfo model function.
function getUserInfoControler(){
    let responseController = getUserInfo();
    return responseController;
}