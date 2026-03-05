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
  
    // Show nothing unless CMS has images
    if (!Array.isArray(slider) || slider.length === 0) {
      carouselInner.innerHTML = "";
      return;
    }
  
    // Normalize: allow ["path"] or [{image:"path"}]
    const paths = slider
      .map((item) => (typeof item === "string" ? item : item?.image))
      .map((x) => (typeof x === "string" ? x.trim() : ""))
      .filter(Boolean);
  
    if (paths.length === 0) {
      carouselInner.innerHTML = "";
      return;
    }
  
    carouselInner.innerHTML = paths
      .map(
        (src, index) => `
          <div class="carousel-item ${index === 0 ? "active" : ""}">
            <img
              src="${src}"
              class="d-block w-100 vh-100 object-fit-cover"
              alt="Böje slide ${index + 1}"
            />
          </div>
        `
      )
      .join("");

    startSlider();
  }
  
  function renderAbout(image, paragraphs) {
    const aboutImage = document.querySelector("#about img");
    const aboutTextContainer = document.getElementById("aboutText");
  
    if (aboutImage && typeof image === "string" && image.trim()) {
      aboutImage.src = image;
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
  
  // Small safety helper (prevents breaking HTML if someone pastes weird chars)
  function escapeHtml(str) {
    return str
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("visible");
      }
    });
  });
  
  document.querySelectorAll(".reveal").forEach(el => {
    revealObserver.observe(el);
  });
  
  document.addEventListener("DOMContentLoaded", loadHomeContent);

  window.addEventListener("lang:change", () => {
    const data = window.__homeData;
    if (!data) return;
  
    renderAbout(data?.aboutImage, data?.aboutText);
  });