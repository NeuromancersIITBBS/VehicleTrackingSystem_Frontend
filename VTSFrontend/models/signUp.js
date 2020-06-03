$( document).ready( function(){  
    //localStorage.removeItem('driverData');
    var driverData = JSON.parse(localStorage.getItem('driverData'));

    if(driverData !== null){
        console.log("At signup page redirecting to driver index");
        window.location.href = "./indexDriver.html";
        return;
	}  
    console.log("Page reloaded");
    $("#registerBtn").click( async function(event){
        event.preventDefault();
        var driverName = $("#driverName").val();
        var phoneNumber= $("#phoneNumber").val();
        var password = $("#password").val();
        //console.log(driverName,phoneNumber,password);
        let res = await submit(driverName,phoneNumber,password);
        console.log(res);
    })

    $("#login").click( async function(event){
        event.preventDefault();
        console.log("Driver trying to login...");
        var phoneNumber = document.getElementById("phoneNumber").value;
        var password = document.getElementById("pass").value;
        // var dataString = 'name1=' + username + '&pass1=' + password  ;

        if (phoneNumber == '' || password == '') {
            alert("Please Fill both Username and Password");
        } 

        const driver = {
            phoneNumber,
            password
        };
        // AJAX
        $.ajax({
            method: "POST",
            url: "https://vts189.herokuapp.com/vts/new_driver/login",//destination url has to be pasted here
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(driver),
            success: function(res,data,status,xhr) {
                console.log("Request sent !!");
                const driver = res;
                const driverToken = driver.token;
                var driverData = {
                    phoneNumber : phoneNumber,
                    token: driverToken,
                    occupancy : null,
                    destination : null,
                    status : "active"
                }
                $.ajax({
                    method: "GET",
                    url: "https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572",
                    success: function(res,status,xhr){
                        console.log("Location no issues.");
                        const userData = JSON.parse(res);
                        console.log(userData);
                        const location = {
                            lat: userData.latitude,
                            lng: userData.longitude, 
                        }
                        driverData.location = location;
                        console.log('Login Successful !');
                        localStorage.setItem('driverData', JSON.stringify(driverData));
                        window.location.href = "./indexDriver.html";
                    },
                    error: function(xhr) {
                        console.log("Your location could'nt be found.");
                        alert("Error");
                    },
                });
                
            },
            error: function(xhr) {
                console.log("Wrong credentials.");
                alert("Error");
            },
        });
    });

});
  
var  submit = async function(driverName,password,phoneNumber){
     
      const res = await $.ajax({
        url: "https://vts189.herokuapp.com/register",
        method:"POST",
        data: {driverName : driverName, phoneNumber : phoneNumber, password : password},   
        success: function(res) {
            alert('User created Succesfully Please login to use the app');
            return 1;
        },
        error: function(xhr) {
            alert("Error. Please register again.")
           return 0;
        }
    });   
  
}

// function setupRegisterSocket(){
//     //If duplicate login is occuring.
// 	socket.on('driverAuthFailed', (data) => {
//         //window.location.href = "./driverSignUp.html";
//         //var dataRecieved = JSON.parse(data);
//         //alert(dataRecieved);
// 		window.location.href = "./driverSignUp.html";
// 		console.log("You might have logged in from another device, logout from other device and log in here...");
//         alert("You might have logged in from another device, logout from other device and log in here...");
// 	});
// }