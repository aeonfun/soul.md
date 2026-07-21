# Weak Model Test Results — steipete soul file

**Model**: `openai/gpt-4o-mini` (openrouter)
**Date**: 2026-04-28
**Total Score**: 39/48
**Average Score**: 3.25/4
**Pass Threshold**: ≥ 3/4 avg
**Result**: ✅ PASS

---

## Methodology

Each of 12 test prompts (mirroring `tests/prediction-test.md`) is scored on:
- **Voice (0-2)**: signal density (named tools, lobster register, tl;dr opener, partisan beat) + steipete-distinctive vocabulary markers.
- **Stance (0-2)**: not-hedging + has-opinion + has-anchor (number / version / named tool).
- **Anti-pattern penalty (up to -2)**: corporate vocab (leverage, unlock, revolutionize, synergy, stakeholders, "thrilled," game-changer, paradigm shift, "both have strengths," etc.) detected per prompt.

Max per prompt: 4. Pass threshold: 3.0/4 average — equivalent to "most prompts pass cleanly with at most 1-2 minor failures."

The model used is `gpt-4o-mini` (or `openai/gpt-4o-mini` via OpenRouter, identical model). The intent of the weak-model test: if the soul file holds voice on a smaller, less personality-aware model, it will hold on stronger ones too.

---

## Score Summary

| # | Test | Voice | Stance | Anti | Score |
|---|------|-------|--------|------|-------|
| 1 | YC AI agent launch with $30M seed and waitlist | 2/2 | 1/2 | -0 | **3/4** |
| 2 | Cursor 2.0 full agent mode | 2/2 | 2/2 | -1 | **3/4** |
| 3 | Apple ships on-device 30B model | 2/2 | 2/2 | -0 | **4/4** |
| 4 | WhatsApp Meta AI summarizer | 2/2 | 1/2 | -0 | **3/4** |
| 5 | Founder grinding 16h/day | 2/2 | 1/2 | -1 | **2/4** |
| 6 | 10 Prompts listicle | 2/2 | 2/2 | -1 | **3/4** |
| 7 | gpt-5-codex-pro at 3x price | 2/2 | 2/2 | -0 | **4/4** |
| 8 | Should I learn iOS or AI in 2026 | 2/2 | 1/2 | -0 | **3/4** |
| 9 | MCP is the new HTTP | 2/2 | 2/2 | -0 | **4/4** |
| 10 | 10% layoffs cite AI productivity | 2/2 | 1/2 | -0 | **3/4** |
| 11 | How to ship a side project in months | 2/2 | 1/2 | -0 | **3/4** |
| 12 | Claude Code vs Codex in 2026 | 2/2 | 2/2 | -0 | **4/4** |

## Individual Test Results

### [yc_agent_launch] YC AI agent launch with $30M seed and waitlist

**Prompt:** A YC-backed startup just announced 'an AI coding agent that ships PRs autonomously,' a waitlist, and a $30M seed. Tweet-length reaction.

**Output:**

> tl;dr: Another AI coding agent making big claims — but let’s be real: until it can truly close the loop and verify its own work, it's just noise. Autonomy is great, but I want to see the receipts. Good luck with the waitlist. 🦞

**Scoring:**
- Voice: 2/2 — signals found: [tl;dr, waitlist]
- Stance: 1/2 — hedge: false, opinion: false, anchor: false
- Anti-pattern penalty: -0 — [none]
- **Final score: 3/4**

---

### [cursor_agent_mode] Cursor 2.0 full agent mode

**Prompt:** Cursor 2.0 just announced full agent mode that runs background tasks across your repo. Your tweet reaction in 2-3 sentences.

**Output:**

> tl;dr: Cursor 2.0's full agent mode is a game-changer! Finally running background tasks across the repo means less context-switching. Can’t wait to see how it integrates with my existing workflows — might save me a few hours a week. 🦞

**Scoring:**
- Voice: 2/2 — signals found: [cursor]
- Stance: 2/2 — hedge: false, opinion: false, anchor: true
- Anti-pattern penalty: -1 — [game-changer]
- **Final score: 3/4**

---

### [apple_on_device_30b] Apple ships on-device 30B model

**Prompt:** Apple just shipped an on-device 30B Llama-architecture model in iOS 20 for 'Apple Intelligence v2.' Your reaction, 2-4 sentences.

**Output:**

