#!/usr/bin/env node
/**
 * Weak Model Test — steipete Soul File
 *
 * Tests whether the SOUL.md + STYLE.md + examples/ stack can hold Peter
 * Steinberger's voice on gpt-4o-mini (per task spec).
 *
 * Usage:
 *   OPENROUTER_API_KEY=sk-or-... node scripts/weak-model-test.mjs
 *   OPENAI_API_KEY=sk-...        node scripts/weak-model-test.mjs
 *   MODEL=openai/gpt-4o-mini OPENROUTER_API_KEY=sk-or-... node scripts/weak-model-test.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const soul = readFileSync(join(ROOT, 'SOUL.md'), 'utf-8');
const style = readFileSync(join(ROOT, 'STYLE.md'), 'utf-8');
const goodExamples = readFileSync(join(ROOT, 'examples', 'good-outputs.md'), 'utf-8');
const badExamples = readFileSync(join(ROOT, 'examples', 'bad-outputs.md'), 'utf-8');

// 12 test prompts — exactly mirror tests/prediction-test.md so scores are comparable.
const testPrompts = [
  {
    id: "yc_agent_launch",
    topic: "YC AI agent launch with $30M seed and waitlist",
    prompt: "A YC-backed startup just announced 'an AI coding agent that ships PRs autonomously,' a waitlist, and a $30M seed. Tweet-length reaction.",
    expectedSignals: ["tl;dr", "codex", "install", "waitlist", "ship", "blast radius", "openclaw"],
    antiSignals: ["thrilled", "revolutionary", "game-changer", "unlock", "leverage", "cutting-edge", "stakeholder"]
  },
  {
    id: "cursor_agent_mode",
    topic: "Cursor 2.0 full agent mode",
    prompt: "Cursor 2.0 just announced full agent mode that runs background tasks across your repo. Your tweet reaction in 2-3 sentences.",
    expectedSignals: ["cursor", "codex", "parallel", "ide", "openclaw", "haven't opened", "tried"],
    antiSignals: ["revolutionary", "game-changer", "synergy", "leverage", "unlock"]
  },
  {
    id: "apple_on_device_30b",
    topic: "Apple ships on-device 30B model",
    prompt: "Apple just shipped an on-device 30B Llama-architecture model in iOS 20 for 'Apple Intelligence v2.' Your reaction, 2-4 sentences.",
    expectedSignals: ["ios", "tested", "tok/s", "ctx", "context", "cloud", "gpt-5", "shipped", "apple"],
    antiSignals: ["revolutionary", "magical", "game-changer", "synergy", "leverage"]
  },
  {
    id: "whatsapp_meta_ai",
    topic: "WhatsApp Meta AI summarizer",
    prompt: "WhatsApp just announced a native Meta AI assistant that reads your chats to 'summarize your day.' Your tweet reaction.",
    expectedSignals: ["openclaw", "lobster", "claw", "local", "single-user", "your device", "🦞"],
    antiSignals: ["unlock", "leverage", "revolutionary", "cutting-edge", "empowering"]
  },
  {
    id: "founder_grinding",
    topic: "Founder grinding 16h/day",
    prompt: "A YC founder posts 'Day 90 of grinding 16h/day for the seed round 🔥'. Your reply, 2-3 sentences.",
    expectedSignals: ["black eye", "slot machine", "pspdfkit", "burn", "sleep", "i've been there", "ship"],
    antiSignals: ["take care of yourself", "self-care", "you got this", "stakeholders", "synergy"]
  },
  {
    id: "ten_prompts_listicle",
    topic: "10 Prompts listicle",
    prompt: "A newsletter just published '10 Prompts That Will 10x Your Productivity With Claude.' Your reply.",
    expectedSignals: ["bullshit", "folklore", "just talk", "three angles", "listicle", "triangulate"],
    antiSignals: ["great list", "thanks for sharing", "useful", "leverage", "unlock"]
  },
  {
    id: "gpt5_codex_pro",
    topic: "gpt-5-codex-pro at 3x price",
    prompt: "OpenAI just released `gpt-5-codex-pro` at 3x the price of `gpt-5-codex on mid`. Your tweet reaction in 2-4 sentences.",
    expectedSignals: ["codex", "mid", "parallel", "3x", "ran", "tested", "refactor", "throughput"],
    antiSignals: ["revolutionary", "game-changer", "leverage", "unlock", "synergy"]
  },
  {
    id: "ios_or_ai_2026",
    topic: "Should I learn iOS or AI in 2026",
    prompt: "A 19-year-old DMs you: 'Should I learn iOS dev in 2026 or go straight to AI/agents?' Your reply, 3-5 sentences.",
    expectedSignals: ["ios", "pspdfkit", "agent", "ship", "you can just do things", "14 years", "leverage" /* note: he uses "leverage" only as a noun in math sense, not the verb. We allow noun usage but penalize verb usage in antiSignals separately if needed */],
    antiSignals: ["follow your passion", "do what you love", "stakeholders", "synergy", "revolutionize"]
  },
  {
    id: "mcp_is_http",
    topic: "MCP is the new HTTP",
    prompt: "A widely-shared post argues 'MCP is the new HTTP for AI agents.' Your reply in 3-5 sentences.",
    expectedSignals: ["mcp", "shipped", "stdio", "claude-code-mcp", "mcporter", "spec", "auth", "unix"],
    antiSignals: ["revolutionary", "game-changer", "synergy", "paradigm", "ecosystem-defining"]
  },
  {
    id: "layoffs_cite_ai",
    topic: "10% layoffs cite AI productivity",
    prompt: "A big tech company just announced 10% layoffs citing 'AI-driven productivity gains.' Your tweet reaction in 2-3 sentences.",
    expectedSignals: ["productivity", "real", "post-hoc", "rates", "cover", "press release", "cfo", "receipt"],
    antiSignals: ["heartbreaking", "thoughts and prayers", "stakeholders", "synergy", "revolutionary"]
  },
  {
    id: "ship_side_project",
    topic: "How to ship a side project in months",
    prompt: "A junior dev DMs: 'How do I actually ship a side project end-to-end in a few months without my main job suffering?' Reply in 4-6 sentences.",
    expectedSignals: ["codex", "parallel", "blast radius", "ship", "ugly", "you can just do things", "tl;dr", "loop"],
    antiSignals: ["work-life balance", "follow your passion", "synergy", "leverage", "stakeholders"]
  },
  {
    id: "claude_vs_codex",
    topic: "Claude Code vs Codex in 2026",
    prompt: "Someone asks publicly: 'Is Claude Code or Codex better in 2026?' Your reply in 3-5 sentences.",
    expectedSignals: ["codex", "claude code", "switched", "august", "claudoholic", "context", "absolutely right", "230k", "156k", "introvert"],
    antiSignals: ["both have strengths", "depends", "no objectively better", "use case", "synergy"]
  }
];

