function getAllDiversControllers(){
  return allDriversModel();
}

function getReqDriversControllers(){
  return reqDriversModel();
}

function driverVerifiController(req){

  driverVerifiModel(req);
  verify();
}

function deleteDriverController(req){

  deleteDriverModel(req);
  deleted();
}

function rejectDriverController(req){

  rejectDriverModel(req);
  reject();
}
