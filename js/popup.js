// == Popup google form == //
function openGoogleForm(url) {
  window.open(
    url,
    'popupForm',
    'width=700,height=800,scrollbars=yes,resizable=yes'
  );
}

// === POPUP GAMBAR ===
function openImagePopup(src) {
  const popup = document.getElementById("imagePopup");
  const popupImg = document.getElementById("popupImg");
  popup.style.display = "block";
  popupImg.src = src;
}

// === POPUP GAMBAR DARI DROPDOWN ===
function openImagePopupByPath(imagePath) {
  const popup = document.getElementById("imagePopup");
  const popupImg = document.getElementById("popupImg");
  popup.style.display = "block";
  popupImg.src = imagePath;
}

function closePopup() {
  document.getElementById("imagePopup").style.display = "none";
}

// Tutup popup jika klik di luar gambar
window.onclick = function (event) {
  const popup = document.getElementById("imagePopup");
  if (event.target === popup) {
    popup.style.display = "none";
  }
};

//popup PDF 
function openPDFPopup(pdfUrl) {
  // Ukuran jendela popup
  const width = 800;
  const height = 600;
  const left = (screen.width / 2) - (width / 2);
  const top = (screen.height / 2) - (height / 2);

  // Buka jendela popup
  window.open(
    pdfUrl,
    "_blank",
    `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
  );
}




