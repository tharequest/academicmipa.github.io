// =====================
// VARIABEL GLOBAL
// =====================
let popupImages = [];
let popupIndex = 0;

const popup = document.getElementById("popupSlider");
const popupImg = document.getElementById("popupImage");
const btnPrev = document.querySelector(".popup-prev");
const btnNext = document.querySelector(".popup-next");
const btnClose = document.getElementById("popupClose");

// Pastikan semua tombol ada
if (!popup || !popupImg || !btnPrev || !btnNext || !btnClose) {
  console.error("Popup slider element tidak ditemukan!");
}

// =====================
// OPEN POPUP UNTUK SATU GAMBAR (DROPDOWN)
// =====================
function openPopupSingle(src) {
  popupImages = [src];
  popupIndex = 0;
  openPopup();
}

// =====================
// OPEN POPUP UNTUK SLIDER (CLICK GAMBAR)
// =====================
function openPopupSlider(imageList, index) {
  popupImages = imageList;
  popupIndex = index;
  openPopup();
}

// =====================
// TAMPILKAN POPUP
// =====================
function openPopup() {
  popup.style.display = "flex";
  popupImg.src = popupImages[popupIndex];

  // Show/hide buttons if single image
  btnPrev.style.display = popupImages.length > 1 ? "block" : "none";
  btnNext.style.display = popupImages.length > 1 ? "block" : "none";
}

// =====================
// CLOSE POPUP
// =====================
btnClose.onclick = () => (popup.style.display = "none");
popup.onclick = (e) => {
  if (e.target === popup) popup.style.display = "none";
};

// =====================
// NEXT & PREV
// =====================
btnNext.onclick = () => {
  popupIndex = (popupIndex + 1) % popupImages.length;
  popupImg.src = popupImages[popupIndex];
};

btnPrev.onclick = () => {
  popupIndex = (popupIndex - 1 + popupImages.length) % popupImages.length;
  popupImg.src = popupImages[popupIndex];
};

