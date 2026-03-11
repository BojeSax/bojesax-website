const COOKIE_KEY = "boje_cookie_preferences";

function getPreferences(){
  const stored = localStorage.getItem(COOKIE_KEY);
  return stored ? JSON.parse(stored) : null;
}

function savePreferences(prefs){
  localStorage.setItem(COOKIE_KEY, JSON.stringify(prefs));
  window.dispatchEvent(new Event("cookie:change"));
}

function mediaAllowed(){
  const prefs = getPreferences();
  return prefs?.media === true;
}

/* ---------- BANNER ---------- */

function renderCookieBanner(){

  if(getPreferences()) return;

  const banner = document.createElement("div");
  banner.className = "cookie-banner";

  banner.innerHTML = `
  <div class="cookie-inner">

    <p>
      This site uses cookies and embedded media
      (YouTube, Instagram, Spotify, SoundCloud).
    </p>

    <div class="cookie-actions">
      <button type="button" id="cookieAcceptAll" class="cookie-btn">Accept all</button>
      <button type="button" id="cookieOpenSettings" class="cookie-btn ghost">Settings</button>
    </div>

  </div>
  `;

  document.body.appendChild(banner);

  document.getElementById("cookieAcceptAll").onclick = () => {
    savePreferences({ essential:true, media:true });
    banner.remove();
  };

  document.getElementById("cookieOpenSettings").onclick = () => {
    banner.remove();
    renderCookieModal();
  };
}

/* ---------- MODAL ---------- */

function renderCookieModal(){

  const modal = document.createElement("div");
  modal.className = "cookie-modal";

  modal.innerHTML = `
  <div class="cookie-panel">

    <h2>Cookie preferences</h2>

    <div class="cookie-option">
      <label>
        <input type="checkbox" checked disabled>
        Essential cookies (required)
      </label>
    </div>

    <div class="cookie-option">
      <label>
        <input type="checkbox" id="mediaToggle">
        Media embeds (YouTube, Instagram, Spotify, SoundCloud)
      </label>
    </div>

    <div class="cookie-modal-actions">
      <button id="cookieSave" class="cookie-btn">Save preferences</button>
    </div>

  </div>
  `;

  document.body.appendChild(modal);

  document.getElementById("cookieSave").onclick = () => {

    const media = document.getElementById("mediaToggle").checked;

    savePreferences({
      essential:true,
      media:media
    });

    modal.remove();
  };
}

/* ---------- OPEN SETTINGS ---------- */

function openCookieSettings(){
  renderCookieModal();
}

document.addEventListener("click", e=>{
  if(e.target.classList.contains("cookie-open-settings")){
    openCookieSettings();
  }
});

/* ---------- INIT ---------- */

document.addEventListener("DOMContentLoaded",()=>{
  renderCookieBanner();
});