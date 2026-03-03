const burger = document.getElementById("burgerBtn");
const navMenu = document.getElementById("navMenu");

if (burger && navMenu) {
  burger.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });
}