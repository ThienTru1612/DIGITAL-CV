const imageSources = [
  "images_cv_ThienTru.jpg",
  "images_cv_HuyenTran.jpg",
  "images_cv_HoangYen.jpg"
];

const cardContainer = document.querySelector('.card-container');
let current = 0;
let imgElements = [];

function createImages() {
  imageSources.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.className = "member-img";
    cardContainer.appendChild(img);
    imgElements.push(img);
  });
}

function updateClasses() {
  const len = imageSources.length;
  imgElements.forEach((img, i) => {
    img.className = "member-img"; // RESET CLASS

    if (i === (current + len - 1) % len) {
      img.classList.add("left");
    } else if (i === current) {
      img.classList.add("center");
    } else if (i === (current + 1) % len) {
      img.classList.add("right");
    }
  });
}

function startAutoSlide() {
  setInterval(() => {
    current = (current + 1) % imageSources.length;
    updateClasses();
  }, 2500); // 
}

document.addEventListener("DOMContentLoaded", () => {
  createImages();
  updateClasses();
  startAutoSlide();
});

// TẠO SAO NHẤP NHÁY
const starCount = 100;
const starsContainer = document.querySelector('.stars');

for (let i = 0; i < starCount; i++) {
  const star = document.createElement('div');
  star.classList.add('star');

  const size = Math.random() * 2 + 1;
  star.style.width = size + 'px';
  star.style.height = size + 'px';

  star.style.top = (Math.random() * 100) + 'vh';
  star.style.left = (Math.random() * 100) + 'vw';

  star.style.animationDelay = (Math.random() * 2) + 's';

  starsContainer.appendChild(star);
}

// TẠO TÊN LỬA BAY 
const rocketCount = 6;
const rocketsContainer = document.querySelector('.rockets');

function randomPosition() {
  return {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight
  };
}

function createRocket() {
  const rocket = document.createElement('div');
  rocket.classList.add('rocket');
  rocket.innerHTML = '<i class="fas fa-rocket"></i>';

  let pos = randomPosition();
  rocket.style.left = pos.x + 'px';
  rocket.style.top = pos.y + 'px';

  rocket.dataset.posX = pos.x;
  rocket.dataset.posY = pos.y;

  rocket.dataset.velX = (Math.random() * 1.5 + 0.5) * (Math.random() > 0.5 ? 1 : -1);
  rocket.dataset.velY = (Math.random() * 1.5 + 0.5) * (Math.random() > 0.5 ? 1 : -1);

  rocketsContainer.appendChild(rocket);
  return rocket;
}

const rockets = [];
for (let i = 0; i < rocketCount; i++) {
  rockets.push(createRocket());
}

function animateRockets() {
  rockets.forEach(rocket => {
    let x = parseFloat(rocket.dataset.posX);
    let y = parseFloat(rocket.dataset.posY);
    let vx = parseFloat(rocket.dataset.velX);
    let vy = parseFloat(rocket.dataset.velY);

    x += vx;
    y += vy;

    if (x < 0 || x > window.innerWidth - 30) vx = -vx;
    if (y < 0 || y > window.innerHeight - 15) vy = -vy;

    rocket.dataset.posX = x;
    rocket.dataset.posY = y;
    rocket.dataset.velX = vx;
    rocket.dataset.velY = vy;

    rocket.style.left = x + 'px';
    rocket.style.top = y + 'px';
  });

  requestAnimationFrame(animateRockets);
}

animateRockets();
