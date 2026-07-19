// Voice for the Strategist. Prefers OpenAI TTS; falls back to ElevenLabs if
// only that key is set, and to the browser's own voice if neither is.
// Both providers return MP3, so the client (and the orb's waveform) is unchanged.

const OPENAI_VOICE = process.env.OPENAI_VOICE_ID || "onyx";
// Voices the client may pick. Anything else falls back to the default.
const ALLOWED_VOICES = ["alloy","ash","ballad","coral","echo","fable","nova","onyx","sage","shimmer","verse"];
const OPENAI_TTS_MODEL = process.env.OPENAI_TTS_MODEL || "gpt-4o-mini-tts";

// How the lines should land. gpt-4o-mini-tts takes plain-English direction.
const DELIVERY = process.env.OPENAI_TTS_INSTRUCTIONS ||
  "Speak like a sharp, warm business mentor talking across a table. Direct and real, never corporate. " +
  "Brisk conversational pace - keep it moving, no dead air between sentences. Short confident sentences, " +
  "natural pauses. Encouraging when the founder is onto something, plainly skeptical when they're being " +
  "vague. Never announcer-like, never salesy.";

const DEFAULT_SPEED = Number(process.env.OPENAI_TTS_SPEED || 1.15);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  const { passcode, text, speed, voice: wantVoice } = req.body || {};
  if (passcode !== process.env.TEAM_PASSCODE) return res.status(401).json({ error: "Wrong passcode." });

  const line = String(text || "").slice(0, 2500);
  if (!line) return res.status(400).json({ error: "Nothing to say." });

  // Client can tune pace live; OpenAI accepts 0.25-4.0.
  const rate = Math.min(4, Math.max(0.25, Number(speed) || DEFAULT_SPEED));
  const voiceId = ALLOWED_VOICES.includes(wantVoice) ? wantVoice : OPENAI_VOICE;

  // --- OpenAI (preferred) ---
  if (process.env.OPENAI_API_KEY) {
    const r = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.OPENAI_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: OPENAI_TTS_MODEL,
        voice: voiceId,
        input: line,
        instructions: DELIVERY,
        speed: rate,
        response_format: "mp3",
      }),
    });
    if (r.ok) {
      const buf = Buffer.from(await r.arrayBuffer());
      res.setHeader("content-type", "audio/mpeg");
      res.setHeader("x-tts-provider", "openai");   // so a silent fallback is visible
      return res.status(200).send(buf);
    }
    // Don't die here: if OpenAI is rate-limited or the key is bad, try ElevenLabs
    // and ultimately let the browser voice cover it.
    const detail = await r.text().catch(() => "");
    console.error("OpenAI TTS " + r.status + ": " + detail.slice(0, 300));
    if (!process.env.ELEVENLABS_API_KEY) return res.status(502).json({ error: "OpenAI TTS " + r.status });
  }

  // --- ElevenLabs (fallback) ---
  if (!process.env.ELEVENLABS_API_KEY) return res.status(404).json({ error: "TTS not configured" });
  const voice = process.env.ELEVENLABS_VOICE_ID || "pNInz6obpgDQGcFmaJgB";
  const r = await fetch("https://api.elevenlabs.io/v1/text-to-speech/" + voice, {
    method: "POST",
    headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY, "content-type": "application/json" },
    body: JSON.stringify({
      text: line,
      model_id: "eleven_turbo_v2_5",
      voice_settings: { stability: 0.5, similarity_boost: 0.75 },
    }),
  });
  if (!r.ok) return res.status(502).json({ error: "ElevenLabs " + r.status });
  const buf = Buffer.from(await r.arrayBuffer());
  res.setHeader("content-type", "audio/mpeg");
  return res.status(200).send(buf);
}
