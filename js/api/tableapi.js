// ==============================
// CONFIG
// ==============================

// API dari Google Apps Script
const API_URL = "https://script.google.com/macros/s/AKfycbwxcDtQ8r23mxdwGFquU66MR0y3lGU2hwCYkcbaLWc5iGsq5rHP3gN5Y_acVo1oQ9sm/exec";


// ==============================
// LOAD DATA
// ==============================
async function loadSheet() {
  const response = await fetch(API_URL);
  return await response.json();
}


// ==============================
// CARI DATA
// ==============================
async function cariSurat() {
  const inputBox = document.getElementById("searchInput");
  const jenisSurat = document.getElementById("jenisSurat").value.trim().toLowerCase();
  const input = inputBox.value.trim().toLowerCase();
  const hasilDiv = document.getElementById("hasil");

  // validasi nama/nim
  if (input === "") {
    inputBox.classList.add("input-error");
    setTimeout(() => inputBox.classList.remove("input-error"), 500);
    hasilDiv.innerHTML = `<div class="search-error">⚠️ Silakan input Nama atau NIM terlebih dahulu.</div>`;
    return;
  }

  // validasi jenis surat
  if (jenisSurat === "") {
    hasilDiv.innerHTML = `<div class="search-error">⚠️ Silakan pilih jenis surat.</div>`;
    return;
  }

  hasilDiv.innerHTML = `<div class="loading">Memuat data...</div>`;

  const data = await loadSheet();

  const hasil = data.filter(row =>
    ((row.nama || "").toLowerCase().includes(input) ||
     (row.nim || "").toLowerCase().includes(input)) &&
     (row.surat || "").toLowerCase() === jenisSurat
  );

  if (hasil.length === 0) {
    hasilDiv.innerHTML = `<div class="search-error">❌ Data tidak ditemukan.</div>`;
    return;
  }

  updateHasil(hasil);
}


// ==============================
// TAMPILKAN TABEL
// ==============================
function updateHasil(hasil) {
  const hasilDiv = document.getElementById("hasil");

  let html = `
    <table class="result-table">
      <tr>
        <th>Nama</th>
        <th>NIM</th>
        <th>Surat</th>
        <th>File</th>
      </tr>
  `;

  hasil.forEach(row => {
    const fileURL = getDrivePreviewURL(row.file);

    html += `
      <tr>
        <td>${row.nama}</td>
        <td>${row.nim}</td>
        <td>${row.surat}</td>
        <td>
          ${fileURL === "#" ? "-" : `
            <a href="${fileURL}" target="_blank" rel="noopener noreferrer">
              <button class="lihat-file-btn">Lihat File</button>
            </a>
          `}
        </td>
      </tr>
    `;
  });

  html += `</table>`;
  hasilDiv.innerHTML = html;
}


// ==============================
// AMBIL FILE ID GOOGLE DRIVE
// ==============================
function extractFileId(url) {
  if (!url) return null;

  // Format 1: .../d/FILEID/view
  let m = url.match(/\/d\/([a-zA-Z0-9_-]{10,})/);
  if (m) return m[1];

  // Format 2: ...id=FILEID
  m = url.match(/id=([a-zA-Z0-9_-]{10,})/);
  if (m) return m[1];

  return null;
}


// ==============================
// BUAT URL PREVIEW VIEWER GOOGLE DRIVE
// ==============================
function getDrivePreviewURL(fileUrl) {
  const fileId = extractFileId(fileUrl);
  if (!fileId) return "#";

  // langsung ke Google Drive viewer
  return `https://drive.google.com/file/d/${fileId}/preview`;
}


// ==============================
// HAPUS Placeholder Dropdown setelah dipilih
// ==============================
const dropdownSurat = document.getElementById("jenisSurat");

dropdownSurat.addEventListener("change", () => {
  const placeholder = dropdownSurat.querySelector('option[value=""]');
  if (placeholder) placeholder.remove();
});
