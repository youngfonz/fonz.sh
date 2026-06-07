# Rhythm & Rescue — MVP Spec

**Realm 1: Rhythm Ruins** · YouTube Playables · Black Girls Code
Owner: CPO · Status: Draft v4 · Target platform: YouTube Playables (web/HTML5)
Part of: [Full Game Design](./rhythm-and-rescue-game-design.md) · Music: [Stem Brief](./stem-brief.md)

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
unlock each one* (see §4.2) — plus a **taste of song structure** later (verse → chorus).
Taught through play, never as a quiz and never a hard gate to progress.

## 4. Experience arc: Play → Learn → Create

The MVP opens with a **fun activity, not a lesson** — a fast, kinetic rhythm game in the
spirit of *Magic Tiles 3* (the falling-tiles "play the song by tapping in time" game). You
feel the beat first; *then* we name its parts; *then* you build your own. Each act earns the
next, and all three use Nova's **one signature beat** so it plays as a single experience.

```
ACT 1 · PLAY  → "Beat Run": tiles fall in lanes; tap them in time to PLAY Nova's beat and
   (the hook)    blast back the static. Instant, fun, teaches rhythm by feel.        (§4.1)
   │
ACT 2 · LEARN → "Sound Check": ECHO breaks that same beat into parts and names them;
   (vocab)       learning each word UNLOCKS that instrument into Nova's kit.         (§4.2)
   │
ACT 3 · CREATE→ Beat-builder: stack the parts you just learned onto a 16-step grid to make
   (the core)    YOUR version of the beat. The world comes alive to what you made.    (§5)
   │
RESCUE        → realm "comes alive" — Nova dances, world animates to your beat. Next rescue.
```

Why this order: **perform → understand → create** is how kids actually fall for music
(Guitar Hero → "wait, what's a bassline?" → making one). The hook buys the attention to
teach; the lesson gives the creation meaning. The reward throughout is **the world reacting
to the music the player made** — cause → effect visible on every tap.

## 4.1 Act 1 — Beat Run (the fun hook)

A falling-tiles rhythm game in the genre your players already love (*Magic Tiles 3*): notes
fall down a few lanes and you tap each one as it crosses the hit-line, in time with the music.
We take the **genre mechanic** ("piano tiles"), **not** the app's songs or art — all music and
visuals are original Nova IP.

- **The beat:** Nova's signature groove. Each correct, in-time tap plays a note of it and
  pushes the Wizard of Static's gray back; the realm lights up in rhythm with your hits.
- **Forgiving, not punishing** (the key difference from Magic Tiles for this age + education):
  a miss doesn't end the run — the world just dims for a beat and the static creeps back a
  little. **No "Game Over."** An optional Hard mode can come later; not MVP.
- **Short:** ~60–90s, one song segment. It's the hook, not the whole game.
- **It feeds the lesson:** the beat you just performed is the *same* beat ECHO dissects in the
  Sound Check (§4.2) and that you rebuild in Create (§5). Continuity *is* the teaching.
- **Real skill, build once:** tap accuracy (perfect / good / miss) runs on the same timing
  engine reused by the optional groove challenge in §5.
- **Touch-first**, 2–4 lanes (4 = more fun, still thumb-friendly on a phone).
- **Why it's first:** it answers "is this fun?" in the first 5 seconds — the bar a YouTube
  Playable lives or dies by — before we ask anyone to learn anything.

## 4.2 Act 2 — the Sound Check (vocabulary)

After the Beat Run hook, ECHO breaks that beat into its parts — this is the vocabulary moment.
The rule that keeps it from feeling like a quiz: **learning the word is how you unlock the
instrument.** Vocab is the key, the beat-builder is the door.

**Flow (~30–45s, ECHO-led):**

1. Callback to the hook. ECHO: *"Nice — you just played that beat! Now let's hear what it's
   made of. Listen…"*
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

> **CPO note / open call:** we now lead with the *fun* (Beat Run) and teach second — the
> right order for retention. The remaining risk is the hand-off: do players stay for the
> Sound Check after the hook, or do they just want to keep playing? The unlock-the-instrument
> framing + <45s + skippable rules protect it. A/B worth running post-launch: full Sound
> Check vs. a trimmed 2-term version, and whether to let players replay Beat Run first.

## 5. Act 3 — Create: the beat-builder mechanic

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
- Roles: welcomes Nova, cheers the Beat Run, **runs the Sound Check** (§4.2) — playing each part, naming
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
- **M1 — The hook:** shared Web Audio timing engine + **Beat Run** falling-tiles game (§4.1). *External-ready: it's genuinely fun in 5 seconds — this is the YouTube demo.*
- **M2 — Create + onboarding:** sequencer grid + playhead (§5) + the Sound Check vocabulary step (§4.2) + layer-restores-world feedback + 3-rescue progression + ECHO scripted lines.
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
- **Scope creep — three modes:** the arc now has Beat Run + Sound Check + builder. That's
  ambitious for an MVP. **Mitigations:** Beat Run and the §5 groove challenge share one timing
  engine (build once); the Sound Check is the smallest piece and can be trimmed to 2 terms or
  merged into Beat Run's intro if the timeline tightens. **Protect Act 1 (the demo magnet)
  and Act 3 (the education core) first.**
- **IP / genre, not clone:** *Magic Tiles 3* is the reference for the *genre* (falling-tile
  rhythm), which is not protectable as such — but do **not** reuse its songs, fonts, UI, or
  art. Everything is original Nova IP. Worth a quick legal sanity check before launch.
- **Audio payload vs. instant-load** — budget stems carefully; this is the main size risk.
- **"Rescue" trigger** — *Recommendation:* completion-based to progress (used all layers,
  protects the no-fail feel) **with the optional timing score layered on top** for players
  who want the challenge. Best of both for 10+.
- **Open:** final key + tempo range, exact stem set, how deep the verse/chorus structure
  goes, how much Nova animation M3 can afford.

## 16. Definition of done (MVP)

- A player 10+ can play the **Beat Run** hook, learn the four part names in the **Sound
  Check**, then **build** a 4-layer two-bar beat that plays back in time (optionally chasing
  the groove timing score), watch the realm come alive, and finish all three rescues
  including the verse → chorus arrangement.
- Loads instantly, runs offline, collects nothing, no live AI.
- Passes the kids-safety checklist and the Playables submission requirements.
