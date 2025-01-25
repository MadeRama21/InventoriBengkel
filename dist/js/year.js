const yearPicker = document.getElementById("yearPicker");
const currentYear = new Date().getFullYear();
const storedEndYear = localStorage.getItem("endYear") || currentYear + 10; // Simpan tahun terakhir di local storage
const startYear = 2000;

function populateYearPicker() {
  yearPicker.innerHTML = ""; // Kosongkan dropdown sebelum menambahkan opsi baru
  for (let year = startYear; year <= storedEndYear; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearPicker.appendChild(option);
  }
}

// Perbarui opsi tahun jika tahun saat ini melebihi endYear
if (currentYear > storedEndYear) {
  localStorage.setItem("endYear", currentYear + 10); // Tambahkan tahun hingga 10 tahun ke depan
}

populateYearPicker();
  