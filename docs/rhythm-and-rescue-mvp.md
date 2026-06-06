# Rhythm & Rescue — MVP Spec

**Realm 1: Rhythm Ruins** · YouTube Playables · Black Girls Code
Owner: CPO · Status: Draft v3 · Target platform: YouTube Playables (web/HTML5)

---

## 1. The one-liner

> Nova arrives in the Rhythm Ruins, where the Wizard of Static has frozen all music.
> The player **stacks instruments onto a beat** to bring the song — and the world — back to life.

The MVP is a **narrative-wrapped beat builder**: a simplified step sequencer (think
*Chrome Music Lab: Song Maker* meets a rescue story) sized to load instantly inside
YouTube Playables. Completing a groove "rescues" the realm.

## 2. Who it's for

- **Primary player:** ages **10+** (upper-elementary / middle school, ~10–13 sweet spot).
- **Design consequences:** short reading is fine, so we can name what's happening —
  *layer*, *beat*, *tempo*, *verse/chorus* — and build real vocabulary. Still touch-first
  and instant, but we can afford more depth: more steps, a real (optional) timing score,
  and a taste of song structure. **No hard fail** still holds — challenge is opt-in, never a wall.
- BGC audience reach: works on a phone in a browser with no install and no account.

## 3. The one thing they learn

A player finishes the MVP understanding, by *doing* it:

1. **Layering** — a song is built from stacked parts: drums → bass → melody → vocals.
2. **Rhythm & timing** — sounds land *on the beat*; where you place a hit changes the groove,
   and at 10+ we let timing *accuracy* count toward an optional "groove" score (real skill).

Anchored on those two ideas. At 10+ we add a **vocabulary task up front** — a short "Sound
Check" that teaches the names of the parts (drums, bass, melody, vocals) *by having you
unlock each one* (see §4.1) — plus a **taste of song structure** later (verse → chorus).
Taught through play, never as a quiz and never a hard gate to progress.

## 4. Core loop (60–90 seconds, one screen)

```
ARRIVE → the realm is gray/static, music is "frozen"
   │
SOUND  → ECHO runs a 30–45s "Sound Check": hear a part, learn its name, tap to claim it.
CHECK    learning the word UNLOCKS that instrument into Nova's kit  (vocabulary first → §4.1)
   │
TAP   → tap the now-unlocked instruments onto a beat grid (4 rows × 16 steps)
   │     each layer you add restores color + motion to part of the scene
GROOVE→ a playhead loops the grid; your pattern plays back instantly
   │
ECHO  → scripted companion nudges: "try adding the bass" / lifeline hint if stuck
   │
RESCUE→ when the song has all its layers locked to the beat, the realm "comes alive":
         a short celebratory playback — Nova dances, the world animates to YOUR beat
   │
KEEP  → free-play / remix the same groove, or move to the next rescue
```

The reward is **the world reacting to the music the player made**. Cause → effect must be
visible on every single tap.

## 4.1 Opening — the Sound Check (vocabulary first)

The MVP opens with a short vocabulary moment, **before** free building. The rule that keeps
it from feeling like a quiz: **learning the word is how you unlock the instrument.** Vocab is
the key, the beat-builder is the door.

**Flow (~30–45s, ECHO-led):**

1. The realm is silent/static. ECHO: *"To rebuild the song we need its parts. Listen…"*
2. ECHO plays one part in isolation (e.g. just the kick + snare) and the word appears with
   an icon: **DRUMS — the pulse that keeps time.** Player taps the glowing tile to *claim* it;
   it lights up in Nova's kit and a piece of the world flickers back to color.
