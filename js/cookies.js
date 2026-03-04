const COOKIE_KEY = "boje_cookie_consent"; // "accepted" | "rejected"

function getConsent() {
  return localStorage.getItem(COOKIE_KEY);
}

function setConsent(value) {
  localStorage.setItem(COOKIE_KEY, value);
  window.dispatchEvent(new Event("cookie:change"));
}

function renderCookieBanner() {
  if (document.getElementById("cookieBanner")) return;
  const consent = getConsent();
  if (consent) return; // already chosen

  const banner = document.createElement("div");
  banner.id = "cookieBanner";
  banner.className = "cookie-banner";
  banner.innerHTML = `
    <div class="cookie-inner">
      <div class="cookie-text">
        <strong>Cookies</strong>
        <p>
          We use essential cookies and embedded services (YouTube/Instagram/Spotify).
          You can accept or reject non-essential cookies.
        </p>
      </div>
      <div class="cookie-actions">
        <button class="cookie-btn ghost" id="cookieReject">Reject</button>
        <button class="cookie-btn" id="cookieAccept">Accept</button>
      </div>
    </div>
  `;

  document.body.appendChild(banner);

  document.getElementById("cookieAccept").addEventListener("click", () => {
    setConsent("accepted");
    banner.remove();
  });

  document.getElementById("cookieReject").addEventListener("click", () => {
    setConsent("rejected");
    banner.remove();
  });
}

function openCookieSettings() {
  // simple v1: just re-show banner by clearing preference
  localStorage.removeItem(COOKIE_KEY);
  renderCookieBanner();
}

document.addEventListener("DOMContentLoaded", () => {
  renderCookieBanner();

  const btn = document.getElementById("openCookieSettings");
  if (btn) btn.addEventListener("click", openCookieSettings);
});