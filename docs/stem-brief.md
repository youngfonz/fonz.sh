# Rhythm & Rescue — Stem Brief (for the music producer)

**What we're building:** a music-education game where kids *perform*, *learn*, and then
*build* Nova's beat. To do that we need the beat delivered as **separated parts (stems) AND
short individual samples (one-shots)** — not just a finished stereo mix.

Hand this doc to whoever is producing the beat. Questions → CPO.

---

## TL;DR — what we need

1. **The full mix** (reference) — the finished beat, stereo.
2. **4 stems** — the beat split into **Drums, Bass, Lead (trumpet/melody), Vocals** — each a
   clean loop, same length, same start point, so any combination layers in perfect sync.
3. **One-shots** — short individual hits/notes per instrument, so the game's grid can trigger
   them one tap at a time (this is the part most "just send the stems" deliveries miss).
4. **A spec sheet** — tempo (BPM), key/scale, bar count, and confirmation it's **original and
   fully owned/cleared**.

## Why two kinds of audio (please read)

The game uses the same beat three ways, and they need different files:

- **Beat Run** (tap falling tiles) & the **win playback** → need the **stems / full loop** that
  play as continuous audio.
- **Beat Builder** (a 16-step grid where kids place sounds one cell at a time) → needs **short
  one-shots** that can be triggered individually and repeatedly, in time. A full loop can't do
  this; we need the raw hits/notes.

If we only get a stereo mix, we can't build the core creative mode. The stems + one-shots are
the actual product requirement.

## Global specs (everything must match these)

- **Tempo:** ONE fixed BPM for everything. Tell us what it is. *(~85–95 BPM is a great pocket
  for this age — confirm with the actual beat.)*
- **Key / scale:** ONE key. Strong preference for a **minor pentatonic** (or major pentatonic)
  tonality so kids "can't hit a wrong note." Tell us the key.
- **Bar length:** stems loop cleanly over **2 bars** (the grid is 16 steps = 2 bars of 8ths).
- **Format:** **WAV, 24-bit, 44.1 kHz** masters. (We'll compress to web format for the game;
  give us the high-quality source.)
- **Aligned:** every stem starts at bar 1, beat 1, identical length, no leading silence — so
  layering them lines up sample-accurately.
- **Levels:** mixed so the 4 stems sound balanced when played together; please **avoid
  master-bus / 2-buss compression or limiting that prevents clean layering**. If you use bus
  FX, send a dry version too.
- **Naming:** clear and consistent, e.g. `nova_realm1_drums_loop.wav`, `nova_realm1_bass_C.wav`.

## Deliverable 1 — Stems (the loops)

The beat split into these **4 role-stems**, each a clean 2-bar loop at the fixed BPM:

| Stem | Role | Notes |
|------|------|-------|
| `drums` | the pulse | kick/snare/hats together is fine as one stem |
| `bass` | the low groove | locked to the kick |
| `lead` | the hook / melody (trumpet, or keys/synth — your call) | the memorable line |
| `vocals` | Nova's topline | the star; include any ad-libs |

Plus the **full mix** as a reference. Optional but welcome: a "minus-vocals" instrumental.

## Deliverable 2 — One-shots (for the build grid)

Short individual samples, same key/tempo, trimmed tight at the start with natural tails:

- **Drums:** separate **kick**, **snare**, **hi-hat** (closed), optional **clap/perc** — single hits.
- **Bass:** a small set of notes in the key — at minimum the **root**, ideally **3–5 pentatonic
  notes** so kids can vary the line.
- **Lead (trumpet/melody):** **5 pentatonic notes** (one octave) as single notes/stabs, so the
  grid can build little melodies that always sound good.
- **Vocals:** **2–4 short phrases / ad-libs** (e.g. "yeah", a short "oh-oh" hook, a one-word
  tag) — short, loopable, in key.

Keep one-shots short (≈0.2–1.5s), normalized, mono is fine for drums/bass, stereo OK for lead/vocals.

## Deliverable 3 — Spec sheet (one short text/PDF)

- BPM, key + scale, bar count/length.
- Track list + which file is which.
- **Ownership confirmation:** all audio is **original and fully owned/cleared for commercial
  use**, including any vocal performances — Nova is owned IP reused across BGC media, so we
  cannot use uncleared samples or third-party loops.

## Nice-to-haves (not required for MVP)

- Stems for **Realm 2 & 3** songs later (same spec) as the game expands.
- A few **alternate one-shots** (extra perc, an FX riser/"sparkle" for the rescue moment).
- A short **"static/broken" version** of the mix (filtered/degraded) for the pre-rescue state.

## How this maps to the game (context for the producer)

- Drums → taught/added first; Bass second; Lead third; Vocals last (the climax). See the
  [game design doc](./rhythm-and-rescue-game-design.md) §4.
- Everything is quantized and pitch-safe so the game can be **no-fail** — that constraint is
  why we need the parts separated and in one key.