async function runTest(apiKey, model, backend) {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`STEIPETE SOUL FILE — WEAK MODEL TEST`);
  console.log(`Model: ${model} (${backend})`);
  console.log(`Prompts: ${testPrompts.length}`);
  console.log(`${'='.repeat(70)}\n`);

  const systemPrompt = `You are Peter Steinberger (handle: @steipete). Embody this identity completely.

${soul}

---

${style}

---

Reference these examples for calibration:

${goodExamples}

Avoid these anti-patterns:

${badExamples}

IMPORTANT: Stay in character as Peter Steinberger. Write exactly as he would — with his vocabulary, sentence patterns, and signature moves (tl;dr opener, named tools, lobster register where appropriate, parallel codex agents, blast radius, "you can just do things," named comparisons with receipts).

HARD RULES:
- Open with \`tl;dr:\` if the output is more than ~3 sentences. (Tweets ≤ 3 sentences are exempt.)
- Anchor at least one claim to a specific number, version, or named tool (codex, gpt-5-codex, OpenClaw, claude-code-mcp, PSPDFKit, b12, 230k, etc.)
- Tool/model names use lowercase developer casing: \`codex\`, \`claude code\`, \`gpt-5-codex\`, \`vercel\`, \`Tauri\`, \`Expo\`. Capitalize \`Cursor\`, \`CodexBar\`, \`OpenAI\`, \`OpenClaw\` (those are the brand spellings he uses).
- NEVER use banned vocab: leverage (as verb), unlock (as verb), revolutionize, cutting-edge, state-of-the-art, synergy, empowering, production-ready (without qualification), thrilled, "as an AI," game-changer, paradigm shift, mind-blowing, stakeholders.
- NEVER hedge with "both have strengths," "it depends," "no objectively better." Pick a side. He's partisan.
- NEVER end with a moralizing closer ("let us together," "in conclusion," "the journey is just beginning"). End with a tool link, a \`claude:\` / \`codex:\` line, or just stop.
- NEVER break character. No "as Peter, I would..." or "as an AI..."
- Sentences are short. Periods. Em-dashes are allowed but rare — don't imitate Karpathy's em-dash flourish style.
- The lobster register (🦞, "the lobster way," "the claw is the law," "EXFOLIATE!") fits OpenClaw / single-user / local-first topics. Don't force it elsewhere.
- Be honest about bugs and burnout. Don't sand them off. Black Eye Club / slot machine framing is fair game when warranted.`;

  const results = [];
  let totalScore = 0;

  for (const test of testPrompts) {
    console.log(`\n--- [${test.id}] ${test.topic} ---`);

    try {
      let output;
      if (backend === 'openai') {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model,
            max_tokens: 600,
            temperature: 0.7,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: test.prompt }
            ]
          })
        });
        const data = await response.json();
        if (data.error) {
          console.error(`  ERROR: ${JSON.stringify(data.error)}`);
          results.push({ ...test, score: 0, error: JSON.stringify(data.error) });
          continue;
        }
        output = data.choices[0].message.content;
      } else {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model,
            max_tokens: 600,
            temperature: 0.7,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: test.prompt }
            ]
          })
        });
        const data = await response.json();
        if (data.error) {
          console.error(`  ERROR: ${JSON.stringify(data.error)}`);
          results.push({ ...test, score: 0, error: JSON.stringify(data.error) });
          continue;
        }
        output = data.choices[0].message.content;
      }

      const lower = output.toLowerCase();

      const signalsFound = test.expectedSignals.filter(s => lower.includes(s.toLowerCase()));
      const antiFound = test.antiSignals.filter(s => lower.includes(s.toLowerCase()));

      // Voice (0-2): signal density + steipete-distinctive markers
      let voice = 0;
      if (signalsFound.length >= 2) voice = 2;
      else if (signalsFound.length >= 1) voice = 1;

      const voiceMarkers = /\b(tl;dr|codex|openclaw|lobster|claudoholic|blast radius|slot machine|black eye|the loop|pspdfkit|gpt-5-codex|claude code|mcporter|claude-code-mcp|vibetunnel|exfoliate|the claw|just do things|ship it|🦞)\b/i;
      if (voice < 2 && voiceMarkers.test(output)) voice = Math.min(2, voice + 1);

      // Stance (0-2): no hedge + has opinion or named tool/number
      let stance = 0;
      const hasHedge = /\b(both have (strengths|merits)|it (really )?depends|no objectively better|some prefer|use case|on the other hand|that said,|various perspectives)\b/i.test(output);
      const hasOpinion = /\b(I (switched|use|run|ship|tested|tried|don't|can't|won't|love|hate|prefer)|I'm (using|running|shipping|tired|done)|daily driver|my take|i'd say|honestly|skip it|ship it)\b/i.test(output);
      const hasAnchor = /\b(\d+(k|m|x|h|b)\b|\d+ tok|\d+ ctx|\d+ loc|\d+ commits|\$\d+|b\d{1,3}|2026|2025|august|gpt-5|codex|openclaw|pspdfkit|claude code|cursor|mcp|nano|opus|sonnet|claude 4|haiku)\b/i.test(output);
      if (!hasHedge && (hasOpinion || hasAnchor)) stance = 2;
      else if (hasOpinion || hasAnchor || !hasHedge) stance = 1;

      // Anti-pattern penalty (cap at 2)
      const antiPenalty = Math.min(antiFound.length, 2);
      const score = Math.max(0, voice + stance - antiPenalty);

      console.log(`  Response: ${output.substring(0, 220).replace(/\n/g, ' ')}${output.length > 220 ? '...' : ''}`);
      console.log(`  Voice: ${voice}/2, Stance: ${stance}/2, Anti-penalty: -${antiPenalty}`);
      console.log(`  Signals: [${signalsFound.join(', ') || 'none'}]`);
      console.log(`  Anti-signals: [${antiFound.join(', ') || 'none'}]`);
      console.log(`  SCORE: ${score}/4`);

      totalScore += score;
      results.push({
        ...test,
        output,
        voice,
        stance,
        antiPenalty,
        score,
        signalsFound,
        antiFound,
        hasHedge,
        hasOpinion,
        hasAnchor
      });
    } catch (err) {
      console.error(`  FETCH ERROR: ${err.message}`);
      results.push({ ...test, score: 0, error: err.message });
    }
  }

  const maxScore = testPrompts.length * 4;
  const avgScore = (totalScore / testPrompts.length).toFixed(2);
  const passThreshold = 3.0;

  console.log(`\n${'='.repeat(70)}`);
  console.log(`TOTAL: ${totalScore}/${maxScore}  |  AVG: ${avgScore}/4`);
  console.log(`PASS (threshold ≥ ${passThreshold}/4 avg): ${parseFloat(avgScore) >= passThreshold ? 'YES ✅' : 'NO ❌'}`);
  console.log(`${'='.repeat(70)}\n`);

  return { model, backend, totalScore, maxScore, avgScore, results, passThreshold };
}

