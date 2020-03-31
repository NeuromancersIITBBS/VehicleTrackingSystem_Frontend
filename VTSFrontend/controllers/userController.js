//controller function that calls book model function.
async function bookController(pickUpLocation){
    let uniqueId = await book(pickUpLocation);    
    return uniqueId;
}

//controller function that calls unbook model function.
function unbookController(){
    unbook();
}

//controller function that calls gotIn model function.
function gotInController(){
    gotIn();
}
