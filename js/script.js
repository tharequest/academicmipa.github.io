// === Responsive Menu Toggle ===
const menuToggle = document.getElementById('menu-toggle');
const navUl = document.querySelector('nav ul');

if (menuToggle && navUl) {
  menuToggle.addEventListener('click', () => {
    navUl.classList.toggle('active');
  });
}

// === Dropdown toggle (HP) ===
const dropdown = document.querySelector('.dropdown');
if (dropdown) {
  dropdown.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      dropdown.classList.toggle('open');
    }
  });
}

// === Live Clock ===
function updateLiveClock() {
  const now = new Date();
  const days = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  
  const day = days[now.getDay()];
  const date = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2,'0');
  const minutes = String(now.getMinutes()).padStart(2,'0');
  const seconds = String(now.getSeconds()).padStart(2,'0');

  document.getElementById('tanggal').textContent = `${day}, ${date} ${month} ${year}`;
  document.getElementById('jam').textContent = `Pukul: ${hours}:${minutes}:${seconds}`;
}
updateLiveClock();
setInterval(updateLiveClock, 1000);

// === Simple Slider ===
function createSlider(sliderId, interval = 3000) {
  const slides = document.querySelectorAll(`#${sliderId} img`);
  let index = 0;
  slides[index].classList.add("active");

  setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, interval);
}

// Jalankan kedua slider
createSlider("slider-pengumuman", 8000);
createSlider("slider-akademik", 8000);
