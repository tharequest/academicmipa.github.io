document.querySelectorAll('.image-slider').forEach((slider, i) => {
  const images = slider.querySelectorAll('img');
  const nav = slider.querySelector('.slider-nav');
  let current = 0;
  let interval;
  
  // Delay berbeda hanya untuk memulai interval, bukan tampilan pertama oke
  const delay = i * 2500; // contoh: slider ke-2 mulai auto-slide 2,5 detik kemudian

  // === Buat tombol kotak angka ===
  images.forEach((img, index) => {
    const btn = document.createElement('button');
    btn.textContent = (index + 1).toString().padStart(2, '0');
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopImmediatePropagation(); // cegah popup
      showSlide(index);
      resetInterval();
    });
    nav.appendChild(btn);
  });

  const buttons = nav.querySelectorAll('button');

  function showSlide(index) {
    images[current].classList.remove('active');
    buttons[current].classList.remove('active');
    current = index;
    images[current].classList.add('active');
    buttons[current].classList.add('active');
  }

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

  slider.addEventListener('mouseenter', () => clearInterval(interval));
  slider.addEventListener('mouseleave', () => startInterval());

  // === Inisialisasi: tampilkan slide pertama langsung ===
  showSlide(0);

  // === Jalankan auto-slide dengan delay berbeda antar slider ===
  setTimeout(() => {
    startInterval();
  }, delay);
});

