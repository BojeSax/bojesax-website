window.getLang = function () {
    return localStorage.getItem("lang") || "en";
  };
  
  window.pickLang = function (obj, lang) {
    if (!obj || typeof obj !== "object") return "";
    return (obj[lang] || obj.en || obj.es || "").trim();
  };

const translations = {
    en: {
      nav_about: "About",
      nav_music: "Music",
      nav_video: "Video",
      nav_contact: "Contact",
      about_title: "About",
      music_title: "Music"
    },
    es: {
      nav_about: "Sobre mí",
      nav_music: "Música",
      nav_video: "Vídeo",
      nav_contact: "Contacto",
      about_title: "Sobre mí",
      music_title: "Música"
    }
  };
  
  function applyTranslations(lang) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
  }
  
  function setLanguage(lang) {
    localStorage.setItem("lang", lang);
    applyTranslations(lang);
  
    document.querySelectorAll(".lang-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
    window.dispatchEvent(new Event("lang:change"));
  }
  
  function initLanguage() {
    const savedLang = localStorage.getItem("lang") || "en";
    setLanguage(savedLang);
  
    document.querySelectorAll(".lang-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        setLanguage(btn.dataset.lang);
      });
    });
  }
  
  document.addEventListener("DOMContentLoaded", initLanguage);