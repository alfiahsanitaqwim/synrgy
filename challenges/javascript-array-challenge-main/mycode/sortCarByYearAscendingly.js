function sortCarByYearAscendingly(cars) {

  // Sangat dianjurkan untuk console.log semua hal hehe
  // console.log(cars);

  // Clone array untuk menghindari side-effect
  // Apa itu side effect?
  const result = [...cars];

  // Tulis code-mu disini

  const n = result.length; // p cars

  // Mengurutkan tahun secara Ascending dengan teknik bubble sort
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      // Membandingkan tahun mobil secara berurutan
      if (result[j].year > result[j + 1].year) {
        // Menukar posisi mobil jika tahun mobil sebelumnya lebih muda
        let temporaryContainer = result[j];
        result[j] = result[j + 1];
        result[j + 1] = temporaryContainer;
      }
    }
  }

  // Rubah code ini dengan array hasil filter berdasarkan availablity a
  return result;
}