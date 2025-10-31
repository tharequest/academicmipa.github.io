// === Responsive Menu Toggle ===
const menuToggle = document.getElementById('menu-toggle');
const navUl = document.querySelector('nav ul');

if (menuToggle && navUl) {
  menuToggle.addEventListener('click', () => {
    navUl.classList.toggle('active');
  });
}

// === Dropdown toggle (HP) ===
const dropdown = document.querySelector('.dropdown');
if (dropdown) {
  dropdown.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      dropdown.classList.toggle('open');
    }
  });
}
