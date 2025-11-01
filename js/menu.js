// === Responsive Menu Toggle ===
const menuToggle = document.getElementById('menu-toggle');
const navUl = document.querySelector('nav ul');

if (menuToggle && navUl) {
  menuToggle.addEventListener('click', () => {
    navUl.classList.toggle('active');
  });
}

const menuItems = document.querySelectorAll('nav ul li a');

menuItems.forEach(item => {
  item.addEventListener('click', () => {
    // hapus 'active' dari semua li
    document.querySelectorAll('nav ul li').forEach(li => li.classList.remove('active'));

    // tambahkan ke item yang diklik
    item.parentElement.classList.add('active');
  });
});
