//View function

//Indicates the state of All Users or MyUsers. 0 - All Users , 1 - My Users 
var button = 0;
var myUsers = [];
var notMyUsers = [];

$(document).ready(async function () {

	//Increment and Decrement Listeners - Defined in driverInfoView.js
	$("#incButton").on("click", () => {
		var button = $("#incButton");
		var oldValue = button.parent().find("input").val();
		if (oldValue < 20) {
			var newVal = parseFloat(oldValue) + 1;
			button.parent().find("input").val(newVal);
		}
	});
	$("#decButton").on("click", () => {
		var button = $("#decButton");
		var oldValue = button.parent().find("input").val();
		if (oldValue > 0) {
			var newVal = parseFloat(oldValue) - 1;
			button.parent().find("input").val(newVal);
		}
	});

	$("#allUsers").on("click", () => {
		if(driverData.destination != null){
			if(button!=0){
				button = 0;
				notMyUsers = allUsers.filter(user =>user.destination !=driverData.Destination );
				let numOfUsers = notMyUsers.length;
				for(let i=0; i<numOfUsers;i++){
					addMarker(notMyUsers[i]);
				}
			}
		}
	});
	$("#myUsers").on("click", () => {
		if(typeof driverData.destiniation != undefined){
			if(driverData.destination != null){
				if(button==0){
					button = 1;
					notMyUsers=allUsers.filter(user => user.destination != driverData.destination );
					let numOfUsers = notMyUsers.length;
					for(let i=0; i<numOfUsers.length;i++){
						removeMarker(notMyUsers[i]);
					}
				}
			}
			else{
				alert('Update your status');
			}
		}
		else{
			alert('Click on Update Information first.');
		}
	});
});

function selectOption(place){
	if(place=="LBC"){
		$('select[name^="type"] option:selected').attr("selected",null);
		$('select[name^="type"] option[value="LBC"]').attr("selected","selected");
	}
	else if(place=="SIF"){
		$('select[name^="type"] option:selected').attr("selected",null);
		$('select[name^="type"] option[value="SIF"]').attr("selected","selected");
	}
	else if(place=="SBS"){
		$('select[name^="type"] option:selected').attr("selected",null);
		$('select[name^="type"] option[value="SBS"]').attr("selected","selected");
	}
	else if(place=="SES"){
		$('select[name^="type"] option:selected').attr("selected",null);
		$('select[name^="type"] option[value="SES"]').attr("selected","selected");
	}
	else if(place=="MBLD"){
		$('select[name^="type"] option:selected').attr("selected",null);
		$('select[name^="type"] option[value="MBLD"]').attr("selected","selected");
	}
	else if(place=="MHR"){
		$('select[name^="type"] option:selected').attr("selected",null);
		$('select[name^="type"] option[value="MHR"]').attr("selected","selected");
	}
	else if(place=="BHR"){
		$('select[name^="type"] option:selected').attr("selected",null);
		$('select[name^="type"] option[value="BHR"]').attr("selected","selected");
	}
	else if(place=="SHR"){
		$('select[name^="type"] option:selected').attr("selected",null);
		$('select[name^="type"] option[value="SHR"]').attr("selected","selected");
	}
	else if(place=="GHR"){
		$('select[name^="type"] option:selected').attr("selected",null);
		$('select[name^="type"] option[value="GHR"]').attr("selected","selected");
	}
	else if(place=="GH"){
		$('select[name^="type"] option:selected').attr("selected",null);
		$('select[name^="type"] option[value="GH"]').attr("selected","selected");
	}
	else if(place=="CC"){
		$('select[name^="type"] option:selected').attr("selected",null);
		$('select[name^="type"] option[value="CC"]').attr("selected","selected");
	}
}

// function updateSeatsAndCode() {

// 	let seats = document.getElementById('occupiedSeats').value;
// 	let code = document.getElementById('setDestination').value;
// 	console.log(seats);
// 	updateDriverInfoController(driverID, seats, code); //calling controller function
// };

// function getUserInformation() {
// 	// let res = getUserInfoController();
// 	allUsers.forEach((item) => {
// 		let latlng = new google.maps.LatLng(item.coords.lat, item.coords.lng);
// 		setMarker(mapAll, latlng, item.colorCode);// map which has all users
// 		if (item.colorCode == colorCode) {
// 			myUsers.push(item);
// 			setMarker(mapMy, latlng, item.colorCode);// map which has his Users
// 		}
// 	});
// };

// function setMarker(map, latlng, color){
// 	new google.maps.Marker({
// 		map: map, position: latlng,
// 		icon: {
// 			path: google.maps.SymbolPath.CIRCLE,
// 			fillColor: color,
// 			scale: 4
// 		}
// 	});
// };
