// =============================================================
//                 POPUP MASTER SCRIPT (1 FILE ONLY)
//  Menggabungkan: Google Form, PDF, Popup Gambar, Slider Popup
// =============================================================

// -------------------------------------------------------------
// 1. GOOGLE FORM POPUP
// -------------------------------------------------------------
function openGoogleForm(url) {
  window.open(
    url,
    "popupForm",
    "width=700,height=800,scrollbars=yes,resizable=yes"
  );
}

// -------------------------------------------------------------
// 2. PDF POPUP
// -------------------------------------------------------------
function openPDFPopup(pdfUrl) {
  const width = 800;
  const height = 600;
  const left = (screen.width / 2) - (width / 2);
  const top = (screen.height / 2) - (height / 2);

  window.open(
    pdfUrl,
    "_blank",
    `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
  );
}

// -------------------------------------------------------------
// 3. POPUP SLIDER GAMBAR
// -------------------------------------------------------------
let popupImages = [];
let popupIndex = 0;

// Mencari elemen popup
const popup = document.getElementById("popupSlider");
const popupImg = document.getElementById("popupImage");
const btnPrev = document.querySelector(".popup-prev");
const btnNext = document.querySelector(".popup-next");
const btnClose = document.getElementById("popupClose");

// -------------------------------------------------------------
// 4. BUKA POPUP UNTUK 1 GAMBAR (dropdown)
// -------------------------------------------------------------
function openPopupSingle(src) {
  popupImages = [src];
  popupIndex = 0;
  openPopup();
}

// -------------------------------------------------------------
// 5. BUKA POPUP UNTUK LIST GAMBAR (slider utama)
// -------------------------------------------------------------
function openPopupSlider(list, index) {
  popupImages = list.slice();
  popupIndex = index;
  openPopup();
}

// -------------------------------------------------------------
// 6. MENAMPILKAN POPUP
// -------------------------------------------------------------
function openPopup() {
  popup.style.display = "flex";
  popupImg.src = popupImages[popupIndex];

  // tampilkan/hilangkan tombol panah
  const showArrows = popupImages.length > 1;
  btnPrev.style.display = showArrows ? "block" : "none";
  btnNext.style.display = showArrows ? "block" : "none";
}

// -------------------------------------------------------------
// 7. CLOSE POPUP
// -------------------------------------------------------------
btnClose.onclick = () => {
  popup.style.display = "none";
};

// klik area gelap → tutup popup
popup.addEventListener("click", (e) => {
  if (e.target === popup) popup.style.display = "none";
});

// -------------------------------------------------------------
// 8. TOMBOL NEXT
// -------------------------------------------------------------
btnNext.onclick = () => {
  popupIndex = (popupIndex + 1) % popupImages.length;
  popupImg.src = popupImages[popupIndex];
};

// -------------------------------------------------------------
// 9. TOMBOL PREV
// -------------------------------------------------------------
btnPrev.onclick = () => {
  popupIndex = (popupIndex - 1 + popupImages.length) % popupImages.length;
  popupImg.src = popupImages[popupIndex];
};

// -------------------------------------------------------------
// 10. AUTO DETEK KLIK GAMBAR DI SLIDER UTAMA
//     — klik image slider langsung buka popup slider
// -------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".image-slider").forEach((slider) => {
    const imgs = Array.from(slider.querySelectorAll("img"));
    const list = imgs.map((img) => img.src);

    imgs.forEach((img, idx) => {
      img.addEventListener("click", () => {
        openPopupSlider(list, idx);
      });
    });
  });
});
