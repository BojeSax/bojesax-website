function getLang() {
  return localStorage.getItem("lang") || "en";
}

function pickLang(obj, lang) {
  if (!obj || typeof obj !== "object") return "";
  return obj[lang] || obj.en || "";
}

async function loadPhotos() {
  const res = await fetch("/content/photos.json", { cache: "no-store" });
  const data = await res.json();

  const lang = getLang();

  const title = document.getElementById("photosTitle");
  const desc = document.getElementById("photosDescription");

  if (title) title.textContent = pickLang(data.title, lang);
  if (desc) desc.textContent = pickLang(data.description, lang);

  const container = document.getElementById("photosGrid");
  if (!container) return;

  container.innerHTML = data.photos
    .sort((a, b) => a.order - b.order)
    .map((photo, index) => `
      <div class="photo-card reveal">
        <img
          src="${photo.image}"
          alt="Böje live sax photo ${index + 1}"
          loading="lazy"
          decoding="async"
          width="1200"
          height="900"
        >
      </div>
    `)
    .join("");

  if (window.initReveal) {
    window.initReveal();
  }
}

document.addEventListener("DOMContentLoaded", loadPhotos);
window.addEventListener("lang:change", loadPhotos);