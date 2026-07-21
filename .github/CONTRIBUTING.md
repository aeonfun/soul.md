# Contributing to SOUL.md

SOUL.md grows by example. The spec is small on purpose — what makes it useful is a
library of real soul files people can fork, calibrate against, and learn from. The
most valuable thing you can contribute is **a soul file good enough that someone
reading it could predict its subject's take on a new topic.**

## Ways to contribute

- **A new example soul** — yours or a public figure's. This is the main event.
- **Spec / template / docs fixes** — tighten [`SOUL.template.md`](../SOUL.template.md)
  or [`STYLE.template.md`](../STYLE.template.md), improve a `_GUIDE.md`, fix a
  factual error or broken link.

Build your soul first with the [soul-builder skill](../BUILD.md) (`/soul-builder`)
or by hand from the templates. See [`examples/_GUIDE.md`](../examples/_GUIDE.md)
for what goes in the calibration files.

## Before you start

- **Branch from `main`.** Use a descriptive branch name (`feat/…`, `fix/…`,
  `docs/…`, or `Add <name> example`).
- **One change per PR.** A new example, *or* a spec fix — not both.
- **Conventional, descriptive titles** matching the existing history.

> **Public-figure souls — read this.** A soul built from someone else's public
> writing is a *derivative characterization of a public voice for LLM roleplay and
> educational use* — not impersonation, and not them. Only use genuinely public
> material. Every public-figure example must carry an explicit note saying so.
> Don't build a soul of a **private** individual without their consent. We won't
> merge anything that reads as deception, harassment, or an attempt to pass
> generated output off as the real person.

## Development setup

No build step — it's markdown. Two paths for an example soul:

- **Your own soul.** Host it in your own public repo, then open a PR adding
  yourself to the [Examples](README.md#examples) section of the root README — a
  one-paragraph bio, a link, and a few lines on what makes your spec distinctive.
- **A showcase example, checked in here.** Notable, well-grounded souls live under
  `examples/<name>/` so people can read them inline. PR the folder *and* a README
  entry. Use the existing examples as the reference bar.

A showcase folder follows the existing layout; the floor is:

```
examples/<name>/
├── SOUL.md                  ← identity: worldview, modes, tensions, boundaries  (required)
├── STYLE.md                 ← voice rules: vocabulary, moves, register          (required)
├── examples/good-outputs.md ← 10–20 calibration samples                        (required)
├── README.md · MEMORY.md · data/ · examples/bad-outputs.md                     (recommended)
```

Keep raw dumps (verbatim READMEs, tweet JSON, transcripts) under `data/` — they're
evidence, not navigable docs.

### The bar for merge

We merge soul files that are **specific, calibratable, and grounded**:

- **Real opinions, not placeholders.** If a section could describe a hundred
  people, it's too vague.
- **A `STYLE.md` someone could actually calibrate from** — concrete vocabulary,
  punctuation/casing rules, platform register, named anti-patterns.
- **Tensions and contradictions.** A suspiciously coherent soul reads fake.
- **Grounding.** Reference real sources; quote verbatim and cite; don't invent
  biographical facts (unsourced claims get cut).

Strong examples ship **proof the soul works** — a prediction test, a weak-model
score (e.g. `40/48 = 3.33/4 PASS`), or a grader checklist. Borrow the patterns
from [`examples/karpathy/`](../examples/karpathy/).

## Testing & CI

CI runs [markdownlint](https://github.com/DavidAnson/markdownlint-cli2) and a
relative-link check on maintained docs. Run the link check locally before pushing:

```bash
node scripts/check-links.mjs
```

Soul files are intentionally raw prose, so only link/reference integrity is
enforced — not style.

## Submitting a pull request

- Keep it to one example (or one spec fix) and a conventional title.
- `SOUL.md`, `STYLE.md`, and `examples/good-outputs.md` are present and specific.
- Opinions are concrete; a couple of real tensions are named.
- Quotes are verbatim and sourced; no invented facts.
- Public-figure souls include the derivative-characterization / ethics note.
- You added or updated the Examples entry in the root README, with a working link.
- **Accuracy is part of review** — factual errors (heritage, dates, unsourced
  claims) are flagged and must be fixed before merge.

## Reporting bugs & requesting features

Not sure whether something belongs?
[Open an issue](https://github.com/aeonfun/soul.md/issues) and ask before
investing the work.

**Found a security or privacy problem** (injection in the builder, or a soul that
leaks private data)? Follow [`SECURITY.md`](SECURITY.md) — you can report privately
via PVR, or open an issue for a takedown request.

## License

By contributing, you agree that your contributions are licensed under the
repository's [LICENSE](../LICENSE). Thanks for helping make identity composable,
forkable, and evolvable.
