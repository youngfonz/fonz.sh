/* ========================================
   YouTube: swap the poster for the player on click
   ======================================== */

document.querySelectorAll('.feature[data-video]').forEach(card => {
  card.addEventListener('click', (e) => {
    const id = card.dataset.video;
    const frame = card.querySelector('.feature__frame');
    if (!id || !frame || frame.querySelector('iframe')) return;
    e.preventDefault();

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    iframe.title = card.querySelector('.feature__title')?.textContent || 'YouTube video';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    frame.replaceChildren(iframe);
  });
});

/* ========================================
   GitHub projects auto-populate
   ======================================== */

const projectsGrid = document.getElementById('projects-grid');
const projectsStatus = document.getElementById('projects-status');

function humanizeName(slug) {
  return slug.replace(/[-_]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

const REPO_OVERRIDES = {
  'invisblmail.cc': { homepage: 'https://invisblmail.cc' },
  'thedelusion-backup': { hidden: true, homepage: 'https://ididntrealiseyouthoughtlikethat.com/' },
  'dankland-market': { name: 'ReelMarket.win', homepage: 'https://www.reelmarket.win' },
  'spicytake': { homepage: 'https://spicytake.xyz/' },
  'pulsepro-social': { status: 'shipped' },
  'pulsepro-adsmanager': { tags: ['TypeScript', 'Next.js', 'Meta API'] },
  'pulsepro-converter': { hidden: true },
  'pulsepro-flight-app': { hidden: true },
  'bcc-academy-lxp': { name: 'BCC Academy', homepage: 'https://bccacademy.io', tags: ['Next.js', 'Supabase', 'Cohort programs'] },
  'course-builder': { name: 'Forward Deploy Course Builder', tags: ['FDE program', 'TypeScript'] },
  'wearebcc.org': { homepage: 'https://wearebcc.org' },
  'bccacademy.io': { status: 'hidden', homepage: 'https://bccacademy.io' },
  'fonz.sh': { hidden: true },
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
  if (o && o.status === 'hidden') return { label: 'Private', mod: 'hidden' };
  if (o && o.status === 'shipped') return { label: 'Shipped', mod: 'shipped' };
  if (repo.archived) return { label: 'Dormant', mod: 'soon' };
  if (effectiveHomepage(repo)) return { label: 'Shipped', mod: 'shipped' };
  const daysSince = (Date.now() - new Date(repo.pushed_at).getTime()) / 86400000;
  if (daysSince <= 30) return { label: 'In progress', mod: 'progress' };
  return { label: 'Shipped', mod: 'shipped' };
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
  const hasPublicLink = effectiveHomepage(repo) || !repo.private;
  const isClickable = status.mod !== 'soon' && status.mod !== 'hidden' && hasPublicLink;

  const row = document.createElement(isClickable ? 'a' : 'article');
  row.className = 'repo';
  if (!isClickable) row.classList.add('repo--muted');
  if (isClickable) {
    row.href = link;
    row.target = '_blank';
    row.rel = 'noopener';
  }

  const name = document.createElement('h3');
  name.className = 'repo__name';
  name.textContent = effectiveName(repo);
  if (repo.owner && repo.owner.toLowerCase() === 'beyondcodecollective') {
    const org = document.createElement('span');
    org.className = 'repo__org';
    org.textContent = 'Beyond Code Collective';
    name.appendChild(org);
  }

  const desc = document.createElement('p');
  desc.className = 'repo__desc';
  desc.textContent = repo.description || 'No description yet.';

  const tags = document.createElement('p');
  tags.className = 'repo__tags';
  pickTags(repo).forEach(t => {
    const tag = document.createElement('span');
    tag.textContent = t;
    tags.appendChild(tag);
  });

  const statusEl = document.createElement('p');
  statusEl.className = `repo__status repo__status--${status.mod}`;
  statusEl.textContent = status.label;

  row.append(name, desc, tags, statusEl);
  return row;
}

async function loadGithubProjects() {
  if (!projectsGrid) return;
  try {
    const res = await fetch('/api/repos');
    if (!res.ok) throw new Error(`API ${res.status}`);
    const { repos } = await res.json();

    projectsGrid.innerHTML = '';
    if (!repos || !repos.length) {
      projectsGrid.innerHTML = '<p class="repos__status">No repositories found.</p>';
      return;
    }

    const STATUS_ORDER = { shipped: 0, progress: 1, hidden: 2, soon: 3 };
    const visible = repos.filter(r => !(REPO_OVERRIDES[r.name] && REPO_OVERRIDES[r.name].hidden));
    visible
      .sort((a, b) => {
        const sa = STATUS_ORDER[classifyStatus(a).mod];
        const sb = STATUS_ORDER[classifyStatus(b).mod];
        if (sa !== sb) return sa - sb;
        return new Date(b.pushed_at) - new Date(a.pushed_at);
      })
      .forEach(repo => projectsGrid.appendChild(renderRepoCard(repo)));
  } catch (err) {
    if (projectsStatus) {
      projectsStatus.textContent = `Could not load repositories (${err.message}). See github.com/youngfonz.`;
    }
    console.error(err);
  }
}

loadGithubProjects();
