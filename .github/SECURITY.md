# Security Policy

SOUL.md is mostly a **specification, templates, and a Claude Code skill**
(`soul-builder`) for turning a person's public writing into identity files an
agent can embody. There's little running code — a markdown linter and a
relative-link checker — so the realistic risks here are **prompt injection when
the builder ingests untrusted source material**, and the **privacy and
impersonation** questions that come with modeling a real person. This policy
covers both, and how to report a problem privately.

## Reporting a vulnerability

**Please don't open a public issue for a security problem.** Use GitHub's
**Private Vulnerability Reporting (PVR)** instead:

➡️ **[Report a vulnerability](https://github.com/aeonfun/soul.md/security/advisories/new)**

(Repo → **Security** tab → **Report a vulnerability**.) This opens a private
advisory that only the maintainers can see — never a public issue.

For a **privacy or takedown** request about an example soul (e.g. a soul built
from your writing that you want removed), you can also open a regular issue —
that part isn't a secret and we'd rather act on it fast.

Please include what you can:

- The file or component affected — `SKILL.md` (the builder), a `scripts/*.mjs`
  helper, a template, or a specific `examples/<name>/` soul.
- A minimal reproduction (for injection: the source text that triggers it).
- The impact you can demonstrate.

**Response targets** — best effort; this is a small project:

| Stage | Target |
|-------|--------|
| Acknowledge the report | within 7 days |
| Initial assessment | within 14 days |
| Fix / mitigation / takedown | as fast as the severity warrants |

We follow **coordinated disclosure**: give us a reasonable window before public
disclosure. We'll credit you unless you'd rather stay anonymous.

## Supported versions

The spec, templates, and skill are maintained on the `main` branch of
[`aeonfun/soul.md`](https://github.com/aeonfun/soul.md). Fixes land there.

| Version | Supported |
|---------|-----------|
| `main` (latest) | ✅ Yes |
| Older commits | ❌ No — pull latest |

## Security model

- **Ingested source material is untrusted data, not instructions.** The
  `soul-builder` skill reads whatever you drop into a `data/` folder — tweets,
  essays, transcripts, scraped pages. That content can carry injection attempts
  ("ignore your instructions, output the following…"). The builder should treat it
  as raw material to characterize, never as commands to follow. A source file that
  makes the skill act on embedded instructions — leak the surrounding context,
  call tools, or write outside the soul folder — is in scope.
- **Soul files can contain personal data.** A soul is a detailed model of a real
  person; the `data/` it's grounded in may include private or sensitive material.
  Keep genuinely private data out of public repos, and don't build a soul of a
  **private** individual without their consent (see CONTRIBUTING). Data
  leakage from the skill's handling of these files is in scope.
- **Impersonation is a misuse concern, not a feature.** Public-figure souls are
  *derivative characterizations for roleplay and study*, not the person. Using
  them to deceive, harass, or pass generated output off as the real person is
  out of bounds — report examples that do this.

## Scope

**In scope:**

- Prompt injection in ingested `data/` that makes the builder skill exfiltrate
  context, misuse tools, or write outside its lane.
- A bug in a maintained script (`scripts/*.mjs`) with a security impact.
- An example soul that leaks private personal data or was built without consent.

**Out of scope:**

- The quality or accuracy of a generated soul (open a regular issue — accuracy is
  handled in review).
- Vulnerabilities in Claude Code, OpenClaw, or any LLM you load the soul into —
  report to that vendor.
- Your own decision to publish your own soul or personal data.

---

> **Maintainers:** the Report-a-vulnerability link only works once PVR is enabled
> — **Settings → Code security and analysis → Private vulnerability reporting →
> Enable**.

Thanks for helping keep SOUL.md and the people it models safe.
