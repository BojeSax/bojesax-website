async function loadHomeContent() {
  try {
    const res = await fetch("/content/home.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`home.json ${res.status}`);

    const data = await res.json();

    renderSlider(data?.slider);
    renderAbout(data?.aboutImage, data?.aboutText);

    window.__homeData = data;
  } catch (error) {
    console.error("Error loading home content:", error);
  }
}

function getLang() {
  return localStorage.getItem("lang") || "en";
}

function pickLang(obj, lang) {
  if (!obj || typeof obj !== "object") return "";
  return (obj[lang] || obj.en || obj.es || "").trim();
}

function startSlider() {
  const slides = document.querySelectorAll(".carousel-item");
  if (!slides.length) return;

  let current = 0;
  slides[current].classList.add("active");

  setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }, 7000);
}

function renderSlider(slider) {

  const carouselEl = document.getElementById("heroCarousel");
  const carouselInner = carouselEl?.querySelector(".carousel-inner");

  if (!carouselEl || !carouselInner) return;

  if (!Array.isArray(slider) || slider.length === 0) {
    carouselInner.innerHTML = "";
    return;
  }

  const paths = slider
    .map((item) => (typeof item === "string" ? item : item?.image))
    .map((x) => (typeof x === "string" ? x.trim() : ""))
    .filter(Boolean);

  if (paths.length === 0) {
    carouselInner.innerHTML = "";
    return;
  }

  // Render ONLY the first image immediately
  carouselInner.innerHTML = `
    <div class="carousel-item active">
      <img
        src="${paths[0]}"
        alt="Böje performing live saxophone"
        loading="eager"
        fetchpriority="high"
        decoding="async"
        width="1920"
        height="1080"
      />
    </div>
  `;

  // Load remaining slides AFTER first paint
  requestAnimationFrame(() => {

    const restSlides = paths
      .slice(1)
      .map(src => `
        <div class="carousel-item">
          <img
            src="${src}"
            alt="Böje performing live saxophone"
            loading="lazy"
            decoding="async"
            width="1920"
            height="1080"
          />
        </div>
      `)
      .join("");

    carouselInner.insertAdjacentHTML("beforeend", restSlides);

    startSlider();

  });

}

function renderAbout(image, paragraphs) {
  const aboutImage = document.querySelector("#about img");
  const aboutTextContainer = document.getElementById("aboutText");

  if (aboutImage && typeof image === "string" && image.trim()) {
    aboutImage.src = image;
    aboutImage.loading = "lazy";
    aboutImage.decoding = "async";
    aboutImage.alt = "Böje saxophonist portrait";
    aboutImage.width = 1200;
    aboutImage.height = 800;
  }

  if (!aboutTextContainer) return;

  if (!Array.isArray(paragraphs) || paragraphs.length === 0) {
    aboutTextContainer.innerHTML = "";
    return;
  }

  const lang = getLang();

  aboutTextContainer.innerHTML = paragraphs
    .map((p) => {
      const text =
        typeof p === "string"
          ? p.trim()
          : pickLang(p, lang);

      if (!text) return "";
      return `<p>${escapeHtml(text)}</p>`;
    })
    .join("");
}

function escapeHtml(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

document.querySelectorAll(".reveal").forEach((el) => {
  revealObserver.observe(el);
});

document.addEventListener("DOMContentLoaded", loadHomeContent);

window.addEventListener("lang:change", () => {
  const data = window.__homeData;
  if (!data) return;

  renderAbout(data?.aboutImage, data?.aboutText);
});