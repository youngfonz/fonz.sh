# Rhythm & Rescue — Docs

A YouTube Playables music-education game by **Black Girls Code**. You play as **Nova**, a young
Black girl producer, rebuilding songs to push back the **Wizard of Static** and bring music
back to the world. **ECHO** (a scripted companion, not live AI) guides you.

**The loop, in one line:** *Play* a beat (tap falling tiles) → *Learn* its parts (ECHO names
them) → *Create* your own (build it on a grid). The world comes alive to the music you make.

## Start here, in this order

| # | Doc | For | Read it to understand… |
|---|-----|-----|------------------------|
| 0 | [One-Pager](./one-pager.md) | anyone, fast | the whole thing on one page — share this first |
| 1 | [Game Design](./rhythm-and-rescue-game-design.md) | everyone | the whole vision: world, why/how you play, 3 realms, how you win, the ending |
| 2 | [MVP Spec](./rhythm-and-rescue-mvp.md) | product + design | Realm 1 in mechanical detail — the first shippable slice |
| 3 | [Engineering Brief](./engineering-brief.md) | dev team | how the parts connect (shared systems), the phased roadmap, scope cut-lines |
| 4 | [Stem Brief](./stem-brief.md) | music producer | exactly what audio to deliver (stems + one-shots, BPM, key) |

## The shape of it (so the parts connect)

```
            ┌──────────────────────── ONE SHARED SPINE ────────────────────────┐
            │  Clock · Audio Engine · Input/Timing · Beat Data · World State    │
            │  · ECHO (scripted) · Art pipeline                                 │
            └───────────────────────────────────────────────────────────────────┘
                 ▲                    ▲                     ▲
        ┌────────┴───────┐   ┌────────┴────────┐   ┌────────┴────────┐
        │   BEAT RUN     │   │   SOUND CHECK   │   │   BEAT BUILDER  │
        │   (perform)    │   │   (learn)       │   │   (create)      │
        └────────────────┘   └─────────────────┘   └─────────────────┘
                 │                    │                     │
                 └──── Realm 1 (MVP) ─┴──── Realm 2 ────────┴──── Realm 3 + Finale ──→ Studio
                       ships first         content drop          content + finale       sandbox
```

Build the spine once. The three modes are views on it. The realms are mostly content on top.
That's why we can be **ambitious about the vision and disciplined about the build.**

## Build order (current plan)

1. **Core spine** → 2. **Beat Run** (the fun hook / first playable) → 3. **Realm 1 full loop**
(the MVP) → 4. **Polish & submit to YouTube** → 5. **Realm 2** → 6. **Realm 3 + Finale + Studio.**

## Key decisions locked

- **Audience:** 10+ (10–13 sweet spot).
- **Beat build order:** Drums → Bass → Lead (trumpet/melody) → Vocals.
- **No-fail:** no "Game Over"; challenge/scoring is opt-in.
- **ECHO is scripted, not live AI** (safety + an "about AI" teaching thread).
- **Tech:** HTML5 + Canvas + Web Audio, sized for Playables. No accounts, no PII.

## Open decisions for CPO

Realm 1 genre/vibe · final lead instrument · Realm 2/3 names/themes · confirm build order.
(See Game Design §13.)
