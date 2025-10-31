function openGoogleForm1() {
  window.open(
    'https://docs.google.com/forms/d/e/1FAIpQLSfcv_u0UlgJgJ_PuKC_ELfI5UUwLufISUdXlNl37VD_NMSAOg/viewform',
    'popupForm',
    'width=700,height=800,scrollbars=yes,resizable=yes'
  );
}
function openGoogleForm2() {
  window.open(
    'https://docs.google.com/forms/d/e/1FAIpQLSeleQzeEElYtt8PoW8tHm5wL4t6GJbDzfRjhQ6Bwn3KHtSzbg/viewform',
    'popupForm',
    'width=700,height=800,scrollbars=yes,resizable=yes'
  );
}
function openGoogleForm3() {
  window.open(
    'https://docs.google.com/forms/d/e/1FAIpQLSdQoxaDKvz17ElZSTW7zuV4p-9SMfIAqIz015WU0LiEa6FywA/viewform',
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



