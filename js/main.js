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
   GitHub Projects Auto-populate
   ======================================== */

const projectsGrid = document.getElementById('projects-grid');
const projectsStatus = document.getElementById('projects-status');

function humanizeName(slug) {
  return slug
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

const REPO_OVERRIDES = {
  'invisblmail.cc': { homepage: 'https://invisblmail.cc' },
  'thedelusion-backup': { homepage: 'https://ididntrealiseyouthoughtlikethat.com/' },
  'dankland-market': { name: 'ReelMarket.win', homepage: 'http://reelmarket.win' },
  'spicytake': { homepage: 'https://spicytake.xyz/' },
  'pulsepro-social': { status: 'shipped' },
  'pulsepro-adsmanager': { tags: ['TypeScript', 'Next.js', 'Meta API'] },
  'bcc-academy-lxp': { status: 'hidden' },
  'bccacademy.io': { status: 'hidden' },
};

function effectiveHomepage(repo) {
  const o = REPO_OVERRIDES[repo.name];
  if (o && o.homepage) return o.homepage;
  if (repo.homepage && repo.homepage.trim()) return repo.homepage;
  return null;
}

function effectiveName(repo) {
  const o = REPO_OVERRIDES[repo.name];
  if (o && o.name) return o.name;
  return humanizeName(repo.name);
}

function classifyStatus(repo) {
  const o = REPO_OVERRIDES[repo.name];
  if (o && o.status === 'hidden') return { label: '// hidden', mod: 'hidden' };
  if (o && o.status === 'shipped') return { label: '// shipped', mod: 'shipped' };
  if (repo.archived) return { label: '// dormant', mod: 'soon' };
  if (effectiveHomepage(repo)) return { label: '// shipped', mod: 'shipped' };
  const pushed = new Date(repo.pushed_at).getTime();
  const daysSince = (Date.now() - pushed) / (1000 * 60 * 60 * 24);
  if (daysSince <= 30) return { label: '// in progress', mod: 'progress' };
  return { label: '// shipped', mod: 'shipped' };
}

function pickTags(repo) {
  const o = REPO_OVERRIDES[repo.name];
  if (o && Array.isArray(o.tags) && o.tags.length) return o.tags;
  const topics = Array.isArray(repo.topics) ? repo.topics.slice(0, 3) : [];
  if (topics.length) return topics;
  if (repo.language) return [repo.language];
  return [];
}

function renderRepoCard(repo) {
  const status = classifyStatus(repo);
  const link = effectiveHomepage(repo) || repo.html_url;
  const tags = pickTags(repo);
  const isClickable = status.mod !== 'soon' && status.mod !== 'hidden';
  const article = document.createElement(isClickable ? 'a' : 'article');
  article.className = 'project-card fade-in is-visible';
  if (isClickable) {
    article.href = link;
    article.target = '_blank';
    article.rel = 'noopener';
  }

  const header = document.createElement('div');
  header.className = 'project-card__header';
  const icon = document.createElement('span');
  icon.className = 'project-card__icon';
  icon.innerHTML = '&#9632;';
  const statusEl = document.createElement('span');
  statusEl.className = `project-card__status project-card__status--${status.mod}`;
  statusEl.textContent = status.label;
  header.append(icon, statusEl);

  const title = document.createElement('h3');
  title.className = 'project-card__title';
  title.textContent = effectiveName(repo);

  const description = document.createElement('p');
  description.className = 'project-card__description';
  description.textContent = repo.description || 'No description provided.';

  const tagsWrap = document.createElement('div');
  tagsWrap.className = 'project-card__tags';
  tags.forEach(t => {
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = t;
    tagsWrap.appendChild(tag);
  });

  if (repo.owner && repo.owner.toLowerCase() === 'beyondcodecollective') {
    const orgBadge = document.createElement('span');
    orgBadge.className = 'project-card__org';
    orgBadge.textContent = '@ Beyond Code Collective';
    title.appendChild(document.createElement('br'));
    title.appendChild(orgBadge);
  }

  article.append(header, title, description, tagsWrap);
  return article;
}

async function loadGithubProjects() {
  if (!projectsGrid) return;
  try {
    const res = await fetch('/api/repos');
    if (!res.ok) throw new Error(`API ${res.status}`);
    const { repos } = await res.json();

    projectsGrid.innerHTML = '';
    if (!repos || !repos.length) {
      projectsGrid.innerHTML = '<p class="projects__status">&gt; No repositories found.</p>';
      return;
    }
    const STATUS_ORDER = { shipped: 0, progress: 1, hidden: 2, soon: 3 };
    const sorted = [...repos].sort((a, b) => {
      const sa = STATUS_ORDER[classifyStatus(a).mod];
      const sb = STATUS_ORDER[classifyStatus(b).mod];
      if (sa !== sb) return sa - sb;
      return new Date(b.pushed_at) - new Date(a.pushed_at);
    });
    sorted.forEach(repo => projectsGrid.appendChild(renderRepoCard(repo)));
  } catch (err) {
    if (projectsStatus) {
      projectsStatus.innerHTML = `&gt; Error loading repositories: ${err.message}`;
    }
    console.error(err);
  }
}

loadGithubProjects();

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
