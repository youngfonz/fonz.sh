// Serverless proxy: holds the OpenRouter key, gates by team passcode, saves sessions to Supabase.
const SUPABASE_URL = process.env.SUPABASE_URL || "https://qrtvbclbrumsrwbugvrr.supabase.co";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  const { passcode, name, sessionKey, messages, planMode, web, model, verify, commitments, email, founderKey, stream } = req.body || {};

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

  const upstreamBody = {
    model: chosenModel,
    max_tokens: planMode ? 3000 : 1600,
    ...(web ? { plugins: [{ id: "web", max_results: 5 }] } : {}),
    messages,
  };

  // Streamed path: the founder hears the first sentence while the rest is still
  // being written, instead of waiting for the whole reply to land.
  if (stream) {
    const up = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + process.env.OPENROUTER_API_KEY,
        "X-Title": "Who Pays First",
      },
      body: JSON.stringify({ ...upstreamBody, stream: true }),
    });
    if (!up.ok || !up.body) {
      const d = await up.json().catch(() => ({}));
      return res.status(502).json({ error: (d.error && d.error.message) || "OpenRouter error " + up.status });
    }
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.setHeader("cache-control", "no-cache, no-transform");
    res.setHeader("x-accel-buffering", "no");

    let full = "";
    const reader = up.body.getReader();
    const dec = new TextDecoder();
    let buf = "";
    try {
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() || "";
        for (const line of lines) {
          const t = line.trim();
          if (!t.startsWith("data:")) continue;
          const payload = t.slice(5).trim();
          if (!payload || payload === "[DONE]") continue;
          try {
            const j = JSON.parse(payload);
            const piece = j.choices && j.choices[0] && j.choices[0].delta && j.choices[0].delta.content;
            if (piece) { full += piece; res.write(piece); }
          } catch (_) {}
        }
      }
    } catch (_) {}
    res.end();
    await saveSession({ sessionKey, name, founderKey, messages, text: full, chosenModel, planMode, commitments });
    return;
  }

  const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + process.env.OPENROUTER_API_KEY,
      "X-Title": "Who Pays First",
    },
    body: JSON.stringify(upstreamBody),
  });
  const data = await r.json();
  if (!r.ok || data.error)
    return res.status(502).json({ error: (data.error && data.error.message) || "OpenRouter error " + r.status });
  const text = (data.choices && data.choices[0] && data.choices[0].message.content) || "";

  await saveSession({ sessionKey, name, founderKey, messages, text, chosenModel, planMode, commitments });
  return res.status(200).json({ text });
}

// Shared by both the streamed and non-streamed paths so a session is recorded
// identically either way. Never throws: a failed save must not break a reply.
async function saveSession({ sessionKey, name, founderKey, messages, text, chosenModel, planMode, commitments }) {
  try {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !sessionKey) return;
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
  } catch (_) {}
}