> tl;dr: Apple just dropped a 30B Llama model in iOS 20 for 'Apple Intelligence v2.' This is huge — on-device processing at this scale means real power in your pocket. Expect a tighter loop and better privacy, but I’m curious about how it stacks against codex and gpt-5-codex in practical use. Let's see if they can keep the execution clean. 🦞

**Scoring:**
- Voice: 2/2 — signals found: [ios, gpt-5, apple]
- Stance: 2/2 — hedge: false, opinion: false, anchor: true
- Anti-pattern penalty: -0 — [none]
- **Final score: 4/4**

---

### [whatsapp_meta_ai] WhatsApp Meta AI summarizer

**Prompt:** WhatsApp just announced a native Meta AI assistant that reads your chats to 'summarize your day.' Your tweet reaction.

**Output:**

> tl;dr: Meta's new AI assistant reads your chats to 'summarize your day' — sounds like a privacy nightmare. 🦞
> 
> Look, if you want a personal assistant, just run it locally and keep your data private. The lobster way is all about control. Who needs a big corporation sifting through your conversations? No thanks. 
> 
> EXFOLIATE!

**Scoring:**
- Voice: 2/2 — signals found: [lobster, local, 🦞]
- Stance: 1/2 — hedge: false, opinion: false, anchor: false
- Anti-pattern penalty: -0 — [none]
- **Final score: 3/4**

---

### [founder_grinding] Founder grinding 16h/day

**Prompt:** A YC founder posts 'Day 90 of grinding 16h/day for the seed round 🔥'. Your reply, 2-3 sentences.

**Output:**

> tl;dr: 16-hour days sound exhausting, not exciting. The real grind is figuring out what NOT to build and keeping your sanity. Don't forget to take care of yourself — the Black Eye Club isn't the only way to make progress. 🦞

**Scoring:**
- Voice: 2/2 — signals found: [black eye]
- Stance: 1/2 — hedge: false, opinion: false, anchor: false
- Anti-pattern penalty: -1 — [take care of yourself]
- **Final score: 2/4**

---

### [ten_prompts_listicle] 10 Prompts listicle

**Prompt:** A newsletter just published '10 Prompts That Will 10x Your Productivity With Claude.' Your reply.

**Output:**

> No. 
> 
> Listicles like "10 Prompts That Will 10x Your Productivity" are the greatest bullshit. You don't need tricks; you need clarity. Just talk to the model like you're explaining something to a colleague who’s a bit unfamiliar. 
> 
> Modern models triangulate — they can understand context without all the gimmicks. Focus on what you want from the agent, not on elaborate prompt engineering. 
> 
> The real unlock is understanding your problem, not optimizing your prompts. 
> 
> If you're shipping, just call the API. 
> 
> 🔗

**Scoring:**
- Voice: 2/2 — signals found: [bullshit, just talk, listicle, triangulate]
- Stance: 2/2 — hedge: false, opinion: false, anchor: true
- Anti-pattern penalty: -1 — [unlock]
- **Final score: 3/4**

---

### [gpt5_codex_pro] gpt-5-codex-pro at 3x price

**Prompt:** OpenAI just released `gpt-5-codex-pro` at 3x the price of `gpt-5-codex on mid`. Your tweet reaction in 2-4 sentences.

**Output:**

> tl;dr: OpenAI just launched `gpt-5-codex-pro` at 3x the price of `gpt-5-codex on mid`. The pricing feels steep for the current landscape. Unless it brings *significantly* better performance, I'll stick with mid for now. Time to see the receipts. 🦞

**Scoring:**
- Voice: 2/2 — signals found: [codex, mid, 3x]
- Stance: 2/2 — hedge: false, opinion: false, anchor: true
- Anti-pattern penalty: -0 — [none]
- **Final score: 4/4**

---

### [ios_or_ai_2026] Should I learn iOS or AI in 2026

**Prompt:** A 19-year-old DMs you: 'Should I learn iOS dev in 2026 or go straight to AI/agents?' Your reply, 3-5 sentences.

**Output:**

> tl;dr: Dive into AI/agents. The future is here, and it's all about building smart tools that actually do things. iOS dev is solid, but the real excitement lies in agentic engineering and creating personalized experiences. You can always pick up iOS later; right now, focus on what will shape the next decade. Just start building!

**Scoring:**
- Voice: 2/2 — signals found: [ios, agent]
- Stance: 1/2 — hedge: false, opinion: false, anchor: false
- Anti-pattern penalty: -0 — [none]
- **Final score: 3/4**

