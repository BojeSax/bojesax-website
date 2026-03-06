document.addEventListener("DOMContentLoaded", () => {

    document.body.addEventListener("click", (e) => {
  
      const img = e.target.closest(".photo-card img");
      if (!img) return;
  
      const overlay = document.createElement("div");
      overlay.className = "lightbox";
  
      overlay.innerHTML = `
        <img src="${img.src}" alt="${img.alt || "Boje photo"}">
      `;
  
      document.body.appendChild(overlay);
  
      overlay.addEventListener("click", () => overlay.remove());
  
    });
  
  });