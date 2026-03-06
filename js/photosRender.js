async function loadPhotos(){

    const res = await fetch("/content/photos.json",{cache:"no-store"})
    const data = await res.json()
  
    renderPhotos(data.photos)
  
  }
  
  function renderPhotos(photos){
  
    const grid = document.getElementById("photosGrid")
    if(!grid) return
  
    grid.innerHTML = photos.map(p => `
  
      <a href="${p.instagram || '#'}" target="_blank" class="photo-card">
        <img src="${p.image}" alt="Boje photo">
      </a>
  
    `).join("")
  
  }
  
  document.addEventListener("DOMContentLoaded",loadPhotos)