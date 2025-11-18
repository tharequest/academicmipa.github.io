// ==============================
// CONFIG
// ==============================

// API untuk data sheet (JSON)
const API_URL = "https://script.google.com/macros/s/AKfycbzFHP6Pf2dE_FPuaspvDc1MQ4pxhAYORmmn0P3KtwKL-K8vMIWMHoLecDoUvYJIBQwW/exec";

// ==============================
// LOAD DATA DARI GOOGLE SHEET
// ==============================
async function loadSheet() {
  const response = await fetch(API_URL);
  return await response.json();
}

// ==============================
// CARI DATA SURAT
// ==============================
async function cariSurat() {
  const input = document.getElementById("searchInput").value.trim().toLowerCase();
  const hasilDiv = document.getElementById("hasil");

  hasilDiv.innerHTML = `<div class="loading">Memuat data...</div>`;

  const data = await loadSheet();

  const hasil = data.filter(row =>
    (row.nama || "").toLowerCase().includes(input) ||
    (row.nim || "").toLowerCase().includes(input)
  );

  if (hasil.length === 0) {
    hasilDiv.innerHTML = `<div class="no-result">❌ Data tidak ditemukan.</div>`;
    return;
  }

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
    html += `
      <tr>
        <td>${row.nama}</td>
        <td>${row.nim}</td>
        <td>${row.surat}</td>
        <td>
          <button class="lihat-file-btn" onclick="openPDF('${row.file}')">
            Lihat File
          </button>
        </td>
      </tr>
    `;
  });

  html += `</table>`;
  hasilDiv.innerHTML = html;
}


// ==============================
// EXTRACT FILE ID GOOGLE DRIVE
// ==============================
function extractFileId(url) {
  if (!url) return null;

  let m = url.match(/\/d\/([a-zA-Z0-9_-]{10,})/);
  if (m) return m[1];

  m = url.match(/id=([a-zA-Z0-9_-]{10,})/);
  if (m) return m[1];

  return null;
}

// ==============================
// BUKA POPUP PDF
// ==============================
function openPDF(fileUrl) {
  const fileId = extractFileId(fileUrl);

  if (!fileId) {
    alert("File ID tidak valid!");
    return;
  }

  const viewerURL = `https://drive.google.com/file/d/${fileId}/view`;

  window.open(
    viewerURL,
    "_blank",
    "width=900,height=700,top=50,left=150,resizable=yes,scrollbars=yes"
  );
}
