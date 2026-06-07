# Pitch deck fonts

The BGC pitch deck (`pitch/index.html`) references these brand font files via `@font-face`.
They are **not committed** (licensed brand fonts). Drop the actual files here and the deck
renders in the real BGC type; until then it falls back to system sans/mono and still works.

Place these files in this folder (`pitch/assets/fonts/`):

**Patika** (display)
- `Patika-ExtraLight.otf` · `Patika-Light.otf` · `Patika-Regular.otf` · `Patika-Medium.otf`
- `Patika-SemiBold.otf` · `Patika-Bold.otf` · `Patika-ExtraBold.otf`

**Goga** (body)
- `Goga-Regular.woff2` · `Goga-Italic.woff2` · `Goga-Medium.woff2`
- `Goga-MediumItalic.woff2` · `Goga-SemiBold.woff2` · `Goga-Bold.woff2`

**Apercu Mono** (mono / labels)
- `ApercuMonoPro.otf` · `ApercuMonoPro-Medium.otf` · `ApercuMonoPro-Bold.otf`

> Note: paths are relative, so open the deck at a trailing-slash URL (`/pitch/`) in
> production for the font and asset paths to resolve correctly.