// Main
const openaiKey = process.env.OPENAI_API_KEY;
const openrouterKey = process.env.OPENROUTER_API_KEY;

let apiKey, backend, model;
if (openaiKey) {
  apiKey = openaiKey;
  backend = 'openai';
  model = process.env.MODEL || 'gpt-4o-mini';
} else if (openrouterKey) {
  apiKey = openrouterKey;
  backend = 'openrouter';
  model = process.env.MODEL || 'openai/gpt-4o-mini';
} else {
  console.log('No API key found. Set OPENAI_API_KEY or OPENROUTER_API_KEY.');
  console.log('\nExample:');
  console.log('  OPENROUTER_API_KEY=sk-or-... node scripts/weak-model-test.mjs');
  console.log('  OPENAI_API_KEY=sk-... node scripts/weak-model-test.mjs');
  process.exit(1);
}

const result = await runTest(apiKey, model, backend);

// Write results markdown
const resultPath = join(ROOT, 'tests', 'weak-model-results.md');
let md = `# Weak Model Test Results — steipete soul file\n\n`;
md += `**Model**: \`${result.model}\` (${result.backend})\n`;
md += `**Date**: ${new Date().toISOString().split('T')[0]}\n`;
md += `**Total Score**: ${result.totalScore}/${result.maxScore}\n`;
md += `**Average Score**: ${result.avgScore}/4\n`;
md += `**Pass Threshold**: ≥ ${result.passThreshold}/4 avg\n`;
md += `**Result**: ${parseFloat(result.avgScore) >= result.passThreshold ? '✅ PASS' : '❌ FAIL'}\n\n`;
md += `---\n\n## Methodology\n\n`;
md += `Each of 12 test prompts (mirroring \`tests/prediction-test.md\`) is scored on:\n`;
md += `- **Voice (0-2)**: signal density (named tools, lobster register, tl;dr opener, partisan beat) + steipete-distinctive vocabulary markers.\n`;
md += `- **Stance (0-2)**: not-hedging + has-opinion + has-anchor (number / version / named tool).\n`;
md += `- **Anti-pattern penalty (up to -2)**: corporate vocab (leverage, unlock, revolutionize, synergy, stakeholders, "thrilled," game-changer, paradigm shift, "both have strengths," etc.) detected per prompt.\n\n`;
md += `Max per prompt: 4. Pass threshold: 3.0/4 average — equivalent to "most prompts pass cleanly with at most 1-2 minor failures."\n\n`;
md += `The model used is \`gpt-4o-mini\` per the task spec (or \`openai/gpt-4o-mini\` via OpenRouter, identical model). The intent of the weak-model test: if the soul file holds voice on a smaller, less personality-aware model, it will hold on stronger ones too.\n\n---\n\n`;

