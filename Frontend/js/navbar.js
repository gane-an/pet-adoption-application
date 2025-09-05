// navbar.js
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".navbar .nav-links a");

  links.forEach((link) => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });
});
