function allDriversModel(){
  let endpoint = 'http://localhost:3000/allDrivers';
  let ans;
  $.ajax({
    url: endpoint,
    method: 'GET',
    contentType: 'application/json'
  }).done(function (res){
    console.log("success");
    ans = res;
  }).fail(function (err){
    alert("Something went wrong, please try again");
  }).always(function (){
  });
  return ans;
}

function reqDriversModel(){
  let ans;
  let endpoint = 'http://localhost:3000/getRequestedDrivers';
  $.ajax({
    url: endpoint,
    method: 'GET',
    contentType: 'application/json',
  }).done(function (res){
    console.log("successfully executed reqDriversModel function");
    ans =  res;
  }).fail(function (err){
    alert("Something went wrong, please try again");
  }).always(function (){
  });
  return ans;
}

function driverVerifiModel(req){

  let endpoint = `http://localhost:3000/DriverVerified`;
	let jsObj = {
		verifiedDriverList: req,
	};
	let jsonObj = JSON.stringify(jsObj);
	console.log(jsonObj);
	$.ajax({
		url: endpoint,
		method: 'POST',
		data: jsonObj,
		contentType: 'application/json',
	}).done(function (response) {
		console.log('Success');
		console.log(response);
	}).fail(function () {
		alert('fail!');
	}).always(function () {
	});
}

function deleteDriverModel(req){

  let endpoint = `http://localhost:3000/deleteDriver`;
	let jsObj = {
		phoneNumber: req.phoneNumber,
	};
	let jsonObj = JSON.stringify(jsObj);
	console.log(jsonObj);
	$.ajax({
		url: endpoint,
		method: 'DELETE',
		data: jsonObj,
		contentType: 'application/json',
	}).done(function (response) {
		console.log('Success');
		console.log(response);
	}).fail(function () {
		alert('fail!');
	}).always(function () {
	});
}

function rejectDriverModel(req){

  let endpoint = `http://localhost:3000/rejectDriver`;
	let jsObj = {
		phoneNumber: req.phoneNumber,
	};
	let jsonObj = JSON.stringify(jsObj);
	console.log(jsonObj);
	$.ajax({
		url: endpoint,
		method: 'DELETE',
		data: jsonObj,
		contentType: 'application/json',
	}).done(function (response) {
		console.log('Success');
		console.log(response);
	}).fail(function () {
		alert('fail!');
	}).always(function () {
	});
}
