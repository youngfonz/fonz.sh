# Rhythm & Rescue — Full Game Design

YouTube Playables · Black Girls Code · Owned IP: **Nova × ECHO**
Owner: CPO · Status: Draft v1 · Companion to the [Realm 1 MVP spec](./rhythm-and-rescue-mvp.md)

> This doc plans the **whole game**: the world, why you play, how you play, the three realms,
> how you win, and the ending. The MVP spec covers Realm 1 (the first shippable slice) in
> mechanical detail; this is the arc that Realm 1 is the front door to.

---

## 1. Premise & world

The **Wizard of Static** erased all music — the world has gone gray, silent, and frozen.
**Nova**, a young Black girl producer, travels through the broken realms and **rebuilds songs
to bring music — and color, motion, and life — back**. **ECHO**, her scripted companion, is a
being made of leftover sound who guides her with hints and names the parts of music as she
goes. You play as Nova. Every beat you make pushes the static back.

- **Nova** — owned IP, the hero/avatar, reused across BGC media for years. A kid producer the
  player wants to *be*.
- **ECHO** — scripted (not live AI). Helps, never does it for you. Quietly teaches what AI is:
  a tool that *echoes and assists* while the human *creates*. (More in §9.)
- **Wizard of Static** — the antagonist, shown as gray static smothering the world. Not a
  violent villain; an absence of music that you push back by *making* music.

## 2. Why you play (the motivation stack)

Layered so it hooks fast and keeps pulling:

1. **It's fun in 5 seconds** — the Magic-Tiles-style Beat Run hook (tap-in-rhythm) is
   satisfying before any story or learning lands.
2. **The world reacts to you** — every tap restores color, light, and motion. Visible
   cause → effect is the core dopamine.
3. **You collect & grow** — each realm adds an instrument to Nova's kit; you watch the world
   and your toolset expand.
4. **Mastery** — better timing = higher "groove" scores and a fuller, shinier song.
5. **Creative ownership** — by the end you can build a *whole song*, and the Studio sandbox
   lets you keep making your own.
6. **Story + meaning** — you're literally rescuing music, helping Nova, beating the Wizard.
7. **Aspiration / representation** — "a girl who looks like me makes music and runs the
   show." This is the quiet reason that matters most for BGC.

## 3. How you play (three verbs, one finger)

Everything is touch-first, one pointer, no text entry. Three modes, all built on tapping:

| Mode | What you do | Teaches |
|------|-------------|---------|
| **Beat Run** (perform) | Tap falling tiles in time as the song plays | Rhythm & timing, by feel |
| **Sound Check** (learn) | Tap to claim each instrument as ECHO names it | Vocabulary, the parts of a song |
| **Beat Builder** (create) | Tap cells on a 16-step grid to place sounds, layer by layer | Layering, arrangement, groove |

The arc within every realm is **Play → Learn → Create** (see MVP spec §4). The hook earns
attention, the lesson gives the creation meaning, the creation is the reward.

## 4. The musical spine — how a beat is built (the layering model)

**Every beat in the game is built in the same order, lowest-foundation to topline:**

```
1. DRUMS    →  the pulse. Sets tempo + groove. Everything locks to this.   (foundation)
2. BASS     →  the low groove. Locks to the kick. "Now it has a body."     (groove)
3. LEAD     →  the hook/melody — likely TRUMPET. The line you hum.         (the hook)
4. VOCALS   →  Nova's voice. The topline, the star. Completes the song.    (the payoff)
```

**Why this order** (the answer to "does the beat-making make sense?"):
- Drums first because the drums *are* the beat — bass alone has no rhythmic context for a kid,
  and drums teach the rhythm/timing skill the whole game is built on.