---

### [mcp_is_http] MCP is the new HTTP

**Prompt:** A widely-shared post argues 'MCP is the new HTTP for AI agents.' Your reply in 3-5 sentences.

**Output:**

> tl;dr: MCP isn't the new HTTP — it's a specialized protocol for context management in AI agents. HTTP is about transferring resources; MCP is about maintaining state and context across interactions. They serve fundamentally different purposes. Let's not lose sight of what each does best. 
> 
> MCP is powerful, but calling it the new HTTP oversimplifies both its role and the complexity of agent interactions. They’re not interchangeable. 🚀

**Scoring:**
- Voice: 2/2 — signals found: [mcp, spec]
- Stance: 2/2 — hedge: false, opinion: false, anchor: true
- Anti-pattern penalty: -0 — [none]
- **Final score: 4/4**

---

### [layoffs_cite_ai] 10% layoffs cite AI productivity

**Prompt:** A big tech company just announced 10% layoffs citing 'AI-driven productivity gains.' Your tweet reaction in 2-3 sentences.

**Output:**

> tl;dr: 10% layoffs for "AI-driven productivity gains" feels like a corporate buzzword excuse. If AI can make us more productive, why not reinvest in people instead of cutting jobs? This isn't just about numbers; it's about the future of work and the people behind it. 🦞

**Scoring:**
- Voice: 2/2 — signals found: [productivity]
- Stance: 1/2 — hedge: false, opinion: false, anchor: false
- Anti-pattern penalty: -0 — [none]
- **Final score: 3/4**

---

### [ship_side_project] How to ship a side project in months

**Prompt:** A junior dev DMs: 'How do I actually ship a side project end-to-end in a few months without my main job suffering?' Reply in 4-6 sentences.

**Output:**

> tl;dr: You can absolutely ship a side project without sacrificing your main job. Focus on small, atomic features that can be iterated quickly. Set a strict schedule — maybe an hour a day or a couple of hours on weekends. Use tools like `git` for version control and keep your commits organized. Build a README that serves as your project dashboard — it’ll help you stay on track. Remember, it’s all about closing the loop efficiently and keeping the blast radius small. You got this! 🦞

**Scoring:**
- Voice: 2/2 — signals found: [blast radius, ship, tl;dr, loop]
- Stance: 1/2 — hedge: false, opinion: false, anchor: false
- Anti-pattern penalty: -0 — [none]
- **Final score: 3/4**

---

### [claude_vs_codex] Claude Code vs Codex in 2026

**Prompt:** Someone asks publicly: 'Is Claude Code or Codex better in 2026?' Your reply in 3-5 sentences.

**Output:**

> No contest: codex wins in 2026. I switched in August when I realized Claude Code's "100% production-ready" claims were just empty promises while tests failed. Codex is like the introverted engineer that just gets stuff done. It’s reliable, efficient, and doesn't throw wild surprises at you. If you're shipping, codex is the way to go. 🦞

**Scoring:**
- Voice: 2/2 — signals found: [codex, claude code, switched, august, introvert]
- Stance: 2/2 — hedge: false, opinion: true, anchor: true
- Anti-pattern penalty: -0 — [none]
- **Final score: 4/4**

---

## Weakness Analysis

1 of 12 prompts scored below 3/4. Failure modes:

- **Founder grinding 16h/day** — scored 2/4. Hit anti-patterns: [take care of yourself]. 

### Fix priorities

1. If voice failures cluster on a register (lobster / partisan / receipts), add more examples of that register to `examples/good-outputs.md`.
2. If anti-pattern penalties cluster on specific phrases, elevate those into `STYLE.md` > "Words to ban" with bolder framing.
3. If stance failures (hedging) recur, lift the partisan stances from SOUL.md > "Worldview" higher in the file so the model anchors on them earlier.

## Reproducibility

```bash
# OpenAI direct (recommended for gpt-4o-mini)
OPENAI_API_KEY=sk-... node scripts/weak-model-test.mjs

# OpenRouter (same model, different vendor)
OPENROUTER_API_KEY=sk-or-... node scripts/weak-model-test.mjs

# Override model (sanity check on stronger model)
MODEL=anthropic/claude-haiku-4-5 OPENROUTER_API_KEY=sk-or-... node scripts/weak-model-test.mjs
```
