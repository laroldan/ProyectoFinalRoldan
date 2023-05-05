//===== CAMBIA COLOR LA NAVBAR AL SCROLLEAR
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  window.scrollY >= 56
    ? navbar.classList.add("navbar-scrolled", "navbar-dark") &
      navbar.classList.remove("bg-warning")
    : navbar.classList.remove("navbar-scrolled", "navbar-dark") &
      navbar.classList.add("bg-warning");
});
