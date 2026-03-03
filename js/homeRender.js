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
    const carouselInner = document.querySelector("#heroCarousel .carousel-inner");
    if (!carouselInner) return;
  
    // Show nothing unless CMS has images
    if (!Array.isArray(slider) || slider.length === 0) {
      carouselInner.innerHTML = "";
      return;
    }
  
    carouselInner.innerHTML = slider
      .map((item, index) => {
        const activeClass = index === 0 ? "active" : "";
        const src = item?.image;
        if (!src) return "";
        return `
          <div class="carousel-item ${activeClass}">
            <img src="${src}" class="d-block w-100 vh-100 object-fit-cover" alt="Böje slide ${index + 1}" />
          </div>
        `;
      })
      .join("");
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
      .map((p) => {
        const text = p?.paragraph?.trim();
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
  
  document.addEventListener("DOMContentLoaded", loadHomeContent);