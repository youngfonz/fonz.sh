// What did this founder promise last time? Powers the follow-up loop: the
// Strategist opens by holding them to their own deadline instead of starting cold.
const SUPABASE_URL = process.env.SUPABASE_URL || "https://qrtvbclbrumsrwbugvrr.supabase.co";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  const { passcode, name, sessionKey } = req.body || {};
  if (passcode !== process.env.TEAM_PASSCODE) return res.status(401).json({ error: "Wrong passcode." });
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return res.status(200).json({ prior: null });

  const who = String(name || "").trim().toLowerCase();
  if (!who) return res.status(200).json({ prior: null });

  try {
    // Most recent session for this founder that actually produced a plan,
    // excluding the one they're sitting in right now.
    const url = SUPABASE_URL +
      "/rest/v1/fonz_counselor_sessions" +
      "?select=session_key,member_name,commitments,plan_built_at,updated_at" +
      "&commitments=not.is.null" +
      "&order=plan_built_at.desc&limit=5";
    const r = await fetch(url, {
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: "Bearer " + process.env.SUPABASE_SERVICE_ROLE_KEY,
      },
    });
    if (!r.ok) return res.status(200).json({ prior: null });
    const rows = await r.json();

    const mine = (Array.isArray(rows) ? rows : []).filter(
      (x) => String(x.member_name || "").trim().toLowerCase() === who && x.session_key !== sessionKey
    );
    if (!mine.length) return res.status(200).json({ prior: null });

    const last = mine[0];
    const days = last.plan_built_at
      ? Math.floor((Date.now() - new Date(last.plan_built_at).getTime()) / 86400000)
      : null;

    return res.status(200).json({
      prior: {
        commitments: last.commitments,
        daysSince: days,
        builtAt: last.plan_built_at,
      },
    });
  } catch (_) {
    return res.status(200).json({ prior: null });   // never block a session on this
  }
}
