const popup = document.getElementById("donatePopup");
const closeBtn = document.getElementById("closePopup");

let shown1 = false;
let shown2 = false;
let shown3 = false;


setTimeout(() => {
    if (!shown1) {
        popup.classList.remove("hidden");
        shown1 = true;

        setTimeout(() => {
            popup.classList.add("hidden");
        }, 25000);
    }
}, 45000);


setTimeout(() => {
    if (!shown2) {
        popup.classList.remove("hidden");
        shown2 = true;

        setTimeout(() => {
            popup.classList.add("hidden");
        }, 25000);
    }
}, 60000);


setTimeout(() => {
    if (!shown3) {
        popup.classList.remove("hidden");
        shown3 = true;

        setTimeout(() => {
            popup.classList.add("hidden");
        }, 25000);
    }
}, 300000);

closeBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
});

function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Скопійовано");
    });
}

let scale = 1;

let posX = 0;
let posY = 0;

let isDown = false;
let startX = 0;
let startY = 0;

const minScale = 0.5;
const maxScale = 8;

const mapInner = document.getElementById("mapInner");
const container = document.getElementById("mapContainer");

let isActive = false;
const closeBtnMap = document.getElementById("closeBtn");

let touches = [];
let lastDist = null;

container.addEventListener("click", () => {
    if (isActive) return;
  
    isActive = true;
    closeBtnMap.classList.remove("hidden");
  });
  closeBtnMap.addEventListener("click", (e) => {
    e.stopPropagation();
  
    isActive = false;
    closeBtnMap.classList.add("hidden");
  
    scale = 1;
    posX = 0;
    posY = 0;
  
    update();
  });

function update() {
  mapInner.style.transform =
    `translate(${posX}px, ${posY}px) scale(${scale})`;
}



container.addEventListener("mousedown", (e) => {
    if (!isActive || e.button !== 0) return;

  isDown = true;
  container.style.cursor = "grabbing";

  startX = e.clientX - posX;
  startY = e.clientY - posY;
});

window.addEventListener("mouseup", () => {
  isDown = false;
  container.style.cursor = "grab";
});

container.addEventListener("mousemove", (e) => {
  if (!isDown || !isActive) return;
  posX = e.clientX - startX;
  posY = e.clientY - startY;

  update();
});



container.addEventListener("wheel", (e) => {
    if (!isActive) return;
    e.preventDefault();

  const rect = container.getBoundingClientRect();

  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  const prevScale = scale;

  const zoomStep = 0.5;

  if (e.deltaY < 0) {
    scale = Math.min(maxScale, scale + zoomStep);
  } else {
    scale = Math.max(minScale, scale - zoomStep);
  }

  const factor = scale / prevScale;

  posX = mx - (mx - posX) * factor;
  posY = my - (my - posY) * factor;

  update();
});
container.addEventListener("pointerdown", (e) => {
    if (!isActive) return;
  
    touches.push(e);
  
    if (touches.length === 1) {
      isDown = true;
  
      startX = e.clientX - posX;
      startY = e.clientY - posY;
    }
  
    if (touches.length === 2) {
      isDown = false;
      lastDist = getDist(touches[0], touches[1]);
    }
  });
  
  container.addEventListener("pointermove", (e) => {
    if (!isActive) return;
  
    
    touches = touches.map(t => (t.pointerId === e.pointerId ? e : t));
  
    if (touches.length === 2) {
    
      const dist = getDist(touches[0], touches[1]);
  
      if (lastDist) {
        const diff = dist - lastDist;
  
        scale += diff * 0.01;
        scale = Math.max(minScale, Math.min(maxScale, scale));
  
        update();
      }
  
      lastDist = dist;
      return;
    }
  
    if (!isDown) return;
  
    posX = e.clientX - startX;
    posY = e.clientY - startY;
  
    update();
  });
  
  container.addEventListener("pointerup", (e) => {
    touches = touches.filter(t => t.pointerId !== e.pointerId);
  
    if (touches.length < 2) lastDist = null;
    if (touches.length === 0) isDown = false;
  });
  
  container.addEventListener("pointercancel", () => {
    touches = [];
    isDown = false;
    lastDist = null;
  });
 
  function getDist(a, b) {
    const dx = a.clientX - b.clientX;
    const dy = a.clientY - b.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }
  document.getElementById("mapImage").addEventListener("click", (e) => {
    console.log(e.offsetX, e.offsetY);
  });
  
  window.addEventListener("resize", () => {
    updateMap();
});

function updateMap() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    let scaleMap = window.innerWidth <= 768 ? 1.0 : 1.5;

    const offsetX = (screenWidth / 2) - (x * scaleMap);
    const offsetY = (screenHeight / 2) - (y * scaleMap);

    mapInner.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scaleMap})`;
}

updateMap();
const x = 546;
const y = 374;
const scaleMap = 1.5; 



if (window.innerWidth <= 768) {
    scaleMap = 1.0;
}

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const mapWidth = mapImage.clientWidth * scaleMap;
const mapHeight = mapImage.clientHeight * scaleMap;

const offsetX = (screenWidth / 2) - (x * scaleMap);
const offsetY = (screenHeight / 2) - (y * scaleMap);

mapInner.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scaleMap})`;