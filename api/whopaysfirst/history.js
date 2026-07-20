// What did this founder promise last time? Powers the follow-up loop: the
// Strategist opens by holding them to their own deadline instead of starting cold.
//
// Matching is on founder_key (a random per-browser id) or a verified email -
// NEVER on the typed name. Name matching meant the second founder called John
// was served the first John's business, milestone and blocker, read aloud. That
// is one founder's idea leaking to another, on a product that promises the
// opposite. No identifier, no prior: a cold open is the safe failure.
const SUPABASE_URL = process.env.SUPABASE_URL || "https://qrtvbclbrumsrwbugvrr.supabase.co";

const NONE = { prior: null };

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  const { passcode, founderKey, email, sessionKey } = req.body || {};
  if (passcode !== process.env.TEAM_PASSCODE) return res.status(401).json({ error: "Wrong passcode." });
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return res.status(200).json(NONE);

  const key = typeof founderKey === "string" ? founderKey.trim().slice(0, 64) : "";
  const mail = typeof email === "string" ? email.trim().toLowerCase().slice(0, 200) : "";
  if (!key && !mail) return res.status(200).json(NONE);

  // Prefer the browser key; fall back to email so a founder who switched
  // devices still gets held to their word.
  const filter = key
    ? "founder_key=eq." + encodeURIComponent(key)
    : "email=eq." + encodeURIComponent(mail);

  try {
    const url = SUPABASE_URL +
      "/rest/v1/whopaysfirst_sessions" +
      "?select=session_key,commitments,plan_built_at" +
      "&commitments=not.is.null&" + filter +
      "&order=plan_built_at.desc&limit=2";
    const r = await fetch(url, {
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: "Bearer " + process.env.SUPABASE_SERVICE_ROLE_KEY,
      },
    });
    if (!r.ok) return res.status(200).json(NONE);
    const rows = await r.json();

    const mine = (Array.isArray(rows) ? rows : []).filter(x => x.session_key !== sessionKey);
    if (!mine.length) return res.status(200).json(NONE);

    const last = mine[0];
    const days = last.plan_built_at
      ? Math.floor((Date.now() - new Date(last.plan_built_at).getTime()) / 86400000)
      : null;

    return res.status(200).json({
      prior: { commitments: last.commitments, daysSince: days, builtAt: last.plan_built_at },
    });
  } catch (_) {
    return res.status(200).json(NONE);   // never block a session on this
  }
}
