// === Simple Image Slider ===
function createSlider(sliderId, interval = 5000) {
  const slides = document.querySelectorAll(`#${sliderId} img`);
  if (!slides.length) return;

  let index = 0;
  slides[index].classList.add("active");

  setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, interval);
}

createSlider("slider-pengumuman", 8000);
createSlider("slider-akademik", 8000);
