class App {
  constructor() {
    this.carType = document.getElementById("carType");
    this.available = document.getElementById("available");
    this.loadButton = document.getElementById("search");
    this.clearButton = document.getElementById("clear-btn");
    this.carContainerElement = document.getElementById("cars-container");
  }

  async init() {
    await this.load();

    // Register click listener
    this.loadButton.onclick = this.search;
    this.clearButton.onclick = this.clear;
  }

  search = () => {
    // const carType = this.carType.value;
    const capacityFilter = document.getElementById("capacity").value; 
    const carsDataString = localStorage.getItem("CARS")
    const carsData = JSON.parse(carsDataString);

    const driverType = document.getElementById("driverType");
    const time = document.getElementById("time");
    const date = document.getElementById("date");
    const capacity = document.getElementById("capacity");

    const driverTypeVal = driverType.value;
    const timeVal = time.value;
    const dateVal = date.value;

    // Validasi input
    // if (driverTypeVal && timeVal && dateVal) {
    //   this.loadButton.removeAttribute("disabled");
    // } else {
    //   this.loadButton.setAttribute("disabled", true);
    // }

    function validInput() {
      if (driverTypeVal !== "" && availabilityVal !== "" && capacityVal !== ""){
          search.removeAttribute("disabled");
      } else{
          search.removeAttribute("disabled", true);
      }
  }

    let datas = carsData?.filter((dt) => {
      const matchesCarType = dt?.driverType?.toLowerCase() === carType?.toLowerCase();
      const matchesAvailable = dt?.available === true;
      const matchesCapacity = dt?.capacity >= capacityFilter;
      return matchesCarType && matchesAvailable && matchesCapacity;
    });  

    console.log(carType, datas);

    this.clear()
    datas.forEach((car) => {
      // console.log("ccc", car);

      const carElement = document.createElement("div");
      carElement.classList.add("car"); 

      const carImage = document.createElement("img");
      // console.log("sss", `${car.image}`);
      carImage.src = "https://i.ibb.co/c2VbWBV/img-car.png";
      carElement.appendChild(carImage);

      const carInfo = document.createElement("div");
      carInfo.classList.add("car-info"); 
      carInfo.innerText = `${car.plate} - ${car.model}`; 
      carElement.appendChild(carInfo);

      const footerCardContoh = document.createElement("div");
      footerCardContoh.classList.add("car-contoh"); 
      footerCardContoh.innerText = `${car.plate}`; 
      carElement.appendChild(footerCardContoh);

      // Tambahkan elemen car ke car container
      document.getElementById("show").appendChild(carElement);
    });
  };

  async load() {
    const cars = await Binar.listCars();
    const carsWithDriverType = cars.map((data, index) => ({
      ...data,
      driverType: index % 2 === 0 ? "with_driver" : "without_driver"
    }));
    Car.init(carsWithDriverType);
    localStorage.setItem("CARS", JSON.stringify(carsWithDriverType))
    console.log("data awal", carsWithDriverType);
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
