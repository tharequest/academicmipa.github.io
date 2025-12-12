
const popup = document.getElementById("popupSlider");
const popupImg = document.getElementById("popupImage");
const popupClose = document.getElementById("popupClose");
const popupPrev = document.querySelector(".popup-prev");
const popupNext = document.querySelector(".popup-next");

let popupImages = [];
let popupIndex = 0;

// === Ketika gambar slider di klik ===
document.querySelectorAll(".image-slider img").forEach(img => {
  img.addEventListener("click", () => {
    const slider = img.closest(".image-slider");
    popupImages = Array.from(slider.querySelectorAll("img")).map(i => i.src);
    popupIndex = popupImages.indexOf(img.src);

    openPopup();
  });
});

function openPopup() {
  popup.style.display = "flex";
  popupImg.src = popupImages[popupIndex];

  // nonaktifkan panah kalau hanya 1 gambar
  document.querySelector(".popup-prev").style.display =
  document.querySelector(".popup-next").style.display =
    popupImages.length > 1 ? "block" : "none";
}


function closePopup() {
  popup.style.display = "none";
}

// Next & Prev
popupNext.addEventListener("click", () => {
  popupIndex = (popupIndex + 1) % popupImages.length;
  popupImg.src = popupImages[popupIndex];
});

popupPrev.addEventListener("click", () => {
  popupIndex = (popupIndex - 1 + popupImages.length) % popupImages.length;
  popupImg.src = popupImages[popupIndex];
});

// Close popup
popupClose.addEventListener("click", closePopup);

// Close ketika klik background hitam
popup.addEventListener("click", (e) => {
  if (e.target === popup) closePopup();
});

// === Buka popup untuk satu gambar (dropdown) ===
function openPopupSingle(src) {
  popupImages = [src]; // hanya satu gambar
  popupIndex = 0;
  openPopup();
}