- Bass second so it has a kick to lock to — the moment a player *feels* "the groove."
- Lead/trumpet third — a melody needs a foundation to sit on.
- Vocals last — the topline is the climax; ending on **Nova's own voice** is the emotional and
  thematic payoff (the producer's voice returns = music is back).

**Roles are fixed; the exact instruments flex to the delivered beat.** The four *roles*
(drums / bass / lead / vocals) are locked. Whether the lead is a trumpet, keys, or synth
depends on the actual beat — the design doesn't change, only the art and samples. See the
[stem brief](./stem-brief.md) for what we need from the music producer.

> **No-wrong-notes guarantee:** every melodic part is constrained to one key / pentatonic
> scale and quantized to the grid, so any combination a player makes sounds good. This is what
> lets us be no-fail and still feel like "real" music.

## 5. Structure — three realms + a finale

The game is **three realms**. Realm 1 is the MVP (ships first, stands alone). Realms 2 & 3
ship as updates. Each realm is a **new song with its own vibe**, built with the same 4-layer
model, and each adds **one new musical idea** on top. The finale combines everything.

| Realm | Name | New musical idea | New to the kit | Vibe |
|-------|------|------------------|----------------|------|
| **1** | **Rhythm Ruins** | The foundation: layering + timing (the full Play→Learn→Create loop) | The core 4 layers | Crumbling ruins; the heartbeat of music is gone |
| **2** | **Melody Heights** | **The hook**: pick melody notes + arrange **verse → chorus** | A new lead instrument (e.g. keys) | Soaring sky/mountain city; melodies float |
| **3** | **Static Citadel** | **The voice + dynamics**: the full song, performed live | Nova's full vocal topline | The Wizard's domain; the final stage |

Realms ascend — from underground ruins up to the heights up to the Citadel — so the player
feels they're *climbing toward the finale*.

## 6. Realm-by-realm

### Realm 1 — Rhythm Ruins (the MVP)
- **Goal:** restore the first song and learn how music is built.
- **Beat Run** on Nova's signature groove → **Sound Check** names the 4 parts → **Beat Builder**
  to construct a 4-layer beat (drums → bass → trumpet → vocals) across 3 short rescues.
- **Restores:** the pulse of the world — color and motion return to the ruins.
- Full mechanical detail in the [MVP spec](./rhythm-and-rescue-mvp.md).

### Realm 2 — Melody Heights (update 1)
- **New idea:** melody & arrangement. The player now *chooses* notes for the lead (from the
  safe pentatonic) and arranges two named sections — a **verse** and a **chorus**.
- **New instrument** added to the kit (e.g. keys), so the band grows.
- Beat Run gets a touch harder (faster, more lanes) — the player has leveled up.

### Realm 3 — Static Citadel (update 2) + THE FINALE
- **New idea:** dynamics and performance. Nova's full **vocal topline** leads; the player learns
  that a song *builds and drops*.
- **The finale:** a climactic Beat Run on the stage of the Static Citadel, performing **Nova's
  complete song** (all 4 layers, both sections) against the Wizard. Each clean hit blasts more
  static away until the screen floods with color and the full song plays.

## 7. How you win

**Per realm (the local win):** complete the realm's three steps —
1. Perform the realm's groove in **Beat Run** (no-fail; misses just dim the world),
2. **Unlock** the new instrument(s) in the Sound Check,
3. **Build** the realm's beat (every layer used, locked to the grid).

→ The realm "comes alive," the new layer is permanently added to Nova's kit, and the next
realm unlocks. Optional **groove score** (timing accuracy) earns extra sparkle but is never
required — *you win by creating, not by being perfect.*

**The game (the overall win):** restore all three realms, then in the **finale** perform Nova's
**complete 4-layer song** end to end. Landing the song defeats the Wizard of Static and music
returns to the world. The win condition is **creative mastery** — you went from tapping one
beat to building and performing a whole song.

## 8. The ending

- The static doesn't get "killed" — it **dissolves into silence, then into music.** The Wizard
  is quieted, not destroyed (gentle, age-appropriate, and on-theme: absence → sound).
- Nova's **full song plays** over a world snapping into full color and motion; Nova performs
  center-stage; ECHO stands beside her, not in front.
- **ECHO's closing line** lands the AI thread: *"I only echoed what was already in you. You made
  this."* (See §9.)
- **Unlock: the Studio** — a free-play sandbox with **every stem the player collected**, where
  they can build their own songs with no goals, no fail, no timer. The ending is **empowerment +
  a creative toy to keep**, which is also what drives replay and word-of-mouth.

## 9. ECHO & the "about AI" thread

A core BGC value-add: teach kids a healthy relationship with AI *from inside the story*.
- ECHO is **scripted, not a live model** — the safe answer for YouTube/COPPA kids review, and
  a deliberate design statement.
- ECHO **assists** (hints, names things, encourages) but **never creates for you** — the player
  always makes the music. The lesson, shown not lectured: *AI is a tool that helps; you are the
  creator.* The ending makes it explicit.

## 10. Meta-progression & replay

- **Instrument kit / collection** — instruments unlock across realms; a simple visual "kit" shows
  what you've earned. (No accounts, no PII — progress is local/session-based.)
- **Groove scores & sparkle** — optional mastery layer; replay a realm to do better.
- **The Studio sandbox** — the long-tail replay driver and the strongest "real music education"
  proof point: open-ended creation with all collected sounds.

## 11. Difficulty & accessibility philosophy

- **No-fail spine.** Nothing ever ends in "Game Over." Challenge (timing scores, harder Beat
  Runs, note-picking) is always *opt-in* and additive.
- **One key, quantized, pentatonic** → no wrong notes. Anyone makes something that sounds good.
- **Every signal is multi-channel** — color + icon + sound — so it's never reading-only or
  audio-only. ECHO lines are captioned. Audio enhances; it's never required to succeed.

## 12. Music & stems

The whole game runs on the delivered beat(s). We need a specific deliverable from the producer
— **not just a stereo mixdown.** See the **[Stem Brief](./stem-brief.md)** for exact formats,
tempo/key requirements, the split stems, and the one-shot samples the Beat Builder needs.

## 13. Open decisions for CPO

- **Lead instrument** — trumpet vs keys vs synth for Realm 1 (depends on the delivered beat).
- **Realm 1 song genre/vibe** — sets the tone for the whole franchise. (Hip-hop / boom-bap is a
  strong, on-brand default.)
- **Build order confirmation** — drums → bass → lead → vocals (recommended) vs your original
  bass-first idea. Easy to change; affects Sound Check + Builder sequencing.
- **Realm 2 & 3 names/themes** — Melody Heights / Static Citadel are placeholders.
- **How many songs ship in the MVP** — one signature beat for Realm 1 is enough to launch.
