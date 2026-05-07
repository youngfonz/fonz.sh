const SOURCES = [
  { tokenEnv: 'GITHUB_TOKEN', org: 'youngfonz' },
  { tokenEnv: 'GITHUB_TOKEN_BCC', org: 'BeyondCodeCollective' },
];

async function fetchReposForToken(token, orgLabel) {
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    Authorization: `Bearer ${token}`,
    'User-Agent': 'fonz.sh-portfolio',
  };
  const all = [];
  let page = 1;
  while (true) {
    const r = await fetch(
      `https://api.github.com/user/repos?per_page=100&page=${page}&sort=pushed&affiliation=owner,organization_member`,
      { headers }
    );
    if (!r.ok) {
      const body = await r.text();
      throw new Error(`GitHub API ${r.status} for ${orgLabel}: ${body.slice(0, 200)}`);
    }
    const batch = await r.json();
    all.push(...batch);
    if (batch.length < 100) break;
    page += 1;
    if (page > 5) break;
  }
  return all.map(r => ({ ...r, _org: orgLabel }));
}

export default async function handler(req, res) {
  const sources = SOURCES.filter(s => process.env[s.tokenEnv]);
  if (!sources.length) {
    return res.status(500).json({ error: 'No GitHub tokens configured' });
  }

  try {
    const results = await Promise.all(
      sources.map(s => fetchReposForToken(process.env[s.tokenEnv], s.org))
    );
    const merged = results.flat();
    const seen = new Set();
    const repos = merged
      .filter(r => {
        if (r.fork) return false;
        if (seen.has(r.full_name)) return false;
        seen.add(r.full_name);
        return r.owner && r.owner.login && sources.some(s => s.org.toLowerCase() === r.owner.login.toLowerCase());
      })
      .map(r => ({
        name: r.name,
        description: r.description,
        html_url: r.html_url,
        homepage: r.homepage,
        language: r.language,
        topics: r.topics || [],
        archived: r.archived,
        pushed_at: r.pushed_at,
        stargazers_count: r.stargazers_count,
        private: r.private,
        owner: r.owner.login,
        org: r._org,
      }))
      .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));

    res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=86400');
    return res.status(200).json({ repos });
  } catch (err) {
    return res.status(500).json({ error: 'Fetch failed', detail: String(err) });
  }
}
