async function loadComponent(id, path) {
    const el = document.getElementById(id);
    if (!el) return;
  
    const res = await fetch(path);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;

    window.dispatchEvent(new Event("components:loaded"));
  }
  
  document.addEventListener("DOMContentLoaded", async () => {
  
    await loadComponent("navbar", "components/navbar.html");
    await loadComponent("footer", "components/footer.html");
  
    // initialize burger menu
    if (window.initNavigation) {
      window.initNavigation();
    }
  
    // initialize language toggle
    if (window.initLanguage) {
      window.initLanguage();
    }
  
  });