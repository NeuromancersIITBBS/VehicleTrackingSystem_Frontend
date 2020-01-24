let uniqueNumber;

//controller function that calls book model function.
function bookController(pickUpLocation){
    let responseController = book(pickUpLocation);    
    return responseController;
}

//controller function that calls unbook model function.
function unbookController(uniqueNumber){
    unbook(uniqueNumber);
}

//controller function that calls gotIn model function.
function gotInController(uniqueNumber){
    unbook(uniqueNumber);
}