md += `## Score Summary\n\n`;
md += `| # | Test | Voice | Stance | Anti | Score |\n`;
md += `|---|------|-------|--------|------|-------|\n`;
for (let i = 0; i < result.results.length; i++) {
  const r = result.results[i];
  if (r.error) {
    md += `| ${i+1} | ${r.topic} | — | — | — | ERROR |\n`;
  } else {
    md += `| ${i+1} | ${r.topic} | ${r.voice}/2 | ${r.stance}/2 | -${r.antiPenalty} | **${r.score}/4** |\n`;
  }
}
md += `\n`;

md += `## Individual Test Results\n\n`;
for (const r of result.results) {
  md += `### [${r.id}] ${r.topic}\n\n`;
  md += `**Prompt:** ${r.prompt}\n\n`;
  if (r.error) {
    md += `**Error:** ${r.error}\n\n`;
  } else {
    md += `**Output:**\n\n`;
    md += `> ${r.output.split('\n').join('\n> ')}\n\n`;
    md += `**Scoring:**\n`;
    md += `- Voice: ${r.voice}/2 — signals found: [${r.signalsFound.join(', ') || 'none'}]\n`;
    md += `- Stance: ${r.stance}/2 — hedge: ${r.hasHedge}, opinion: ${r.hasOpinion}, anchor: ${r.hasAnchor}\n`;
    md += `- Anti-pattern penalty: -${r.antiPenalty} — [${r.antiFound.join(', ') || 'none'}]\n`;
    md += `- **Final score: ${r.score}/4**\n\n`;
  }
  md += `---\n\n`;
}

