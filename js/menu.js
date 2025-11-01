// === Responsive Menu Toggle ===
const menuToggle = document.getElementById('menu-toggle');
const navUl = document.querySelector('nav ul');

if (menuToggle && navUl) {
  menuToggle.addEventListener('click', () => {
    navUl.classList.toggle('active');
  });
}

// === Menu Active Logic ===
const menuItems = document.querySelectorAll('nav > ul > li > a');

menuItems.forEach(item => {
  item.addEventListener('click', (e) => {
    // Abaikan klik dari dropdown items
    if (item.nextElementSibling && item.nextElementSibling.classList.contains('dropdown-menu')) {
      e.preventDefault(); // biar dropdown bisa dibuka di mobile
    }

    // Hapus active dari semua menu utama
    document.querySelectorAll('nav ul li').forEach(li => li.classList.remove('active'));

    // Tambahkan active ke li yang diklik
    item.parentElement.classList.add('active');
  });
});

// === Dropdown toggle (mobile) ===
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(drop => {
  drop.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      drop.classList.toggle('open');
    }
  });
});
