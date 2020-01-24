window.onload = function () {
	// Query DOM
	let currLocationBtn = document.getElementById('getLocation'),
		lat = document.getElementById('latVal'),
		lng = document.getElementById('lngVal'),
		manualLocationBtn = document.getElementById('manualLocation'),
		updateAllBtn = document.getElementById('updateAllBtn');
	//check for an error in the below line.
	manualLocationBtn.addEventListener('click',manualLocation);
	updateAllBtn.addEventListener('click',updateAll);
	currLocationBtn.addEventListener('click',this.getLocation);
	updateDriverInfoBtn.addEventListener('click',updateSeatsAndCode);
	allUsersBtn.addEventListener('click',getUserInformation);
	myUsersBtn.addEventListener('click',getUserInformation);

};
// Get GPS location
function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(emitLocation);
	} else {
		alert('Geolocation is not supported by this browser.');
	}
}
