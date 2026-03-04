function initNavigation() {

  const burger = document.getElementById("burgerBtn");
  const menu = document.getElementById("navMenu");

  if (burger && menu) {
    burger.addEventListener("click", () => {
      menu.classList.toggle("open");
      burger.classList.toggle("active");
    });
  }

  highlightCurrentPage();
}

function highlightCurrentPage() {

  const links = document.querySelectorAll(".nav-links a");

  const currentPage = window.location.pathname.split("/").pop();

  links.forEach(link => {

    const href = link.getAttribute("href");

    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }

  });

}

window.initNavigation = initNavigation;