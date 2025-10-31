// === Simple Image Slider ===
function createSlider(sliderId, interval = 6500, delay = 0) {
  const slides = document.querySelectorAll(`#${sliderId} img`);
  if (!slides.length) return;

  let index = 0;
  slides[index].classList.add("active");

  setTimeout(() => {
    setInterval(() => {
      slides[index].classList.remove("active");
      index = (index + 1) % slides.length;
      slides[index].classList.add("active");
    }, interval);
  }, delay);
}

// === Panggilan dengan delay berbeda ===
createSlider("slider-pengumuman", 9000, 0);       // mulai langsung
createSlider("slider-akademik", 8000, 2500);      // mulai 2.5 detik kemudian
createSlider("slider-kemahasiswaan", 8000, 4500); // kalau ada slider lain

