// js/button.js — perbaikan interval + debounce
document.querySelectorAll('.image-slider').forEach((slider, i) => {
  const images = Array.from(slider.querySelectorAll('img'));
  const nav = slider.querySelector('.slider-nav') || (function(){
    const el = document.createElement('div');
    el.className = 'slider-nav';
    slider.appendChild(el);
    return el;
  })();

  let current = 0;
  let intervalId = null;
  let restartTimeout = null;
  const delayStart = i * 2500; // stagger start if multiple sliders

  // create nav buttons
  images.forEach((img, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = String(idx + 1).padStart(2, '0');

    // simple click debounce to avoid double rapid clicks
    let clickDisabled = false;
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      if (clickDisabled) return;
      clickDisabled = true;
      setTimeout(() => { clickDisabled = false; }, 300); // 300ms debounce

      showSlide(idx);
      resetInterval();
    });
    nav.appendChild(btn);
  });

  const navButtons = Array.from(nav.querySelectorAll('button'));

  function updateNav() {
    navButtons.forEach((b, idx) => {
      b.classList.toggle('active', idx === current);
    });
  }

  function showSlide(index) {
    images.forEach((img, idx) => img.classList.toggle('active', idx === index));
    current = index;
    updateNav();
  }

  function startInterval() {
    // pastikan tidak ada interval ganda
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      const next = (current + 1) % images.length;
      showSlide(next);
    }, 6500);
  }

  function resetInterval() {
    // clear existing interval and any pending restart
    clearInterval(intervalId);
    intervalId = null;
    if (restartTimeout) clearTimeout(restartTimeout);

    // beri jeda singkat sebelum memulai lagi agar klik tidak langsung "ditimpa"
    restartTimeout = setTimeout(() => {
      startInterval();
      restartTimeout = null;
    }, 700); // 700ms tunggu sebelum mulai ulang
  }

  // pause on hover
  slider.addEventListener('mouseenter', () => {
    clearInterval(intervalId);
    intervalId = null;
    if (restartTimeout) { clearTimeout(restartTimeout); restartTimeout = null; }
  });
  slider.addEventListener('mouseleave', () => {
    // start after small delay to avoid instant flip
    if (restartTimeout) clearTimeout(restartTimeout);
    restartTimeout = setTimeout(() => { startInterval(); restartTimeout = null; }, 500);
  });

  // init
  showSlide(0);
  setTimeout(startInterval, delayStart);
});

