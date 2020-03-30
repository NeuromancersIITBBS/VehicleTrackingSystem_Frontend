$(afterLoading);
function afterLoading() {
  $('#allDriversData').hide();
  $('#reqDriversData').hide();
alldataArr = getAllDiversControllers();
reqdataArr = getReqDriversControllers();
  // //dummy data for testing
  // alldataArr = [
  //  {
  //    driverName: "Nitish",
  //    password: "iitbbs",
  //    phoneNumber: "998798304"
  //  },
  //  {
  //
  //      driverName: "Nitish",
  //      password: "iitbbs",
  //      phoneNumber: "998798304"
  //  },
  //  {
  //
  //      driverName: "Nitish",
  //      password: "iitbbs",
  //      phoneNumber: "998798304"
  //  },
  //  {
  //
  //      driverName: "Nitish",
  //      password: "iitbbs",
  //      phoneNumber: "998798304"
  // }
  // ];
  //
  // reqdataArr = [
  //  {
  //    driverName: "Nitish",
  //    password: "iitbbs",
  //    phoneNumber: "998798304"
  //  },
  //  {
  //
  //      driverName: "Nitish",
  //      password: "iitbbs",
  //      phoneNumber: "998798304"
  //  },
  //  {
  //
  //      driverName: "Nitish",
  //      password: "iitbbs",
  //      phoneNumber: "998798304"
  //  },
  //  {
  //
  //      driverName: "Nitish",
  //      password: "iitbbs",
  //      phoneNumber: "998798304"
  // }
  // ];
  //


function allTemplate(dataArr) {
  return `
    <div class="all-files">
      <h4 class="file-name">
      <strong>Name</strong>: ${dataArr.driverName} <br>
      <strong>PassWord</strong>: ${dataArr.password} <br>
      <strong>Phone Number</strong>: ${dataArr.phoneNumber}
      </h4>
      <button type="button" class="btn btn-light" onclick =deleteDriverController(${dataArr})>delete</button>
    </div>
  `;
}

function reqTemplate(dataArr) {
  return `
    <div class="all-files">
      <h4 class="file-name">
        <strong>Name</strong>: ${dataArr.driverName} <br>
        <strong>PassWord</strong>: ${dataArr.password} <br>
        <strong>Phone Number</strong>: ${dataArr.phoneNumber}
      </h4>
        <button type="button" class="btn btn-light" onclick=rejectDriverController(${dataArr})>reject</button>
          <button type="button" class="btn btn-light" onclick=driverVerifiController(${dataArr})>Verify</button>
    </div>
  `;
}
// takes data from json array and separates flagged and unflagged files

// append return template string to html page
$('#AllDriversBtn').click(()=>{
  $('#allDriversData').show();
  $('#allDriversData').html( `
    ${alldataArr.map(allTemplate).join("")}
  `)
})

function deleted(){
  $('#allDriversData').html( `
    ${alldataArr.map(allTemplate).join("")}
  `)
}

function reject(){
  $('#reqDriversData').html( `
    ${reqdataArr.map(reqTemplate).join("")}
  `)
}
$('#ReqDriversBtn').click(()=>{
  $('#reqDriversData').show();
  $('#reqDriversData').html( `
    ${reqdataArr.map(reqTemplate).join("")}
  `)
})

function verify(){
  $('#allDriversData').html( `
    ${alldataArr.map(allTemplate).join("")}
  `)
  $('#reqDriversData').html( `
    ${reqdataArr.map(reqTemplate).join("")}
  `)
}

}
