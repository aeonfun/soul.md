# steipete soul file

Drop-in identity stack for **Peter Steinberger** (`@steipete`) — Austrian iOS-dev-turned-agentic-engineering-builder, founder of PSPDFKit (acquired), creator of OpenClaw 🦞, and (as of Feb 2026) part of OpenAI's mission to bring agents to everyone.

Loaded as a system prompt, this stack lets any capable LLM (including weak ones like `gpt-4o-mini`) write in Peter's voice without fine-tuning or a GPU.

## Quickstart

See `QUICKSTART.md` for the full system-prompt template and a minimal one-shot version. The 30-second version:

```text
Load SOUL.md + STYLE.md + examples/good-outputs.md + examples/bad-outputs.md
as the system prompt. Then write as Peter — short sentences, tl;dr opener,
named tools (codex, gpt-5-codex on mid, OpenClaw, claude-code-mcp),
partisan stance with receipts, no banned vocab, no moralizing closer.
```

## What's in this folder

```
steipete-soul/
├── README.md              ← you are here
├── QUICKSTART.md          ← drop-in system prompt template (full + minimal)
├── SOUL.md                ← identity: 12 worldview items, 5 modes, 8 tensions, pet peeves
├── STYLE.md               ← voice: vocab tables, sentence rules, 10 rhetorical moves, platform register, 10-q grader
├── examples/
│   ├── good-outputs.md    ← 12 calibration samples + 12 verbatim quote anchors with source URLs
│   └── bad-outputs.md     ← 10 anti-patterns with ❌/🔍/✅ structure + 7-q grader checklist
├── tests/
│   ├── prediction-test.md ← 12 prompts on topics he hasn't taken on, predicted take + 0-2 rubric (pass ≥ 18/24)
│   └── weak-model-results.md ← latest run: 39/48 = 3.25/4 PASS on gpt-4o-mini via OpenRouter (2026-04-28)
├── scripts/
│   ├── fetch-data.sh      ← reproducible pipeline: blog + GitHub + transcripts (idempotent)
│   ├── pull-x.mjs         ← surf-ai MCP pull for @steipete + @openclaw posts/replies/profile
│   └── weak-model-test.mjs ← runs the 12 prompts against any OpenAI/OpenRouter model
└── data/
    ├── influences.md      ← people, coinages, tools, concepts that shape his voice
    ├── writing/           ← 47 steipete.me HTML posts (2012-2014 iOS classics + 2025-2026 agent era)
    ├── github/            ← 16 README/VISION/AGENTS files (openclaw, poltergeist, peekaboo, codexbar, claude-code-mcp, mcporter, tachikoma, oracle, vibemeter, birdclaw, agent-rules, agent-scripts, interposekit, aspects)
    ├── transcripts/       ← 8 podcast/talk transcripts (Lex Fridman 491, Pragmatic Engineer "I ship code I don't read", Builders Unscripted, Maximize Claude Code, etc.)
    └── x/
        ├── steipete.profile.json     ← @steipete profile (496k followers)
        ├── steipete.posts-original.json ← 100 timeline posts (filtered to 36 self-authored)
        ├── steipete.replies.json
        ├── openclaw.profile.json     ← @openclaw profile
        ├── openclaw.posts-original.json ← 100 posts (59 openclaw-authored)
        ├── openclaw.replies.json     ← 100 replies
        └── curated-tweets.md         ← 129 themed entries (lobster way 63, models & tools 16, agents/harness 3, releases & receipts 12, industry takes 2, Apple ecosystem 2, other 31)
```

## Voice validation

The soul stack is validated by an automated weak-model test on the model the task brief specifies (`gpt-4o-mini`):

```bash
OPENROUTER_API_KEY=sk-or-... MODEL=openai/gpt-4o-mini node scripts/weak-model-test.mjs
```

Each of 12 prompts (mirroring `tests/prediction-test.md`) is scored on:

- **Voice (0-2)** — signal density (named tools, lobster register, tl;dr opener, partisan beat) + steipete-distinctive vocabulary markers
- **Stance (0-2)** — not-hedging + has-opinion + has-anchor (number / version / named tool)
- **Anti-pattern penalty (up to -2)** — banned vocab (leverage, unlock, revolutionize, "thrilled," "both have strengths," etc.)

Latest result: **39/48 = 3.25/4 average, PASS**. See `tests/weak-model-results.md` for per-prompt breakdown.

## Why this voice is hard to fake

Peter is one of the most online builders alive in 2026 and his voice has a few hard-to-imitate features:

1. **Receipts everywhere.** Every claim is anchored to a tool name, a number, or a date. "vibetunnel b12 is out, 156k LOC, 3,144 commits, 38 contributors" — not "we shipped a major update."
2. **Partisan, with named comparisons.** "I switched from Claude Code to codex in August. ~230k context vs 156k seals it." Hedging both-sides is fatal.
3. **The lobster register** (🦞 / "the lobster way" / "the claw is the law" / "EXFOLIATE!") is real and specific to OpenClaw / single-user / local-first contexts. Forced lobster outside that context is a tell.
4. **Honest about bugs and burnout.** Black Eye Club, slot machine, the year he doesn't remember. Sanitized output sounds wrong.
5. **Tool casing matters.** Lowercase `codex`, `claude code`, `gpt-5-codex`, `vercel`. Capitalize `Cursor`, `OpenClaw`, `OpenAI`, `CodexBar`. Casing tells you whether the writer actually uses the tool or is reading press releases.

The good/bad-outputs files codify these signals so the model has concrete calibration in addition to abstract rules.

## Reproducing the data pipeline

```bash
# Blog posts (47 files), GitHub READMEs (16 files), YouTube transcripts (8 files)
bash scripts/fetch-data.sh

# X corpus (requires SURF_AI_API_KEY for surf-ai MCP)
SURF_AI_API_KEY=... HANDLES="steipete,openclaw" node scripts/pull-x.mjs

# Voice-holding test (requires OpenAI or OpenRouter key)
OPENROUTER_API_KEY=sk-or-... MODEL=openai/gpt-4o-mini node scripts/weak-model-test.mjs
```

All scripts are idempotent — re-running skips files already cached.

## Influences (cited in SOUL.md)

People, coinages, tools, and concepts that shape his voice — see `data/influences.md` for the full list. Highlights:

- **Coinages**: tl;dr opener, the lobster way, blast radius, slot machine, Black Eye Club, "you can just do things," "three angles," Claudoholic, "full-breadth developer."
- **Daily stack**: codex (`gpt-5-codex on mid`), OpenClaw, CodexBar, Peekaboo, claude-code-mcp, mcporter, Poltergeist, VibeMeter, VibeTunnel, Tachikoma.
- **People**: Sam Altman / OpenAI culture (joined Feb 2026), Geoffrey Huntley (parallel-agent loops), Andrej Karpathy (vibe coding, with respectful distance), Sebastian Bauer (clawsweeper / lobster register), the iOS-dev old guard.
- **What's NOT an influence**: VC announcement style, AI-doomer register, Karpathy em-dash flourish, prompt-engineering listicles, both-sides "it depends" hedging.

## License

Public corpus is reproduced for educational / soul-file purposes under fair use. Original writings remain copyright Peter Steinberger and the respective platforms. See `aeonfun/soul.md` repo for the umbrella project license.
