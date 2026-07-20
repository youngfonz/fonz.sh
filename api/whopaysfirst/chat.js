// Serverless proxy: holds the OpenRouter key, gates by team passcode, saves sessions to Supabase.
const SUPABASE_URL = process.env.SUPABASE_URL || "https://qrtvbclbrumsrwbugvrr.supabase.co";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  const { passcode, name, sessionKey, messages, planMode, web, model, verify, commitments, email, founderKey } = req.body || {};

  if (!process.env.TEAM_PASSCODE || !process.env.OPENROUTER_API_KEY)
    return res.status(500).json({ error: "Server not configured. Add TEAM_PASSCODE and OPENROUTER_API_KEY in Vercel env settings." });
  if (passcode !== process.env.TEAM_PASSCODE)
    return res.status(401).json({ error: "Wrong passcode." });

  // Passcode-only check so the app can gate entry without spending a model call.
  if (verify) return res.status(200).json({ ok: true });

  // Email-only save, once the plan is built and they've asked for a copy.
  if (email && sessionKey && !messages) {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return res.status(200).json({ ok: true });
    const clean = String(email).trim().toLowerCase().slice(0, 200);
    if (!/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(clean)) return res.status(400).json({ error: "That email doesn't look right." });
    try {
      await fetch(SUPABASE_URL + "/rest/v1/whopaysfirst_sessions?session_key=eq." + encodeURIComponent(String(sessionKey).slice(0, 100)), {
        method: "PATCH",
        headers: {
          apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: "Bearer " + process.env.SUPABASE_SERVICE_ROLE_KEY,
          "content-type": "application/json",
        },
        body: JSON.stringify({ email: clean, email_at: new Date().toISOString(), updated_at: new Date().toISOString() }),
      });
    } catch (_) {}
    return res.status(200).json({ ok: true });
  }

  // Commitment-only save. No model call: this just banks what the founder
  // promised so the next session can hold them to it.
  if (commitments && sessionKey && !messages) {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return res.status(200).json({ ok: true });
    try {
      await fetch(SUPABASE_URL + "/rest/v1/whopaysfirst_sessions?session_key=eq." + encodeURIComponent(String(sessionKey).slice(0, 100)), {
        method: "PATCH",
        headers: {
          apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: "Bearer " + process.env.SUPABASE_SERVICE_ROLE_KEY,
          "content-type": "application/json",
        },
        body: JSON.stringify({ commitments, updated_at: new Date().toISOString() }),
      });
    } catch (_) {}
    return res.status(200).json({ ok: true });
  }
  if (!Array.isArray(messages) || messages.length > 400)
    return res.status(400).json({ error: "Bad request." });

  const chosenModel = (model || process.env.DEFAULT_MODEL || "google/gemini-2.5-flash").slice(0, 80);

  const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + process.env.OPENROUTER_API_KEY,
      "X-Title": "Who Pays First",
    },
    body: JSON.stringify({
      model: chosenModel,
      max_tokens: planMode ? 3000 : 1600,
      ...(web ? { plugins: [{ id: "web", max_results: 5 }] } : {}),
      messages,
    }),
  });
  const data = await r.json();
  if (!r.ok || data.error)
    return res.status(502).json({ error: (data.error && data.error.message) || "OpenRouter error " + r.status });
  const text = (data.choices && data.choices[0] && data.choices[0].message.content) || "";

  // Fire-and-forget session save (skips silently if Supabase env not set)
  try {
    if (process.env.SUPABASE_SERVICE_ROLE_KEY && sessionKey) {
      const transcript = [...messages.filter(m => m.role !== "system"), { role: "assistant", content: text }];
      await fetch(SUPABASE_URL + "/rest/v1/whopaysfirst_sessions?on_conflict=session_key", {
        method: "POST",
        headers: {
          apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: "Bearer " + process.env.SUPABASE_SERVICE_ROLE_KEY,
          "content-type": "application/json",
          Prefer: "resolution=merge-duplicates",
        },
        body: JSON.stringify({
          session_key: String(sessionKey).slice(0, 100),
          member_name: String(name || "unknown").slice(0, 100),
          ...(founderKey ? { founder_key: String(founderKey).slice(0, 64) } : {}),
          transcript,
          model: chosenModel,
          ...(planMode ? { plan_html: text, plan_built_at: new Date().toISOString() } : {}),
          ...(commitments ? { commitments } : {}),
          last_seen_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }),
      });
    }
  } catch (_) {}

  return res.status(200).json({ text });
}
