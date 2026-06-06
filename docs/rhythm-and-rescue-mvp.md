# Rhythm & Rescue — MVP Spec

**Realm 1: Rhythm Ruins** · YouTube Playables · Black Girls Code
Owner: CPO · Status: Draft v1 · Target platform: YouTube Playables (web/HTML5)

---

## 1. The one-liner

> Nova arrives in the Rhythm Ruins, where the Wizard of Static has frozen all music.
> The player **stacks instruments onto a beat** to bring the song — and the world — back to life.

The MVP is a **narrative-wrapped beat builder**: a simplified step sequencer (think
*Chrome Music Lab: Song Maker* meets a rescue story) sized to load instantly inside
YouTube Playables. Completing a groove "rescues" the realm.

## 2. Who it's for

- **Primary player:** ages **7–10** (early-elementary).
- **Design consequences:** near-zero reading, big tap targets, color over text, instant
  audio reward, **no hard fail state**, a single thumb/finger can do everything.
- BGC audience reach: works on a phone in a browser with no install and no account.

## 3. The one thing they learn

A child finishes the MVP understanding, by *doing* it:

1. **Layering** — a song is built from stacked parts: drums → bass → melody → vocals.
2. **Rhythm & timing** — sounds land *on the beat*; where you place a hit changes the groove.

Everything in the loop is anchored to those two ideas. We teach them through play, not
notation — no sheet music, no vocabulary gates.

## 4. Core loop (60–90 seconds, one screen)

```
ARRIVE → the realm is gray/static, music is "frozen"
   │
TAP   → tap instrument tiles onto a beat grid (4 rows × 8 steps)
   │     each layer you add restores color + motion to part of the scene
GROOVE→ a playhead loops the grid; your pattern plays back instantly
   │
ECHO  → scripted companion nudges: "try adding the drums" / lifeline hint if stuck
   │
RESCUE→ when the song has all its layers locked to the beat, the realm "comes alive":
         a short celebratory playback — Nova dances, the world animates to YOUR beat
   │
KEEP  → free-play / remix the same groove, or move to the next rescue
```

The reward is **the world reacting to the music the child made**. Cause → effect must be
visible on every single tap.

## 5. The mechanic, concretely

A **step sequencer**, simplified for small hands:

- **Grid:** 4 instrument rows × 8 steps (one bar, eighth notes). Color-coded rows.
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
  step — i.e., the child has used all the layers, not when they hit a "correct" pattern.
- **Optional timing mini-beat:** a gentle "tap on the beat" prompt to *lock in* a layer,
  reinforcing rhythm — kept optional so it never blocks progress for a 7-year-old.

## 6. ECHO (scripted, not live AI)

- ECHO is a **scripted character** — a small script of pre-written, branching lines. **No
  live model talks to a child.** This is a feature, not a limitation: it's the safest answer
  to YouTube/COPPA kids-safety review, and it lets us *teach about AI from inside the story*.
- Roles: welcomes Nova, names each layer as it's added, offers a **lifeline hint** after N
  seconds of inactivity, and celebrates the rescue.
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
| 3 — The Hook    | melody + vocals complete it   | Melody + Vocals/FX |

After Rescue 3: free-play remix mode with all layers. Realms 2 & 3 ship as updates (out of
MVP scope).

## 9. Music content spec

- **One key, one tempo** for the MVP (e.g. C-minor pentatonic, ~90 BPM) so every
  combination sounds good. Pentatonic = "no wrong notes," ideal for ages 7–10.
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
- **M2 — Rescue loop:** layer-restores-world feedback + 3-rescue progression + ECHO scripted lines.
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
  proven for young kids); fold side-scrolling in as a later realm, not MVP.
- **Audio payload vs. instant-load** — budget stems carefully; this is the main size risk.
- **"Rescue" trigger** — completion-based (used all layers) vs. timing-accuracy-based.
  *Recommendation: completion-based for ages 7–10 to protect the no-fail feel.*
- **Open:** final key/tempo, exact stem set, how much Nova animation M3 can afford.

## 16. Definition of done (MVP)

- A child 7–10 can, with no reading and no help, tap to build a 4-layer beat that plays
  back in time, watch the realm come alive, and finish all three rescues.
- Loads instantly, runs offline, collects nothing, no live AI.
- Passes the kids-safety checklist and the Playables submission requirements.