3. Repeat for **BASS** (the low groove), **MELODY** (the hook/tune), **VOCALS** (Nova's voice).
4. Tiny **listen-and-match check** (not graded, just confirming): ECHO plays one part, player
   taps the matching word from the four they just learned. Right = sparkle; "not quite" =
   ECHO replays it and points — *no fail, no score, you can't get stuck.*
5. Hand-off: *"You've got the parts — now build the beat!"* → straight into the grid (§5),
   with the four words now living as the row labels (constant reinforcement).

**Terms taught in the MVP (kept tight — 4 core + 2 ambient):**

| Term | Taught as | When |
|------|-----------|------|
| **Drums / Bass / Melody / Vocals** | the four instrument layers | Sound Check (unlocks each) |
| **Beat** | the pulse the playhead follows | named on first grid tap |
| **Tempo** | how fast the beat goes | named when the tempo slider is touched |

*(Verse / Chorus are introduced later, in Rescue 3 — see §8. We resist front-loading all
vocabulary at once.)*

**Design guardrails (non-negotiable for Playables retention):**

- **Skippable after first completion** — returning players tap "Skip to build." Never make a
  kid sit through the lesson twice.
- **Under ~45 seconds** to first free sound-making. If it grows past that, cut terms, don't
  cut the build.
- **Hands-on, never a worksheet** — every term is *heard and tapped*, never just read.
- **No failure, no timer, no score** in the Sound Check. The optional skill/score lives later
  in the groove challenge (§5), not here.
- **Accessibility:** every term = word + icon + sound, so it's not reading-only or audio-only.

> **CPO note / open call:** placing a learning beat *before* play is the right instinct for
> the "real education" claim, but it's also the highest-bounce spot in any kids' game. The
> unlock-the-instrument framing + the <45s + skippable rules are what protect retention.
> A/B worth running post-launch: Sound Check first vs. one-tap-of-sound first, *then* the
> Sound Check. Flagging so we measure it rather than guess.

## 5. The mechanic, concretely

A **step sequencer**, simplified for small hands:

- **Grid:** 4 instrument rows × 16 steps (two bars, eighth notes) — 10+ can handle the
  longer pattern, and it's enough room to feel like a real groove. Color-coded rows.
  - Row 1 — **Drums** (kick/snare/hat) — the pulse
  - Row 2 — **Bass** — the groove
  - Row 3 — **Melody** — the hook
  - Row 4 — **Vocals/FX** — Nova's voice/ad-libs
- **Interaction:** tap a cell to toggle a sound on/off at that beat. That single action
  teaches **both** target skills at once — *which* row = layering, *which* column = timing.
- **Playhead:** a moving highlight sweeps left→right on loop so kids *see* time and *hear*
  their pattern immediately. Always-on playback, never a separate "play" step.
- **No wrong answers, soft goals:** any pattern sounds musical (we constrain pitch to one
  key/scale and quantize to the grid). "Rescue" triggers when each layer has ≥1 active
  step — i.e., the player has used all the layers, not when they hit a "correct" pattern.
- **Optional "groove" timing challenge:** a *play live on the beat* mode where tapping in
  time with the playhead scores accuracy (perfect/good/early-late) and earns extra sparkle
  on the rescue. This is the **real-skill** hook for 10+ — fully opt-in, never blocks progress.
- **Optional tempo control:** a simple slider lets players speed up / slow down, surfacing
  the word *tempo* and letting them feel how BPM changes the groove.

## 6. ECHO (scripted, not live AI)

- ECHO is a **scripted character** — a small script of pre-written, branching lines. **No
  live model talks to a child.** This is a feature, not a limitation: it's the safest answer
  to YouTube/COPPA kids-safety review, and it lets us *teach about AI from inside the story*.
- Roles: welcomes Nova, **runs the opening Sound Check** (§4.1) — playing each part, naming
  it, prompting the claim tap — names each layer as it's added, offers a **lifeline hint**
  after N seconds of inactivity, and celebrates the rescue.
- Voice/personality lines are content, version-controlled like art — easy to expand later.

## 7. Narrative wrapper (keep it thin for MVP)

- **Nova** (owned IP, young Black girl producer) is the on-screen avatar who reacts to the
  beat. Reused across BGC media later, so model/rig her once, cleanly.
- **Wizard of Static** = the obstacle, shown as the gray/static over the world that recedes
  as music returns. No combat, no villain dialogue needed for MVP.
- Story is delivered in ~3 short beats (arrive / build / rescue), no cutscenes required.

## 8. Session & progression

MVP ships **one realm, three short "rescues"** (≈3–6 min total), each introducing one idea:

| Rescue | Teaches | New layer unlocked |
|--------|---------|--------------------|
| 1 — The Pulse   | rhythm/timing, the drum pulse | Drums |
| 2 — The Groove  | layering bass under drums     | Bass |
| 3 — The Hook    | melody + vocals, then arrange a **verse → chorus** | Melody + Vocals/FX |

Rescue 3 introduces the **taste of song structure**: lock the full groove as a *verse*, then
add a *chorus* variation — two named sections, the lightest possible intro to arrangement.
After Rescue 3: free-play remix mode (all layers + the optional groove challenge + tempo
slider). Realms 2 & 3 ship as updates (out of MVP scope).

## 9. Music content spec

- **One key, default tempo** (e.g. C-minor pentatonic, ~90 BPM) so every combination
  sounds good. Pentatonic = "no wrong notes." Optional **tempo slider** (~70–120 BPM) for
  the 10+ depth without breaking the safety net.
- **Two-bar loop** (16 steps) — enough to feel like a real groove for this age.
- **Stems:** short, looping one-shots per instrument, normalized, royalty-cleared/original.
- Keep total audio payload small (see tech constraints). Compressed, sprite-able.

## 10. Technical approach (Playables-ready)

- **Stack:** plain **HTML5 + Canvas + Web Audio API**, no heavy engine. Web Audio gives us
  sample-accurate scheduling for the playhead — critical for a rhythm game feeling tight.
- **Self-contained:** single bundle, loads instantly, runs offline after load, **no network
  calls during play**, **no account, no PII, no analytics that identify a child.**
- **Audio scheduling:** lookahead scheduler pattern (schedule notes slightly ahead of the
  playhead) so timing stays solid even if the main thread hitches.
- **Footprint target:** keep the playable lean (audio is the heaviest part — budget it).
- **Input:** touch-first, single pointer; also works with mouse/keyboard for desktop.
- **Repo:** this site (`fonz.sh`) already serves static HTML — the prototype slots in as a
  standalone page/dir and can later be exported to the Playables package format.

## 11. Kids-safety & accessibility (gating requirements)

- **No live AI, no chat, no UGC, no external links, no ads, no data collection.** (ECHO is scripted.)
- Color is never the *only* signal (pair with icon/shape) for color-blind players.
- Captions/labels for ECHO lines; audio is enhancing, never required to succeed.
- Designed to pass YouTube Playables + COPPA-style review on the first submission.

## 12. Success metrics

**Engagement**
- % who complete Rescue 1 (onboarding clarity)
- % who reach the free-play remix (full-loop completion)
- Median session length; replays per session

**Learning (proxy, no PII)**
- % who use all four layers at least once (layering understood)
- % who place hits on more than one beat position (timing explored)
- Hint (lifeline) usage rate — high = onboarding too hard

## 13. Build plan / milestones

> Rough sizing for a small team; CPO to align with actual capacity.

- **M0 — Spec & assets lock (this doc + audio/art brief).** Stems, palette, Nova/ECHO art.
- **M1 — Playable core:** sequencer grid + Web Audio playback + playhead. *Internal: it's fun to noodle.*
- **M2 — Rescue loop + onboarding:** the Sound Check vocabulary opener (§4.1) + layer-restores-world feedback + 3-rescue progression + ECHO scripted lines.
- **M3 — Polish & wrap:** Nova reaction animation, celebration moment, accessibility pass.
- **M4 — Submission build:** package to Playables format, safety/COPPA checklist, QA on phones.

## 14. Team & roles (what to delegate)

- **CPO (you):** scope guardrails, the "one thing they learn," YouTube relationship, sign-off.
- **Game/creative dev:** Canvas + Web Audio sequencer and loop.
- **Music/sound designer:** stems in one key/tempo, ECHO VO lines.
- **2D artist:** Nova, ECHO, the gray→alive realm states.
- **Curriculum/learning advisor:** validates the layering + timing learning claims for ages 7–10.
- **QA:** device testing + the kids-safety checklist.

## 15. Risks & open decisions

- **Genre fusion risk (from the original pitch):** "side-scroller × rhythm" has two control
  schemes that can fight. **MVP decision:** lead with the *beat-builder* loop (stationary,
  proven, low-friction); fold side-scrolling in as a later realm, not MVP.
- **Audio payload vs. instant-load** — budget stems carefully; this is the main size risk.
- **"Rescue" trigger** — *Recommendation:* completion-based to progress (used all layers,
  protects the no-fail feel) **with the optional timing score layered on top** for players
  who want the challenge. Best of both for 10+.
- **Open:** final key + tempo range, exact stem set, how deep the verse/chorus structure
  goes, how much Nova animation M3 can afford.

## 16. Definition of done (MVP)

- A player 10+ can, with minimal help, learn the four part names in the Sound Check, tap to
  build a 4-layer two-bar beat that plays back in time, optionally chase the groove timing
  score, watch the realm come alive, and finish all three rescues including the verse →
  chorus arrangement.
- Loads instantly, runs offline, collects nothing, no live AI.
- Passes the kids-safety checklist and the Playables submission requirements.
