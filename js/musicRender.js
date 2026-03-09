async function loadMusicContent() {
    try {
      const res = await fetch("/content/music.json", { cache: "no-store" });
      if (!res.ok) throw new Error(`music.json ${res.status}`);
  
      const data = await res.json();
  
      renderMusicHeader(data?.title, data?.description);
      renderMusicCards(data?.cards);

      window.__musicData = data;
  
    } catch (error) {
      console.error("Error loading music content:", error);
    }
  }
  
  function renderMusicHeader(title, description) {
    const titleEl = document.getElementById("musicTitle");
    const descEl = document.getElementById("musicDescription");
  
    const lang = getLang();
  
    if (titleEl) {
      titleEl.textContent =
        typeof title === "object"
          ? pickLang(title, lang)
          : title || "";
    }
  
    if (descEl) {
      descEl.textContent =
        typeof description === "object"
          ? pickLang(description, lang)
          : description || "";
    }
  }
  
  function renderMusicCards(cards) {
    const wrap = document.getElementById("musicCards");
    if (!wrap) return;
  
    if (!Array.isArray(cards) || cards.length === 0) {
      wrap.innerHTML = "";
      return;
    }
  
    // sort by order (missing order goes last)
    const sorted = [...cards].sort((a, b) => {
      const ao = Number.isFinite(a?.order) ? a.order : 9999;
      const bo = Number.isFinite(b?.order) ? b.order : 9999;
      return ao - bo;
    });
  
    wrap.innerHTML = sorted.map(renderOneCard).join(`<div class="music-divider"></div>`);
  }

  function extractIframe(embedHtml) {
    if (!embedHtml) return "";
  
    const parser = new DOMParser();
    const doc = parser.parseFromString(embedHtml, "text/html");
    const iframe = doc.querySelector("iframe");
  
    return iframe ? iframe.outerHTML : "";
  }
  
  function renderOneCard(card) {
    const lang = getLang();
    const embed =
      typeof card?.embed === "string"
        ? extractIframe(card.embed.trim())
        : "";
    const title =
      typeof card?.cardTitle === "object"
        ? pickLang(card.cardTitle, lang)
        : card?.cardTitle || "";

    const desc =
      typeof card?.cardDescription === "object"
        ? pickLang(card.cardDescription, lang)
        : card?.cardDescription || "";
  
    // show nothing if no embed and no text
    if (!embed && !title && !desc) return "";
  
    return `
    <article class="music-card">
      <div class="music-card-inner">
        
        <div class="music-embed">
          ${embed || ""}
        </div>
  
        <div class="music-content">
          ${title ? `<h3 class="music-card-title">${escapeHtml(title)}</h3>` : ""}
          ${desc ? `<p class="music-card-desc">${escapeHtml(desc)}</p>` : ""}
        </div>
  
      </div>
    </article>
  `;
  }
  
  function escapeHtml(str) {
    return str
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
  
  document.addEventListener("DOMContentLoaded", loadMusicContent);

  window.addEventListener("lang:change", () => {
    const data = window.__musicData;
    if (!data) return;
  
    renderMusicHeader(data?.title, data?.description);
    renderMusicCards(data?.cards);
  });