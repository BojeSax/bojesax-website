async function loadHomeContent() {
    try {
      const res = await fetch("/content/home.json", { cache: "no-store" });
      if (!res.ok) throw new Error(`home.json ${res.status}`);
  
      const data = await res.json();
  
      renderSlider(data?.slider);
      renderAbout(data?.aboutImage, data?.aboutText);
  
    } catch (error) {
      console.error("Error loading home content:", error);
    }
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
  
    // (Re)initialize Bootstrap carousel after injecting slides
    try {
      const existing = bootstrap.Carousel.getInstance(carouselEl);
      if (existing) existing.dispose();
      new bootstrap.Carousel(carouselEl, {
        interval: 4500,
        ride: "carousel",
        pause: false,
        touch: true,
        wrap: true
      });
    } catch (e) {
      console.warn("Bootstrap Carousel init failed:", e);
    }
  }
  
  function renderAbout(image, paragraphs) {
    const aboutImage = document.querySelector("#about img");
    const aboutTextContainer = document.getElementById("aboutText");
  
    // Image: only replace if CMS provides one
    if (aboutImage && typeof image === "string" && image.trim()) {
      aboutImage.src = image;
    }
  
    // Text: show nothing unless CMS has paragraphs
    if (!aboutTextContainer) return;
  
    if (!Array.isArray(paragraphs) || paragraphs.length === 0) {
      aboutTextContainer.innerHTML = "";
      return;
    }
  
    aboutTextContainer.innerHTML = paragraphs
        .map((text) => {
            const clean = typeof text === "string" ? text.trim() : "";
            if (!clean) return "";
            return `<p>${escapeHtml(clean)}</p>`;
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
  
  document.addEventListener("DOMContentLoaded", loadHomeContent);