function initReveal() {

    const elements = document.querySelectorAll(".reveal");
  
    if (!elements.length) return;
  
    const observer = new IntersectionObserver((entries) => {
  
      entries.forEach(entry => {
  
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
  
      });
  
    }, {
      threshold: 0.15
    });
  
    elements.forEach(el => observer.observe(el));
  }
  
  document.addEventListener("DOMContentLoaded", initReveal);