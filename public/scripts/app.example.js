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
    const carType = this.carType.value
    const capacityFilter = document.getElementById("capacity").value; 
    const carsDataString = localStorage.getItem("CARS")
    const carsData = JSON.parse(carsDataString);

    // let datas = carsData?.filter((dt) => dt?.driverType?.toLowerCase() === carType?.toLowerCase())
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
      carElement.classList.add("car"); // Tambahkan kelas CSS jika diperlukan

      // Tambahkan gambar mobil ke dalam elemen
      const carImage = document.createElement("img");
      // console.log("sss", `${car.image}`);
      carImage.src = "https://i.ibb.co/c2VbWBV/img-car.png"; // Sesuaikan dengan properti mobil Anda yang berisi URL gambar
      carElement.appendChild(carImage);


      // Tambahkan nama dan merek (brand) mobil ke dalam elemen
      const carInfo = document.createElement("div");
      carInfo.classList.add("car-info"); // Tambahkan kelas CSS untuk styling
      carInfo.innerText = `${car.plate} - ${car.model}`; // Sesuaikan dengan properti mobil Anda
      carElement.appendChild(carInfo);


      // Tambahkan nama dan merek (brand) mobil ke dalam elemen
      const footerCardContoh = document.createElement("div");
      footerCardContoh.classList.add("car-contoh"); // Tambahkan kelas CSS untuk styling
      footerCardContoh.innerText = `${car.plate}`; // Sesuaikan dengan properti mobil Anda
      carElement.appendChild(footerCardContoh);

      // Tambahkan elemen mobil ke dalam kontainer mobil
      document.getElementById("alfi").appendChild(carElement);
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
