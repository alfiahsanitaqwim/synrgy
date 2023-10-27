const carType = document.getElementById("carType");
const driverType = document.getElementById("driverType");
const availability = document.getElementById("availability")
const capacity = document.getElementById("capacity");

var carTypeVal = carType.value;
var driverTypeVal = driverType.value;
var availabilityVal = availability.value;
var capacityVal = capacity.value;

console.log("ss", "sss");

function validInput() {
    if (driverTypeVal !== "" && availabilityVal !== "" && capacityVal !== ""){
        btnSubmit.removeAttribute("disabled");
    } else{
        btnSubmit.removeAttribute("disabled", true);
    }
}

btnSubmit.onClick = () => {
    result.innerText = 'mobil yang dicari adalah ${carTypeVal} yang sedang ${availabilityVal} dan total penumpang sebanyak ${totalPenumpangVal} orang';
}