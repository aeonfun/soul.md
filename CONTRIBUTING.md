# Contributing to SOUL.md

SOUL.md grows by example. The spec is small on purpose — what makes it useful is a
library of real soul files people can fork, calibrate against, and learn from. The
most valuable thing you can contribute is **a soul file good enough that someone
reading it could predict its subject's take on a new topic.**

Two kinds of contributions:

- **A new example soul** — yours or a public figure's. This is the main event.
- **Spec, template, or docs fixes** — tighten `SOUL.template.md` / `STYLE.template.md`,
  improve a `_GUIDE.md`, fix a factual error or broken link.

Build your soul first with the [soul-builder skill](SKILL.md) (`/soul-builder`) or by
hand from [`SOUL.template.md`](SOUL.template.md) and [`STYLE.template.md`](STYLE.template.md).
See [`examples/_GUIDE.md`](examples/_GUIDE.md) for what goes in the calibration files.

---

## Adding an example soul

### Two paths

**Your own soul.** Host it in your own public repo, then open a PR adding yourself to
the [Examples](README.md#examples) section of the root README — one paragraph bio, a
link, and a few lines on what makes your spec distinctive. (This is how
[@aaronjmars](https://github.com/aaronjmars/soul-aaronjmars) is listed.)

**A showcase example, checked into this repo.** Notable, well-grounded souls live under
`examples/<name>/` so people can read them inline. PR the folder *and* a README entry.
See [`examples/karpathy/`](examples/karpathy/), [`examples/steipete/`](examples/steipete/),
[`examples/garry-tan/`](examples/garry-tan/), and
[`examples/vivian-balakrishnan/`](examples/vivian-balakrishnan/) as the reference bar.

> **Public-figure souls — read this.** A soul built from someone else's public writing
> is a *derivative characterization of a public voice for LLM roleplay and educational
> use* — not impersonation, and not them. Only use material that is genuinely public.
> Every public-figure example must carry an explicit note saying so (every showcase
> example here ends with one). Don't build a soul of a private individual without their
> consent. We won't merge anything that reads as deception, harassment, or an attempt
> to pass off generated output as the real person's.

### Folder structure

A showcase example follows the layout the existing ones use:

```
examples/<name>/
├── README.md                ← what this soul is + a "voice in one paragraph" + how it's validated
├── QUICKSTART.md            ← drop-in system-prompt template (optional but recommended)
├── SOUL.md                  ← identity: worldview, modes, tensions, boundaries   (required)
├── STYLE.md                 ← voice rules: vocabulary, rhetorical moves, register (required)
├── MEMORY.md                ← running session log (can start near-empty)
├── data/                    ← raw source material the soul is grounded in        (recommended)
│   ├── influences.md
│   ├── writing/  x/  transcripts/  github/  …
└── examples/
    ├── good-outputs.md      ← 10–20 calibration samples                          (required)
    └── bad-outputs.md       ← anti-patterns with diagnosis                       (recommended)
```

`SOUL.md`, `STYLE.md`, and `examples/good-outputs.md` are the floor. Everything else
strengthens the submission. Keep raw dumps (verbatim upstream READMEs, tweet JSON,
transcripts) under `data/` — they're evidence, not navigable docs.

---

## The bar for merge

We merge soul files that are **specific, calibratable, and grounded.** A submission is
likely to merge when it has:

- **Real opinions, not placeholders.** "I think most AI-safety discourse is galaxy-brained
  cope" beats "I have nuanced views on AI." If a section could describe a hundred people,
  it's too vague.
- **A `STYLE.md` someone could actually calibrate from** — concrete vocabulary (words to
  use, words to ban), punctuation and casing rules, platform register, and named
  anti-patterns. Not "be conversational."
- **Tensions and contradictions.** Real people aren't internally consistent. A soul that's
  suspiciously coherent reads fake. Call out the paradoxes.
- **Grounding.** Reference real sources — checked-in `data/`, links, named influences. If
  you quote the subject, quote them verbatim and cite where it's from. Don't invent
  biographical facts; unsourced claims get cut.

What gets a PR sent back: vague generalities, a `STYLE.md` that's all adjectives, no
examples, invented quotes or facts, or a public-figure soul with no ethics note.

### Validation (recommended, and what makes the strong examples strong)

The best examples ship proof the soul works. Borrow any of these patterns from
[`examples/karpathy/`](examples/karpathy/):

- **Prediction test** — a handful of prompts on topics the subject *hasn't* publicly
  addressed, with the predicted take + voice signals and a 0–2 grading rubric.
- **Weak-model test** — load the full stack into a cheap model (e.g. `gpt-4o-mini`) and
  score voice / stance / anti-pattern penalty. Where a weak model drifts, your spec is
  too vague — tighten and re-run. Report the score (e.g. `40/48 = 3.33/4 PASS`).
- **Grader checklist** — a short list of yes/no questions a human or AI reviewer can
  apply to any generated output.

---

## Wiring it into the README

Add an entry to the **Examples** (in-repo) or keep it in your own repo and add it to the
list — same format either way:

```markdown
### @handle
One-paragraph bio — who they are, where they're from, what they're known for.

What makes this one distinctive: the one or two things that set this spec apart
(a modes framework, verified quote anchors, a weak-model score, an ethics stance…).

→ [View soul files](examples/<name>/)   ← or a link to your repo
```

Keep the "what makes this distinctive" line honest and specific — it's the part people
actually read.

---

## Submission checklist

- [ ] `SOUL.md`, `STYLE.md`, and `examples/good-outputs.md` are present and specific.
- [ ] Opinions are concrete; at least a couple of real tensions/contradictions are named.
- [ ] Quotes are verbatim and sourced; no invented biographical facts.
- [ ] Public-figure souls include the derivative-characterization / ethics note.
- [ ] Raw source material lives under `data/`, not mixed into the spec files.
- [ ] You added (or updated) the Examples entry in the root README, with a working link.
- [ ] One example per PR — don't bundle unrelated changes.

---

## Pull-request etiquette

- **One change per PR.** A new example, or a spec fix — not both.
- **Conventional, descriptive titles.** `Add <name> example`, or `docs:` / `fix:` for
  spec and content changes (matching the existing history).
- **Accuracy is part of review.** Factual errors in a soul (heritage, dates, unsourced
  claims) will be flagged and must be fixed before merge — this has happened before.
- Link any related issue or discussion in the PR body.

Not sure whether something belongs? [Open an issue](https://github.com/aaronjmars/soul.md/issues)
and ask before investing the work.

Thanks for helping make identity composable, forkable, and evolvable.
