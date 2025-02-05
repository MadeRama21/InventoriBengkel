// start: Sidebar
const sidebarToggle = document.querySelector(".sidebar-toggle");
const sidebarOverlay = document.querySelector(".sidebar-overlay");
const sidebarMenu = document.querySelector(".sidebar-menu");
const main = document.querySelector(".main");

// Inisialisasi sidebar untuk tampilan mobile
if (window.innerWidth < 768) {
  main.classList.toggle("active");
  sidebarOverlay.classList.toggle("hidden");
  sidebarMenu.classList.toggle("-translate-x-full");
}

// Toggle sidebar
sidebarToggle.addEventListener("click", function (e) {
  e.preventDefault();
  main.classList.toggle("active");
  sidebarOverlay.classList.toggle("hidden");
  sidebarMenu.classList.toggle("-translate-x-full");
});

// Tutup sidebar saat overlay diklik
sidebarOverlay.addEventListener("click", function (e) {
  e.preventDefault();
  main.classList.add("active");
  sidebarOverlay.classList.add("hidden");
  sidebarMenu.classList.add("-translate-x-full");
});

// Fungsi untuk menangani dropdown sidebar
function handleDropdownClick(e) {
  e.preventDefault();
  const parent = e.currentTarget.closest(".group");
  const menu = parent.querySelector("ul");

  // Toggle state dropdown
  const isOpen = !menu.classList.contains("hidden");
  menu.classList.toggle("hidden");
  parent.classList.toggle("selected");

  // Simpan state dropdown di localStorage
  localStorage.setItem(parent.id, isOpen ? "closed" : "open");
}

// Fungsi untuk memulihkan state dropdown saat halaman dimuat
function restoreDropdownState() {
  const dropdown = document.getElementById("kelola-user-dropdown");
  if (!dropdown) return;

  const menu = dropdown.querySelector("ul");
  const state = localStorage.getItem(dropdown.id);

  if (state === "open") {
    menu.classList.remove("hidden");
    dropdown.classList.add("selected");
  } else {
    menu.classList.add("hidden");
    dropdown.classList.remove("selected");
  }
}

// Pasang event listener untuk dropdown
document.querySelectorAll(".sidebar-dropdown-toggle").forEach(function (item) {
  item.addEventListener("click", handleDropdownClick);
});

// Pulihkan state dropdown saat halaman dimuat
document.addEventListener("DOMContentLoaded", function () {
  restoreDropdownState();
});
// end: Sidebar

// start: Popper
const popperInstance = {};
document.querySelectorAll(".dropdown").forEach(function (item, index) {
  const popperId = "popper-" + index;
  const toggle = item.querySelector(".dropdown-toggle");
  const menu = item.querySelector(".dropdown-menu");
  menu.dataset.popperId = popperId;
  popperInstance[popperId] = Popper.createPopper(toggle, menu, {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 8],
        },
      },
      {
        name: "preventOverflow",
        options: {
          padding: 24,
        },
      },
    ],
    placement: "bottom-end",
  });
});

document.addEventListener("click", function (e) {
  const toggle = e.target.closest(".dropdown-toggle");
  const menu = e.target.closest(".dropdown-menu");
  if (toggle) {
    const menuEl = toggle.closest(".dropdown").querySelector(".dropdown-menu");
    const popperId = menuEl.dataset.popperId;
    if (menuEl.classList.contains("hidden")) {
      hideDropdown();
      menuEl.classList.remove("hidden");
      showPopper(popperId);
    } else {
      menuEl.classList.add("hidden");
      hidePopper(popperId);
    }
  } else if (!menu) {
    hideDropdown();
  }
});

function hideDropdown() {
  document.querySelectorAll(".dropdown-menu").forEach(function (item) {
    item.classList.add("hidden");
  });
}

function showPopper(popperId) {
  popperInstance[popperId].setOptions(function (options) {
    return {
      ...options,
      modifiers: [...options.modifiers, { name: "eventListeners", enabled: true }],
    };
  });
  popperInstance[popperId].update();
}

function hidePopper(popperId) {
  popperInstance[popperId].setOptions(function (options) {
    return {
      ...options,
      modifiers: [...options.modifiers, { name: "eventListeners", enabled: false }],
    };
  });
}
// end: Popper
