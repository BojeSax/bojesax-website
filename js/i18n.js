// js/i18n.js

window.getLang = function () {
  return localStorage.getItem("lang") || "en";
};

window.pickLang = function (obj, lang) {
  if (!obj || typeof obj !== "object") return "";
  return (obj[lang] || obj.en || obj.es || "").trim();
};

const translations = {
  en: {
    // NAV
    nav_about: "About",
    nav_music: "Music",
    nav_video: "Video",
    nav_photos: "Photos",
    nav_contact: "Contact",

    //PHOTOS
    photos_follow: "Follow Böje on Instagram →",
  
    // CONTACT
    contact_title: "Book Böje",
    contact_intro:
      "For bookings, collaborations or live events, feel free to get in touch. Böje performs internationally combining live saxophone with electronic music.",
    contact_email_label: "Email",
    contact_instagram_label: "Instagram",
    contact_name: "Name",
    contact_email: "Email",
    contact_message: "Describe your request",
    contact_submit: "Send Request",

    // LEGAL
    legal_title: "Legal Notice",
    legal_intro: "Identification and contact details.",
    legal_owner: "Website Owner",
    legal_email: "Email",
    legal_purpose: "Purpose",
    legal_purpose_text:
      "This website provides information about Böje’s music, videos, and booking contact.",
    legal_liability: "Liability",
    legal_liability_text:
      "Content is provided for informational purposes. External links are not controlled by the website owner.",
    legal_ip: "Intellectual Property",
    legal_ip_text:
      "Unless otherwise stated, all content (music, media, text, branding) is owned by Böje or used with permission.",

    // PRIVACY
    privacy_title: "Privacy Policy",
    privacy_intro: "How we handle your personal data.",
    privacy_data: "What data we collect",
    privacy_data_text:
      "If you use the contact form, we collect your name, email, and message to respond to your request.",
    privacy_use: "How we use it",
    privacy_use_text:
      "We use your data only to reply to your message and manage booking inquiries.",
    privacy_storage: "Storage and retention",
    privacy_storage_text:
      "Messages are kept only as long as necessary for communication and booking management.",
    privacy_rights: "Your rights",
    privacy_rights_text:
      "You may request access, correction or deletion of your data by contacting us via email.",
    privacy_third: "Third-party services",
    privacy_third_text:
      "Embedded services like YouTube, Spotify or Instagram may collect data under their own policies.",

    // COOKIES
    cookies_title: "Cookie Policy",
    cookies_intro: "Information about cookies used on this website.",
    cookies_what: "What are cookies?",
    cookies_what_text:
      "Cookies are small files stored on your device to remember preferences and improve the browsing experience.",
    cookies_used: "Cookies used",
    cookies_used_text:
      "This site uses essential cookies and embedded services (YouTube, Spotify, Instagram) which may set their own cookies.",
    cookies_manage: "Manage cookies",
    cookies_manage_text:
      "You can accept or reject cookies via the cookie banner or manage them through your browser settings.",
  },

  es: {
    // NAV
    nav_about: "Sobre mí",
    nav_music: "Música",
    nav_video: "Vídeo",
    nav_photos: "Fotos",
    nav_contact: "Contacto",

    // FOTOS
    photos_follow: "Seguir a Böje en Instagram →",

    // CONTACT
    contact_title: "Reservar Böje",
    contact_intro:
      "Para reservas, colaboraciones o eventos en directo, no dudes en ponerte en contacto. Böje actúa internacionalmente combinando saxofón en vivo con música electrónica.",
    contact_email_label: "Email",
    contact_instagram_label: "Instagram",
    contact_name: "Nombre",
    contact_email: "Email",
    contact_message: "Describe tu solicitud",
    contact_submit: "Enviar solicitud",

    // LEGAL
    legal_title: "Aviso legal",
    legal_intro: "Identificación y datos de contacto.",
    legal_owner: "Titular del sitio web",
    legal_email: "Email",
    legal_purpose: "Finalidad",
    legal_purpose_text:
      "Este sitio web ofrece información sobre la música, vídeos y contacto para contrataciones de Böje.",
    legal_liability: "Responsabilidad",
    legal_liability_text:
      "El contenido se ofrece únicamente con fines informativos. Los enlaces externos no están bajo el control del titular.",
    legal_ip: "Propiedad intelectual",
    legal_ip_text:
      "Salvo indicación contraria, todos los contenidos (música, medios, textos y marca) pertenecen a Böje o se utilizan con permiso.",

    // PRIVACY
    privacy_title: "Política de privacidad",
    privacy_intro: "Cómo tratamos tus datos personales.",
    privacy_data: "Datos que recopilamos",
    privacy_data_text:
      "Si utilizas el formulario de contacto recopilamos tu nombre, email y mensaje para responder a tu solicitud.",
    privacy_use: "Cómo los usamos",
    privacy_use_text:
      "Los datos se utilizan únicamente para responder a tu mensaje y gestionar solicitudes de contratación.",
    privacy_storage: "Almacenamiento",
    privacy_storage_text:
      "Los mensajes se conservan únicamente el tiempo necesario para la comunicación y gestión de reservas.",
    privacy_rights: "Tus derechos",
    privacy_rights_text:
      "Puedes solicitar acceso, corrección o eliminación de tus datos escribiendo al email de contacto.",
    privacy_third: "Servicios de terceros",
    privacy_third_text:
      "Servicios integrados como YouTube, Spotify o Instagram pueden recopilar datos según sus propias políticas.",

    // COOKIES
    cookies_title: "Política de cookies",
    cookies_intro: "Información sobre las cookies utilizadas en este sitio.",
    cookies_what: "¿Qué son las cookies?",
    cookies_what_text:
      "Las cookies son pequeños archivos almacenados en tu dispositivo para recordar preferencias y mejorar la experiencia.",
    cookies_used: "Cookies utilizadas",
    cookies_used_text:
      "Este sitio utiliza cookies esenciales y servicios embebidos (YouTube, Spotify, Instagram) que pueden establecer sus propias cookies.",
    cookies_manage: "Gestionar cookies",
    cookies_manage_text:
      "Puedes aceptar o rechazar cookies desde el banner o gestionarlas en la configuración de tu navegador.",
  },
};

function applyTranslations(lang) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = translations?.[lang]?.[key];
    if (value) el.textContent = value;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    const value = translations?.[lang]?.[key];
    if (value) el.placeholder = value;
  });
}

function syncLangButtons(lang) {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
    btn.setAttribute("aria-pressed", btn.dataset.lang === lang ? "true" : "false");
  });
}

window.setLanguage = function (lang) {
  localStorage.setItem("lang", lang);
  applyTranslations(lang);
  syncLangButtons(lang);
  window.dispatchEvent(new Event("lang:change"));
};

// Event delegation -> works even if navbar is injected later
function bindLangClicksOnce() {
  if (window.__langDelegationBound) return;
  window.__langDelegationBound = true;

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".lang-btn");
    if (!btn) return;
    window.setLanguage(btn.dataset.lang);
  });
}

window.initLanguage = function () {
  bindLangClicksOnce();
  const lang = window.getLang();
  applyTranslations(lang);
  syncLangButtons(lang);
};

document.addEventListener("DOMContentLoaded", () => {
  window.initLanguage();
});

// when components.js injects navbar/footer, re-apply translations + sync buttons
window.addEventListener("components:loaded", () => {
  window.initLanguage();
});