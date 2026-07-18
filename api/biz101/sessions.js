// Admin: list all team sessions. Gated by ADMIN_PASSCODE (falls back to TEAM_PASSCODE).
const SUPABASE_URL = process.env.SUPABASE_URL || "https://qrtvbclbrumsrwbugvrr.supabase.co";

export default async function handler(req, res) {
  const pass = req.method === "POST" ? (req.body || {}).passcode : req.query.passcode;
  const admin = process.env.ADMIN_PASSCODE || process.env.TEAM_PASSCODE;
  if (!admin || pass !== admin) return res.status(401).json({ error: "Wrong passcode." });
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return res.status(500).json({ error: "SUPABASE_SERVICE_ROLE_KEY not set." });
  const r = await fetch(
    SUPABASE_URL + "/rest/v1/fonz_counselor_sessions?select=session_key,member_name,model,created_at,updated_at,transcript,plan_html&order=updated_at.desc&limit=100",
    { headers: { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY, Authorization: "Bearer " + process.env.SUPABASE_SERVICE_ROLE_KEY } }
  );
  const rows = await r.json();
  if (!r.ok) return res.status(502).json({ error: "Supabase error" });
  return res.status(200).json({ sessions: rows });
}
