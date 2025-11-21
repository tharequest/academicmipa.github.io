// ==============================
// CONFIG
// ==============================

// API untuk data sheet (JSON)
const API_URL = "https://script.google.com/macros/s/AKfycbwxcDtQ8r23mxdwGFquU66MR0y3lGU2hwCYkcbaLWc5iGsq5rHP3gN5Y_acVo1oQ9sm/exec";

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
          <button class="lihat-file-btn" onclick="openQR('${row.file}')">
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

//fungsi qrcode
function openQR(fileUrl) {
  const fileId = extractFileId(fileUrl);
  if (!fileId) {
    alert("File ID tidak valid!");
    return;
  }

  const previewURL = `https://drive.google.com/uc?id=${fileId}&export=view`;
  const qrURL = `https://chart.googleapis.com/chart?cht=qr&chs=400x400&chl=${encodeURIComponent(previewURL)}`;

  document.getElementById("qrModal").style.display = "flex";
  document.getElementById("qrImage").src = qrURL;
  document.getElementById("qrLinkText").textContent = previewURL;

  // Fallback jika Google Chart gagal
  document.getElementById("qrImage").onerror = () => {
    document.getElementById("qrImage").src =
      "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" +
      encodeURIComponent(previewURL);
  };

  window._lastQRLink = previewURL;
}

//untuk buka dan tutup
function closeQR() {
  document.getElementById("qrModal").style.display = "none";
}

function copyQRLink() {
  navigator.clipboard.writeText(window._lastQRLink)
    .then(() => alert("Link berhasil disalin"))
    .catch(() => alert("Gagal menyalin link"));
}
