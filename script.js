// === Responsive Menu Toggle ===
const menuToggle = document.getElementById('menu-toggle');
const navUl = document.querySelector('nav ul');
menuToggle.addEventListener('click', () => {
  navUl.classList.toggle('active');
});

// === Dropdown toggle (HP) ===
const dropdown = document.querySelector('.dropdown');
if (dropdown) {
  dropdown.addEventListener('click', (e) => {
    e.preventDefault();
    dropdown.classList.toggle('open');
  });
}

// === Live Clock ===
function updateLiveClock() {
  const now = new Date();
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const day = days[now.getDay()];
  const date = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('tanggal').textContent = `${day}, ${date} ${month} ${year}`;
  document.getElementById('jam').textContent = `Pukul: ${hours}:${minutes}:${seconds}`;
}
updateLiveClock();
setInterval(updateLiveClock, 1000);

// === SIMPLE SLIDER ===
function startSlider(id) {
  const slider = document.getElementById(id);
  if (!slider) return;
  const images = slider.querySelectorAll('img');
  let index = 0;
  setInterval(() => {
    images.forEach(img => img.style.display = 'none');
    images[index].style.display = 'block';
    index = (index + 1) % images.length;
  }, 3000);
}
startSlider('slider-left');
startSlider('slider-right-top');
startSlider('slider-right-bottom');
