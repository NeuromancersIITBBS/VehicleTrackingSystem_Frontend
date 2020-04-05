// @Authors:Dhruv Ajay Ray, Manish Kausik H
function classifyBuilding(buildingNo){
	if(buildingNo===0||buildingNo===1||buildingNo===2||buildingNo===3||buildingNo===4){
		return "Academic Area";
	}else if(buildingNo===7||buildingNo===8){
		return "Residential Area-BHR side";
	}else if(buildingNo===5||buildingNo===6||buildingNo===9||buildingNo===10||buildingNo===11){
		return "Residential Area-SHR side";
	}else{
		return "Invalid Argument";
	}

}

function coordMap(building){
    var buildings = {SIF:{lat:20.143323, lng:85.676214}, 
        LBC: {lat:20.147798, lng:85.678577}, 
        SBS: {lat:20.150096, lng:85.677597}, 
        SES: {lat:20.149961, lng:85.674019}, 
        MBLD: {lat:20.148816, lng:85.671412}, 
        GHR:{lat:20.152395, lng:85.668188}, 
        SHR: {lat:20.153740, lng:85.666272}, 
        MHR:{lat:20.148305, lng:85.665278}, 
        BHR:{lat:20.147952, lng:85.663857}, 
        SC:{lat:20.154707, lng:85.663337},
	    GH:{lat:20.152508, lng:85.662803},
        CC:{lat:20.152398, lng:85.660945}
    };

    var coords = {lat: 0, lng: 0};
    coords.lat = buildings[building].lat;
    coords.lng = buildings[building].lng;
    return coords;
}
