async function loadVideoContent() {

    try {
  
      const res = await fetch("/content/videos.json", { cache: "no-store" });
  
      if (!res.ok) throw new Error(`videos.json ${res.status}`);
  
      const data = await res.json();
  
      renderVideoHeader(data?.title, data?.description);
      renderVideoCards(data?.cards);
  
      window.__videoData = data;
  
    } catch (error) {
      console.error("Error loading video content:", error);
    }
  
  }
  
  function renderVideoHeader(title, description) {
  
    const titleEl = document.getElementById("videoTitle");
    const descEl = document.getElementById("videoDescription");
  
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
  
  function renderVideoCards(cards) {
  
    const wrap = document.getElementById("videoCards");
    if (!wrap) return;
  
    if (!Array.isArray(cards) || cards.length === 0) {
      wrap.innerHTML = "";
      return;
    }
  
    const sorted = [...cards].sort((a,b) => (a.order ?? 999) - (b.order ?? 999));
  
    wrap.innerHTML = sorted.map(renderOneVideo).join("");

    // process instagram embeds after DOM injection
    if (mediaAllowed() && window.instgrm && window.instgrm.Embeds) {
      window.instgrm.Embeds.process();
    } 
  }

  function buildVideoEmbed(url) {

    if (!url) return "";
  
    // YOUTUBE
    const ytMatch = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/
    );
  
    if (ytMatch) {
      return `
        <iframe
          src="https://www.youtube.com/embed/${ytMatch[1]}"
          title="YouTube video"
          allowfullscreen
          loading="lazy">
        </iframe>
      `;
    }
  
    // INSTAGRAM
    if (url.includes("instagram.com")) {
      return `
        <blockquote
          class="instagram-media"
          data-instgrm-permalink="${url}"
          data-instgrm-version="14">
        </blockquote>
      `;
    }
  
    return "";
  }
  
  function renderOneVideo(card) {

    const lang = getLang();
  
    const embed = buildVideoEmbed(card.video);
  
    const text =
      typeof card?.text === "object"
        ? pickLang(card.text, lang)
        : card?.text || "";
  
    return `
      <article class="video-card">
  
        <div class="video-embed">
          ${mediaAllowed() ? embed : renderBlockedVideo()}
        </div>
  
        ${text ? `<p class="video-text">${escapeHtml(text)}</p>` : ""}
  
      </article>
    `;
  }

  function renderBlockedVideo(){
    return `
      <div class="embed-blocked">
        <p>This video requires cookies to be accepted.</p>
        <button
          class="cookie-open-settings"
          type="button"
          aria-label="Open cookie settings">
          Enable cookies
        </button>
      </div>
    `;
  }
  
  function escapeHtml(str) {
    return str
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }
  
  document.addEventListener("DOMContentLoaded", loadVideoContent);
  
  window.addEventListener("lang:change", () => {
  
    const data = window.__videoData;
  
    if (!data) return;
  
    renderVideoHeader(data?.title, data?.description);
    renderVideoCards(data?.cards);
  
  });

  function getYoutubeId(url) {
    const regExp =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/;
  
    const match = url.match(regExp);
  
    return match ? match[1] : null;
  }

  window.addEventListener("cookie:change", () => {
    const data = window.__videoData;
    if (!data) return;
  
    renderVideoCards(data?.cards);
  });
