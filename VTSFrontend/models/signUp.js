$( document).ready(function(){    
    $("#signupdiv").hide();
    $("#signup").on('submit',async function(event){
        event.preventDefault();
        var driverName = $("#driverName").val();
        var phoneNumber= $("#phoneNumber").val();
        var password = $("#password").val();
        //console.log(driverName,phoneNumber,password);
        let res = await submit(driverName,phoneNumber,password);
        console.log(res);
    })
    $("#register").on('click' , function(event){
        $("#logindiv").hide();
        $("#signupdiv").show();
    })
})
  var  submit = async function(driverName,password,phoneNumber){
     
      const res = await $.ajax({
        url: "http://vts/new_driver/register",
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

 function validate() {
    var username = document.getElementById("uname").value;
    var password = document.getElementById("pass").value;
   // var dataString = 'name1=' + username + '&pass1=' + password  ;

    if (username == '' || password == '') {
    alert("Please Fill both Username and Password");
    return false;
    } 

    else {
    // AJAX
    $.ajax({
    method: "POST",
    url: "http://vts/new_driver/login",//destination url has to be pasted here
    data:{driverName : driverName, password : password},
        success: function(res) {
            console.log(res);
            var driverData = {
                id : res.id,
                occupancy : null,
                destination : null,
            }
            localStorage.setItem('driverData', JSON.stringify(driverData));
            
            window.location.href = "./indexDriver.html";
            return true;
        
        },
        error: function(xhr) {
            alert("Error");
            return false;
        }
        });
    }
    return false;
}