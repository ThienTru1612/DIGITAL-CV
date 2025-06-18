// NAVIGATION SECTION
// Xử lý chuyển đổi giữa các section với hiệu ứng mượt mà
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const targetId = e.currentTarget.dataset.target;
    const pages = document.querySelectorAll(".page");

    // Xóa class active trên tất cả nav-link và thêm cho link hiện tại
    document.querySelectorAll(".nav-link").forEach(nav => nav.classList.remove("active"));
    e.currentTarget.classList.add("active");

    // Ẩn section hiện tại với animation
    pages.forEach(page => {
      if (page.classList.contains("active")) {
        page.classList.remove("active");
        page.style.opacity = 0;
        page.style.transform = "translateY(25px)";
      }
    });

    // Sau 320ms, ẩn tất cả và hiển thị section đích với hiệu ứng
    setTimeout(() => {
      pages.forEach(page => page.style.display = "none");
      const targetPage = document.getElementById(targetId);
      if (targetPage) {
        targetPage.style.display = "block";
        setTimeout(() => {
          targetPage.style.opacity = 1;
          targetPage.style.transform = "translateY(0)";
          targetPage.classList.add("active");
          targetPage.focus({ preventScroll: true });
        }, 50);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 320);
  });
});

// TYPEWRITER EFFECT SECTION
// Hiệu ứng gõ chữ với blinking cursor cho phần banner intro
const typedText = document.querySelector(".typed");
const phrases = [
  "Xin chào, mình là Vũ Hoàng Yến",
  "Front-end Developer"
];
let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;
const typingSpeed = 120;

function typeWriter() {
  const currentPhrase = phrases[phraseIndex];
  typedText.textContent = currentPhrase.substring(0, letterIndex);

  if (!isDeleting && letterIndex < currentPhrase.length) {
    letterIndex++;
    setTimeout(typeWriter, typingSpeed);
  } else if (isDeleting && letterIndex > 0) {
    letterIndex--;
    setTimeout(typeWriter, typingSpeed / 2);
  } else if (!isDeleting && letterIndex === currentPhrase.length) {
    isDeleting = true;
    setTimeout(typeWriter, 1500);
  } else if (isDeleting && letterIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(typeWriter, typingSpeed);
  }
}
typeWriter();

// BACKGROUND CANVAS ANIMATION
(() => {
  const canvas = document.getElementById("starry-bg");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let width, height;
  let stars = [];
  let shootingStars = [];
  let planets = [];

  const random = (min, max) => Math.random() * (max - min) + min;

  // Star object: twinkling stars
  class Star {
    constructor() { this.reset(); }
    reset() {
      this.x = random(0, width);
      this.y = random(0, height);
      this.radius = random(0.8, 1.7);
      this.baseAlpha = random(0.2, 0.9);
      this.alpha = this.baseAlpha;
      this.alphaDirection = Math.random() > 0.5 ? 1 : -1;
      this.alphaSpeed = 0.005 + Math.random() * 0.01;
    }
    update() {
      this.alpha += this.alphaDirection * this.alphaSpeed;
      if (this.alpha >= 1) { this.alphaDirection = -1; this.alpha = 1; }
      else if (this.alpha <= 0.2) { this.alphaDirection = 1; this.alpha = 0.2; }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
      ctx.shadowColor = `rgba(255,255,255,${this.alpha})`;
      ctx.shadowBlur = 7;
      ctx.fill();
    }
  }

  // Shooting star
  class ShootingStar {
    constructor() { this.reset(); }
    reset() {
      this.x = random(width * 0.1, width * 0.9);
      this.y = random(0, height * 0.5);
      this.len = random(20, 30);
      this.speed = random(8, 15);
      this.radius = random(0.1, 0.3);
      this.angle = Math.PI / 4;
      this.alpha = 0.5;
      this.trail = [];
      this.isAlive = true;
    }
    update() {
      this.x += this.speed * Math.cos(this.angle);
      this.y += this.speed * Math.sin(this.angle);
      this.trail.push({ x: this.x, y: this.y });
      if (this.trail.length > this.len) this.trail.shift();
      if (this.x > width || this.y > height) this.isAlive = false;
    }
    draw() {
      ctx.beginPath();
      const trailLen = this.trail.length;
      for (let i = 0; i < trailLen - 1; i++) {
        const point = this.trail[i];
        const next = this.trail[i + 1];
        const alpha = i / trailLen;
        ctx.strokeStyle = `rgba(255,255,255,${alpha * this.alpha})`;
        ctx.lineWidth = this.radius * (alpha + 0.2);
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(next.x, next.y);
        ctx.stroke();
      }
    }
  }

  // Planet
  class Planet {
    constructor(orbitRadius) {
      this.orbitRadius = orbitRadius;
      this.radius = random(5, 10);
      this.orbitCenterX = width / 2;
      this.orbitCenterY = height / 2;
      this.angle = random(0, 2 * Math.PI);
      this.angularSpeed = random(0.001, 0.002);
      this.color = `hsl(${random(0, 360)}, 70%, 70%)`;
      this.shadowColor = `hsla(${random(0, 360)}, 70%, 70%, 0.6)`;
    }
    update() {
      this.angle += this.angularSpeed;
      if (this.angle > 2 * Math.PI) this.angle -= 2 * Math.PI;
    }
    draw() {
      const x = this.orbitCenterX + this.orbitRadius * Math.cos(this.angle);
      const y = this.orbitCenterY + this.orbitRadius * Math.sin(this.angle);
      ctx.beginPath();
      ctx.shadowColor = this.shadowColor;
      ctx.shadowBlur = 12;
      ctx.fillStyle = this.color;
      ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
      ctx.fill();

      ctx.beginPath();
      ctx.shadowColor = "rgba(255,255,255,0.15)";
      ctx.shadowBlur = 20;
      ctx.arc(x, y, this.radius * 1.7, 0, 2 * Math.PI);
      ctx.fillStyle = "rgba(255,255,255,0.0)";
      ctx.fill();
    }
  }

  // Create stars
  function createStars(count) {
    stars = [];
    for (let i = 0; i < count; i++) stars.push(new Star());
  }

  // Create shooting star
  function createShootingStar() {
    if (shootingStars.length < 3 && Math.random() < 0.015) shootingStars.push(new ShootingStar());
  }

  // Create planets
  function createPlanets(count) {
    planets = [];
    const minOrbitRadius = 50;
    const maxOrbitRadius = Math.min(width, height) / 3;
    const minGap = (maxOrbitRadius - minOrbitRadius) / count;
    for (let i = 0; i < count; i++) {
      let orbitRadius = minOrbitRadius + i * minGap + random(0, minGap * 0.3);
      if (orbitRadius > maxOrbitRadius) orbitRadius = maxOrbitRadius;
      planets.push(new Planet(orbitRadius));
    }
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    createStars(350);
    createPlanets(10);
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    stars.forEach(star => { star.update(); star.draw(); });
    createShootingStar();
    shootingStars.forEach((star, idx) => {
      star.update();
      star.draw();
      if (!star.isAlive) shootingStars.splice(idx, 1);
    });
    planets.forEach(planet => { planet.update(); planet.draw(); });
    requestAnimationFrame(animate);
  }

  resize();
  window.addEventListener("resize", resize);
  animate();
})();

// FLIP CARD INTERACTIONS
document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.classList.toggle('flipped');
    }
  });
});