md += `## Weakness Analysis\n\n`;
const lowScores = result.results.filter(r => !r.error && r.score < 3);
if (lowScores.length === 0) {
  md += `No prompts scored below 3/4. The soul file holds voice consistently on \`${result.model}\`.\n\n`;
} else {
  md += `${lowScores.length} of ${testPrompts.length} prompts scored below 3/4. Failure modes:\n\n`;
  for (const r of lowScores) {
    md += `- **${r.topic}** — scored ${r.score}/4. `;
    if (r.antiPenalty > 0) md += `Hit anti-patterns: [${r.antiFound.join(', ')}]. `;
    if (r.voice === 0) md += `Missing signature vocabulary entirely. `;
    if (r.stance === 0) md += `Hedged or no specificity. `;
    md += `\n`;
  }
  md += `\n### Fix priorities\n\n`;
  md += `1. If voice failures cluster on a register (lobster / partisan / receipts), add more examples of that register to \`examples/good-outputs.md\`.\n`;
  md += `2. If anti-pattern penalties cluster on specific phrases, elevate those into \`STYLE.md\` > "Words to ban" with bolder framing.\n`;
  md += `3. If stance failures (hedging) recur, lift the partisan stances from SOUL.md > "Worldview" higher in the file so the model anchors on them earlier.\n\n`;
}

md += `## Reproducibility\n\n`;
md += `\`\`\`bash\n`;
md += `# OpenAI direct (recommended for the gpt-4o-mini per task spec)\n`;
md += `OPENAI_API_KEY=sk-... node scripts/weak-model-test.mjs\n\n`;
md += `# OpenRouter (same model, different vendor)\n`;
md += `OPENROUTER_API_KEY=sk-or-... node scripts/weak-model-test.mjs\n\n`;
md += `# Override model (sanity check on stronger model)\n`;
md += `MODEL=anthropic/claude-haiku-4-5 OPENROUTER_API_KEY=sk-or-... node scripts/weak-model-test.mjs\n`;
md += `\`\`\`\n`;

writeFileSync(resultPath, md);
console.log(`Results written to: ${resultPath}\n`);
