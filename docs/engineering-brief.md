# Rhythm & Rescue — Engineering Brief

For the dev team. Owner: CPO · Status: Draft v1
Reads with: [Game Design](./rhythm-and-rescue-game-design.md) · [MVP Spec](./rhythm-and-rescue-mvp.md) · [Stem Brief](./stem-brief.md)

> **The one idea to take away:** this game *looks* big (3 realms, 3 modes, a story, an ending),
> but it's built from a **small set of shared systems**. We build that core once; everything
> else is a new *view* on it or new *content* for it. That's how we stay ambitious about the
> vision and disciplined about the build.

---

## 1. North star (one paragraph)

A kid taps falling tiles to *play* Nova's beat (the hook), ECHO *names* its parts (the lesson),
then they *build* their own version on a grid (the creation) — and the gray, static world comes
alive to the music they made. Realm 1 ships first and stands alone. Realms 2 & 3 extend it.

## 2. The spine — shared systems (build these once)

Everything in the game is one of these seven systems, or a view/content on top of them:

1. **Clock / Transport** — *the* single musical timeline: BPM, current step (0–15), bar/beat.
   There is **one clock**. Beat Run's falling tiles, the Builder's playhead, and the Sound
   Check's playback are all just *different visualizations of the same clock.* This is the
   deepest connective insight in the whole project.
2. **Audio Engine** (Web Audio API) — loads stems + one-shots; a **lookahead scheduler** for
   sample-accurate playback; play/stop/tempo. Used by every mode.
3. **Input / Timing** — touch + pointer; hit detection with timing windows (perfect / good /
   miss). Beat Run is built on it; the optional groove challenge in the Builder reuses it.
4. **Beat Data model** — a song = `{ bpm, key, steps, layers[] }`. The **same data** drives
   what Beat Run scrolls, what the Builder edits, and what plays back. One format, three uses.
5. **World State** — a single `musicRestored` value (0→1) drives the gray→alive visuals.
   Beat Run hits and Builder layers both feed this one value. Restoration is *data-driven.*
6. **ECHO** — a **scripted line player** driven by content/data, not code. New realms = new
   lines, not new systems.
7. **Asset pipeline** — Nova + ECHO rigs and realm backgrounds, each in **gray** and **alive**
   states. Built once per realm; the rig is reused.

## 3. How the parts connect (the reuse matrix)

This is the slide to show the team. **New engine code lives almost entirely in Phases 0–2.**
Realms 2, 3, and the Studio are mostly *content + small features* on the same spine.

| Feature | Clock | Audio | Input | BeatData | World | ECHO | Art | New code? |
|---|---|---|---|---|---|---|---|---|
| **Beat Run** (perform) | ✓ | ✓ | **core** | ✓ | ✓ | ✓ | ✓ | tile renderer |
| **Sound Check** (learn) | ✓ | ✓ | ✓ | ✓ | ✓ | **core** | ✓ | small claim UI |
| **Beat Builder** (create) | ✓ | ✓ | ✓ (groove) | **core** | ✓ | ✓ | ✓ | grid editor UI |
| **Realm 1 loop** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | glue/sequencing |
| **Realm 2** | ✓ | ✓ | ✓ | ✓ | ✓ | content | content | note-picker + verse/chorus |
| **Realm 3 + Finale** | ✓ | ✓ | ✓ | ✓ | ✓ | content | content | dynamics; finale = Beat Run reused |
| **Studio** (sandbox) | ✓ | ✓ | ✓ | ✓ | — | — | — | free-play shell around Builder |

Read it left-to-right: by the time Realm 1 is done, **the engine is done.** Later realms add
data (stems, lines, backgrounds) and at most one small feature each.

## 4. Roadmap — phased, with hard cut-lines

Each phase has a clear "done" and a clear "not yet." Ship Phase 3 (Realm 1) to YouTube; the
rest are updates.

- **Phase 0 — Core spine.** Clock + Audio Engine + Input + Beat Data + World-State hook, against
  one test beat. *Done when:* a hardcoded loop plays in time and a tap registers perfect/good/miss.
  *(No game yet — but everything depends on this. Don't skip it to "get to the fun.")*
- **Phase 1 — Beat Run (first playable / the hook).** *Done when:* a kid can tap falling tiles to
  play Nova's beat, misses are forgiving, the world lights up. **This is the YouTube demo and
  the first playtest.**
- **Phase 2 — Realm 1 full loop (the MVP education slice).** Sound Check + Beat Builder grid +
  3-rescue progression + ECHO lines + gray→alive. *Done when:* a player completes Play → Learn →
  Create and builds a 4-layer beat.
- **Phase 3 — Polish & submit.** Accessibility pass, kids-safety/COPPA checklist, Playables
  packaging, device QA on real phones. *Done when:* it passes submission requirements.
- **Phase 4 — Realm 2.** New song + note-picker + verse/chorus arrange. Mostly content + one feature.
- **Phase 5 — Realm 3 + Finale + Studio.** New song + dynamics; finale reuses Beat Run; Studio
  wraps the Builder. Mostly content.

## 5. Scope guardrails — what we are NOT building (yet)

Say these out loud in kickoff so nobody gilds the MVP:

- ❌ **Live AI** — ECHO is scripted. (Also the kids-safety answer.)
- ❌ **Accounts / logins / cloud saves** — local/session only, no PII.
- ❌ **More than one song in the MVP** — one signature beat carries Realm 1.
- ❌ **Hard-fail / score-gates** — no "Game Over"; scoring is opt-in sparkle.
- ❌ **Multiplayer, user uploads, sharing, ads, chat.**
- ❌ **Native app / game engine** — it's HTML5 + Canvas + Web Audio, sized for Playables.
- ❌ **Realms 2 & 3 before Realm 1 ships.** Build the spine so they *drop in cheaply* — but
  don't build them yet.

## 6. Ownership (who holds what)

- **CPO (you):** the vision, the cut-lines, the "one thing they learn," YouTube relationship, sign-off.
- **Game/creative dev:** the spine (§2) + Beat Run + Builder.
- **Music producer:** stems + one-shots per the [Stem Brief](./stem-brief.md).
- **2D artist:** Nova/ECHO rigs + realm gray/alive states.
- **Curriculum advisor:** validates the layering + timing learning claims for 10+.
- **QA:** device testing + kids-safety checklist.

## 7. Top risks (and the mitigation already in the design)

- **Scope creep across 3 modes** → mitigated by the shared spine + phase cut-lines. *Protect
  the spine, Beat Run, and the Builder first.*
- **Audio payload vs. instant-load** → budget stems carefully; this is the main size risk for Playables.
- **The lesson-after-hook hand-off** (do kids stay for the Sound Check?) → keep it <45s, skippable,
  measure post-launch (see MVP §4.2).
- **IP** → genre mechanic only (not Magic Tiles' assets); original Nova IP; quick legal check.

## 8. How to present this to the team (CPO talking points)

1. **Lead with the spine, not the realms.** "We're building one clock, one audio engine, one
   beat. Everything else is a view on it." This is what makes the vision credible.
2. **Show the reuse matrix (§3).** It proves Realms 2 & 3 are cheap — ambition without bloat.
3. **Commit to the cut-line:** "Realm 1 ships alone. It has to be great by itself." That single
   sentence prevents both over-building and under-delivering.
4. **Name what we're *not* doing (§5)** — discipline reads as wisdom, and it frees the team to
   go deep on the few things that matter.
5. **First milestone is fun, not infrastructure-forever:** Phase 0 is short, Phase 1 (Beat Run)
   is something everyone can *play* — momentum and proof early.
