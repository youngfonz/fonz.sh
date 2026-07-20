// Speech to text via OpenAI, for browsers where the Web Speech API can't be
// used. iOS Safari nominally has webkitSpeechRecognition, but it won't share
// the mic with the waveform's audio capture, ignores continuous mode, and only
// starts from a direct tap - which rules out hands-free. Recording and
// transcribing works everywhere and is more accurate anyway.
const MODEL = process.env.OPENAI_STT_MODEL || "gpt-4o-mini-transcribe";

// Vercel caps request bodies around 4.5MB and base64 inflates by a third, so
// this is the honest ceiling. Recording stops at 60s, a couple hundred KB.
const MAX_BYTES = 3 * 1024 * 1024;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  const { passcode, audio, mime } = req.body || {};
  if (passcode !== process.env.TEAM_PASSCODE) return res.status(401).json({ error: "Wrong passcode." });
  if (!process.env.OPENAI_API_KEY) return res.status(503).json({ error: "Transcription not configured." });
  if (typeof audio !== "string" || !audio) return res.status(400).json({ error: "No audio." });

  let bytes;
  try {
    bytes = Buffer.from(audio, "base64");
  } catch (_) {
    return res.status(400).json({ error: "Bad audio." });
  }
  if (!bytes.length) return res.status(400).json({ error: "Empty audio." });
  if (bytes.length > MAX_BYTES) return res.status(413).json({ error: "That clip is too long." });

  const type = typeof mime === "string" && mime.startsWith("audio/") ? mime : "audio/webm";
  const ext = type.includes("mp4") ? "mp4" : type.includes("mpeg") ? "mp3" : type.includes("wav") ? "wav" : "webm";

  try {
    const form = new FormData();
    form.append("file", new Blob([bytes], { type }), "clip." + ext);
    form.append("model", MODEL);
    // Nudges the transcript toward the vocabulary founders actually use.
    form.append("prompt", "A founder describing their business idea, customers, pricing and revenue plans.");

    const r = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: { Authorization: "Bearer " + process.env.OPENAI_API_KEY },
      body: form,
    });
    if (!r.ok) {
      const detail = await r.text().catch(() => "");
      console.error("STT " + r.status + ": " + detail.slice(0, 300));
      return res.status(502).json({ error: "Could not transcribe that." });
    }
    const d = await r.json();
    return res.status(200).json({ text: (d.text || "").trim() });
  } catch (_) {
    return res.status(502).json({ error: "Could not transcribe that." });
  }
}
