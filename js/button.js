document.querySelectorAll('.image-slider').forEach(slider => {
  const images = slider.querySelectorAll('img');
  const nav = slider.querySelector('.slider-nav');
  let current = 0;
  let interval; // simpan interval agar bisa di-pause/resume

  // === 1. Buat tombol kotak angka ===
  images.forEach((img, index) => {
    const btn = document.createElement('button');
    btn.textContent = (index + 1).toString().padStart(2, '0');
    btn.addEventListener('click', e => {
  e.preventDefault();
  e.stopImmediatePropagation(); // cegah semua event di bawahnya
  showSlide(index);
  resetInterval();
});
    nav.appendChild(btn);
  });

  const buttons = nav.querySelectorAll('button');

  // === 2. Fungsi menampilkan slide ===
  function showSlide(index) {
    images[current].classList.remove('active');
    buttons[current].classList.remove('active');
    current = index;
    images[current].classList.add('active');
    buttons[current].classList.add('active');
  }

  // === 3. Auto-slide setiap 5 detik ===
  function startInterval() {
    interval = setInterval(() => {
      let next = (current + 1) % images.length;
      showSlide(next);
    }, 5000);
  }

  function resetInterval() {
    clearInterval(interval);
    startInterval();
  }

  // === 4. Pause auto-slide ketika hover ===
  slider.addEventListener('mouseenter', () => clearInterval(interval));
  slider.addEventListener('mouseleave', () => startInterval());

  // === 5. Inisialisasi awal ===
  showSlide(0);
  startInterval();
});
