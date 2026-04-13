/* ========================================
   Mobile Nav Toggle
   ======================================== */

const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('is-active');
  navLinks.classList.toggle('is-open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('is-active');
    navLinks.classList.remove('is-open');
  });
});

/* ========================================
   Scroll Fade-in (Intersection Observer)
   ======================================== */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const fadeElements = document.querySelectorAll('.fade-in');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(el => fadeObserver.observe(el));
} else {
  document.querySelectorAll('.fade-in').forEach(el => el.classList.add('is-visible'));
}

/* ========================================
   Particle Canvas Animation
   ======================================== */

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
const hero = document.querySelector('.hero');

let particles = [];
let animationId;

function resizeCanvas() {
  canvas.width = hero.offsetWidth;
  canvas.height = hero.offsetHeight;
}

function createParticles() {
  const count = window.innerWidth < 768 ? 25 : 50;
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -(Math.random() * 0.3 + 0.1),
      opacity: Math.random() * 0.5 + 0.1
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.fillStyle = `rgba(193, 95, 60, ${p.opacity})`;
    ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);

    p.x += p.speedX;
    p.y += p.speedY;

    if (p.y < -p.size) {
      p.y = canvas.height + p.size;
      p.x = Math.random() * canvas.width;
    }
    if (p.x < -p.size || p.x > canvas.width + p.size) {
      p.x = Math.random() * canvas.width;
      p.y = canvas.height + p.size;
    }
  });

  animationId = requestAnimationFrame(drawParticles);
}

if (!prefersReducedMotion) {
  resizeCanvas();
  createParticles();
  drawParticles();

  window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
  });
}
