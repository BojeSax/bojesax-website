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

function scrollToSectionFromPath() {
  const path = window.location.pathname.replace(/^\/|\/$/g, "");

  if (!path) return;

  const section = document.getElementById(path);
  if (!section) return;

  setTimeout(() => {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 100);
}

document.addEventListener("DOMContentLoaded", scrollToSectionFromPath);

document.addEventListener("click", (e) => {
  const link = e.target.closest("a[data-section-link]");
  if (!link) return;

  e.preventDefault();

  const path = link.getAttribute("href").replace("/", "");
  const section = document.getElementById(path);
  if (!section) return;

  history.pushState({}, "", `/${path}`);

  section.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

window.initNavigation = initNavigation;