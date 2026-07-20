// Delete a founder's own sessions. Backs the promise on the landing page:
// their idea stays theirs, and they can take it back whenever they want.
//
// Scoping: a founder can only erase session keys their own browser holds, or
// sessions tied to an email they can name. There are no accounts here, so this
// is deliberately narrow - it never accepts "delete everything".
const SUPABASE_URL = process.env.SUPABASE_URL || "https://qrtvbclbrumsrwbugvrr.supabase.co";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  const { passcode, sessionKeys, email } = req.body || {};
  if (passcode !== process.env.TEAM_PASSCODE) return res.status(401).json({ error: "Wrong passcode." });
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return res.status(503).json({ error: "Storage not configured." });

  const keys = Array.isArray(sessionKeys) ? sessionKeys.filter(k => typeof k === "string").slice(0, 50) : [];
  const mail = typeof email === "string" ? email.trim().toLowerCase() : "";
  if (!keys.length && !mail) return res.status(400).json({ error: "Nothing to delete." });

  const headers = {
    apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    Authorization: "Bearer " + process.env.SUPABASE_SERVICE_ROLE_KEY,
    "content-type": "application/json",
    Prefer: "return=representation",
  };

  let deleted = 0;
  try {
    if (keys.length) {
      const list = keys.map(k => '"' + String(k).replace(/"/g, "") + '"').join(",");
      const r = await fetch(SUPABASE_URL + "/rest/v1/whopaysfirst_sessions?session_key=in.(" + encodeURIComponent(list) + ")",
        { method: "DELETE", headers });
      if (r.ok) deleted += (await r.json()).length;
    }
    if (mail) {
      const r = await fetch(SUPABASE_URL + "/rest/v1/whopaysfirst_sessions?email=eq." + encodeURIComponent(mail),
        { method: "DELETE", headers });
      if (r.ok) deleted += (await r.json()).length;
    }
  } catch (_) {
    return res.status(502).json({ error: "Could not delete. Try again." });
  }

  return res.status(200).json({ ok: true, deleted });
}
