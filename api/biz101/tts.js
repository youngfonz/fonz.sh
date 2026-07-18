// Optional ElevenLabs proxy. If ELEVENLABS_API_KEY isn't set, the app falls back to browser voice.
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  const { passcode, text } = req.body || {};
  if (passcode !== process.env.TEAM_PASSCODE) return res.status(401).json({ error: "Wrong passcode." });
  if (!process.env.ELEVENLABS_API_KEY) return res.status(404).json({ error: "TTS not configured" });
  const voice = process.env.ELEVENLABS_VOICE_ID || "pNInz6obpgDQGcFmaJgB";
  const r = await fetch("https://api.elevenlabs.io/v1/text-to-speech/" + voice, {
    method: "POST",
    headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY, "content-type": "application/json" },
    body: JSON.stringify({
      text: String(text || "").slice(0, 2500),
      model_id: "eleven_turbo_v2_5",
      voice_settings: { stability: 0.5, similarity_boost: 0.75 },
    }),
  });
  if (!r.ok) return res.status(502).json({ error: "ElevenLabs " + r.status });
  const buf = Buffer.from(await r.arrayBuffer());
  res.setHeader("content-type", "audio/mpeg");
  return res.status(200).send(buf);
}
