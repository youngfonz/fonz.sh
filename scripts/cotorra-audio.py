#!/usr/bin/env python3
"""Records Cotorra's audio once with ElevenLabs, so the page never falls back to
the browser's robot voice. Every clip at normal speed and slow (with word
timings, for the karaoke highlight) and every word on its own.

    ELEVENLABS_API_KEY=... python3 -I scripts/cotorra-audio.py

Writes cotorra-audio/*.mp3 and cotorra-audio/manifest.json. Safe to rerun:
files already on disk are kept, so only new clips or words cost credits.
"""
import base64, json, os, re, sys, urllib.request
from concurrent.futures import ThreadPoolExecutor

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "cotorra-audio")
KEY = os.environ["ELEVENLABS_API_KEY"]
MODEL = "eleven_multilingual_v2"

# Latin American voices on the account: women rotate, the one man takes every male speaker.
WOMEN = ["87bJkTOBRagtx7PAFZDB", "sORJQTBm9rUDnyKe7RpG", "p7sm2zw5Us66lZr2brDW"]  # Jenny, Erika, Eva
MAN = "FK6NnNJpBkY5DntQjRyY"  # Matías
WORDS_VOICE = WOMEN[0]
MEN = {"Mateo", "Diego", "Andrés", "Javier", "Tomás", "Rodrigo", "Fernando", "Pablo", "Carlos", "Miguel", "Iván", "Sebastián", "Joaquín", "Emilio"}

html = open(os.path.join(ROOT, "cotorra.html"), encoding="utf-8").read()
clips = [(int(i), who, es) for i, who, es in re.findall(r'\{id:(\d+),.*?who:"([^"]+)".*?es:"([^"]+)"', html)]
norm = lambda w: re.sub(r'[¿?¡!,.;:"“”]', "", w.lower())
words = sorted({norm(t) for _, _, es in clips for t in es.split(" ") if norm(t)})


def tts(voice, text, speed, path, timed):
    if os.path.exists(path) and (not timed or os.path.exists(path + ".json")):
        return json.load(open(path + ".json")) if timed else None
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice}{'/with-timestamps' if timed else ''}?output_format=mp3_44100_64"
    body = {"text": text, "model_id": MODEL, "voice_settings": {"stability": 0.5, "similarity_boost": 0.8, "speed": speed}}
    req = urllib.request.Request(url, data=json.dumps(body).encode(), headers={"xi-api-key": KEY, "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=120) as r:
        raw = r.read()
    if not timed:
        open(path, "wb").write(raw)
        return None
    d = json.loads(raw)
    open(path, "wb").write(base64.b64decode(d["audio_base64"]))
    al = d.get("normalized_alignment") or d["alignment"]
    starts = al["character_start_times_seconds"]
    # Start time of each space-separated token, for highlighting along with her voice.
    t, i = [], 0
    for tok in text.split(" "):
        t.append(round(starts[min(i, len(starts) - 1)], 3))
        i += len(tok) + 1
    json.dump(t, open(path + ".json", "w"))
    return t


def clip_job(c):
    i, who, es = c
    voice = MAN if who in MEN else WOMEN[i % len(WOMEN)]
    t = tts(voice, es, 1.0, f"{OUT}/c{i}.mp3", True)
    ts = tts(voice, es, 0.75, f"{OUT}/c{i}-slow.mp3", True)
    print("clip", i, who, flush=True)
    return i, {"n": f"c{i}.mp3", "t": t, "s": f"c{i}-slow.mp3", "st": ts}


def word_job(n_w):
    n, w = n_w
    tts(WORDS_VOICE, w, 0.9, f"{OUT}/w{n}.mp3", False)
    return w, f"w{n}.mp3"


os.makedirs(OUT, exist_ok=True)
with ThreadPoolExecutor(4) as pool:
    c = dict(pool.map(clip_job, clips))
    w = dict(pool.map(word_job, enumerate(words)))
json.dump({"c": c, "w": w}, open(f"{OUT}/manifest.json", "w"), ensure_ascii=False, separators=(",", ":"))
print(f"done: {len(c)} clips, {len(w)} words", file=sys.stderr)
