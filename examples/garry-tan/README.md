# soul-garrytan

A `soul.md` identity distillation for Garry Tan — co-founder of Posterous, founding partner of Initialized Capital, president and CEO of Y Combinator.


## What's in here

```
garry-tan/
├── SOUL.md              ← Identity, worldview, opinions
├── STYLE.md             ← Voice mechanics
├── MEMORY.md            ← Empty session log
├── data/
│   └── influences.md
│                        ← x/, writing/, yt/ are created by scripts/ on first run
├── examples/
│   ├── good-outputs.md  ← 12 calibration samples
│   └── bad-outputs.md   ← 10 anti-patterns
├── scripts/
│   ├── fetch_x.py       ← Twitter archive → data/x/*.md
│   ├── fetch_writing.py ← YC blog + personal posts → data/writing/
│   └── fetch_yt.py      ← YouTube transcripts → data/yt/*.md
└── tests/
    ├── prediction_test.md      ← 10 unseen prompts + expected takes
    ├── platform_tests.md       ← 3 platform-shape prompts
    ├── weak_model_test.md      ← protocol + verdict
    ├── run_weak_model.py       ← the harness
    ├── results_gpt-4o-mini.md  ← full transcript
    └── scores_gpt-4o-mini.md   ← per-prompt grades (38.5/48 PASS)
```

## How to rebuild the corpus

```bash
# Twitter: requires user-supplied X API bearer token OR a downloaded archive
X_BEARER_TOKEN=... python scripts/fetch_x.py

# YC blog + personal site: RSS + static HTML, no auth
python scripts/fetch_writing.py

# YouTube: requires yt-dlp and youtube-transcript-api
pip install yt-dlp youtube-transcript-api
python scripts/fetch_yt.py
```

## How to use

```bash
# From a project root, copy into a /soul directory and invoke
/soul write a tweet reacting to the latest OpenAI announcement
```

The SKILL.md from the parent `soul.md` repo handles the embodiment logic.

## Verification

Before accepting, see `tests/prediction_test.md` — 10 topics Garry has not publicly opined on, paired with the take the soul file predicts he would have. Graders can score by comparing to subsequent real takes.
