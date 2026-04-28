#!/usr/bin/env bash
# =============================================================================
# steipete Soul File — Data Pipeline
# =============================================================================
# Reproducible fetcher for Peter Steinberger's public corpus:
#   - Blog posts (steipete.me)
#   - GitHub repo READMEs / VISION.md / AGENTS.md
#   - Podcast / talk transcripts (via yt-dlp)
#   - X/Twitter (via separate scripts/pull-x.mjs — needs SURF_AI_API_KEY)
#
# Idempotent — skips already-cached files.
#
# Usage:
#   bash scripts/fetch-data.sh
#
# Dependencies:
#   - curl (required)
#   - yt-dlp (optional, for transcripts; install: brew install yt-dlp)
#   - node (optional, for X corpus via scripts/pull-x.mjs)
# =============================================================================

set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DATA="$ROOT/data"

mkdir -p "$DATA/writing" "$DATA/transcripts" "$DATA/x" "$DATA/github"

echo "=== steipete Data Pipeline ==="
echo "Output: $DATA"
echo ""

# -----------------------------------------------------------------------------
# 1. Blog posts from steipete.me
# -----------------------------------------------------------------------------
echo "--- Fetching blog posts (steipete.me) ---"

# Each entry is "slug|url" — slug is the local filename (without .html).
BLOG_POSTS=(
  "2012-dont-call-willchangevalueforkey|https://steipete.me/posts/2012/dont-call-willchangevalueforkey"
  "2012-hacking-block-support-into-uimenuitem|https://steipete.me/posts/2012/hacking-block-support-into-uimenuitem"
  "2012-moving-on|https://steipete.me/posts/2012/moving-on"
  "2012-nsurlcache-uses-a-disk-cache-as-of-ios5|https://steipete.me/posts/2012/nsurlcache-uses-a-disk-cache-as-of-ios5"
  "2012-pimping-recursivedescription|https://steipete.me/posts/2012/pimping-recursivedescription"
  "2012-reboot|https://steipete.me/posts/2012/reboot"
  "2012-using-subscripting-with-xcode-4_4-and-ios-4_3|https://steipete.me/posts/2012/using-subscripting-with-xcode-4-4-and-ios-4-3"
  "2014-a-story-about-swizzling-the-right-way-and-touch-forwarding|https://steipete.me/posts/2014/a-story-about-swizzling-the-right-way-and-touch-forwarding"
  "2025-applescript-cli-macos-complete-guide|https://steipete.me/posts/2025/applescript-cli-macos-complete-guide"
  "2025-automatic-observation-tracking-uikit-appkit|https://steipete.me/posts/2025/automatic-observation-tracking-uikit-appkit"
  "2025-claude-code-anonymous|https://steipete.me/posts/2025/claude-code-anonymous"
  "2025-claude-code-is-my-computer|https://steipete.me/posts/2025/claude-code-is-my-computer"
  "2025-code-signing-and-notarization-sparkle-and-tears|https://steipete.me/posts/2025/code-signing-and-notarization-sparkle-and-tears"
  "2025-commanding-your-claude-code-army|https://steipete.me/posts/2025/commanding-your-claude-code-army"
  "2025-essential-reading|https://steipete.me/posts/2025/essential-reading"
  "2025-essential-reading-august-2025|https://steipete.me/posts/2025/essential-reading-august-2025"
  "2025-essential-reading-july-2025|https://steipete.me/posts/2025/essential-reading-july-2025"
  "2025-finding-my-spark-again|https://steipete.me/posts/2025/finding-my-spark-again"
  "2025-introducing-demark-html-to-markdown-in-swift|https://steipete.me/posts/2025/introducing-demark-html-to-markdown-in-swift"
  "2025-live-coding-session-building-arena|https://steipete.me/posts/2025/live-coding-session-building-arena"
  "2025-llm-codes-transform-developer-docs|https://steipete.me/posts/2025/llm-codes-transform-developer-docs"
  "2025-logging-privacy-shenanigans|https://steipete.me/posts/2025/logging-privacy-shenanigans"
  "2025-mcp-best-practices|https://steipete.me/posts/2025/mcp-best-practices"
  "2025-migrating-700-tests-to-swift-testing|https://steipete.me/posts/2025/migrating-700-tests-to-swift-testing"
  "2025-optimal-ai-development-workflow|https://steipete.me/posts/2025/optimal-ai-development-workflow"
  "2025-peekaboo-2-freeing-the-cli-from-its-mcp-shackles|https://steipete.me/posts/2025/peekaboo-2-freeing-the-cli-from-its-mcp-shackles"
  "2025-peekaboo-mcp-lightning-fast-macos-screenshots-for-ai-agents|https://steipete.me/posts/2025/peekaboo-mcp-lightning-fast-macos-screenshots-for-ai-agents"
  "2025-poltergeist-ghost-keeps-builds-fresh|https://steipete.me/posts/2025/poltergeist-ghost-keeps-builds-fresh"
  "2025-self-hosting-ai-models|https://steipete.me/posts/2025/self-hosting-ai-models"
  "2025-shipping-at-inference-speed|https://steipete.me/posts/2025/shipping-at-inference-speed"
  "2025-showing-settings-from-macos-menu-bar-items|https://steipete.me/posts/2025/showing-settings-from-macos-menu-bar-items"
  "2025-signature-flicker|https://steipete.me/posts/2025/signature-flicker"
  "2025-startup-slop|https://steipete.me/posts/2025/startup-slop"
  "2025-stats-store-privacy-first-sparkle-analytics|https://steipete.me/posts/2025/stats-store-privacy-first-sparkle-analytics"
  "2025-stop-overthinking-ai-subscriptions|https://steipete.me/posts/2025/stop-overthinking-ai-subscriptions"
  "2025-the-future-of-vibe-coding|https://steipete.me/posts/2025/the-future-of-vibe-coding"
  "2025-understanding-codebases-with-ai-gemini-workflow|https://steipete.me/posts/2025/understanding-codebases-with-ai-gemini-workflow"
  "2025-vibe-meter-2-claude-code-usage-calculation|https://steipete.me/posts/2025/vibe-meter-2-claude-code-usage-calculation"
  "2025-vibe-meter-monitor-your-ai-costs|https://steipete.me/posts/2025/vibe-meter-monitor-your-ai-costs"
  "2025-vibetunnel-first-anniversary|https://steipete.me/posts/2025/vibetunnel-first-anniversary"
  "2025-vibetunnel-turn-any-browser-into-your-mac-terminal|https://steipete.me/posts/2025/vibetunnel-turn-any-browser-into-your-mac-terminal"
  "2025-when-ai-meets-madness-peters-16-hour-days|https://steipete.me/posts/2025/when-ai-meets-madness-peters-16-hour-days"
  "2026-openclaw|https://steipete.me/posts/2026/openclaw"
  "command-your-claude-code-army-reloaded|https://steipete.me/posts/command-your-claude-code-army-reloaded"
  "just-one-more-prompt|https://steipete.me/posts/just-one-more-prompt"
  "just-talk-to-it|https://steipete.me/posts/just-talk-to-it"
)

for entry in "${BLOG_POSTS[@]}"; do
  slug="${entry%%|*}"
  url="${entry##*|}"
  out="$DATA/writing/$slug.html"
  if [ -f "$out" ] && [ -s "$out" ]; then
    echo "  [skip] $slug"
    continue
  fi
  echo "  [fetch] $slug"
  curl -fsSL --max-time 30 "$url" -o "$out" || echo "    ⚠ failed: $url"
done

# Index page (lists posts)
[ -f "$DATA/writing/index.html" ] || curl -fsSL "https://steipete.me/" -o "$DATA/writing/index.html" || true

echo ""

# -----------------------------------------------------------------------------
# 2. GitHub repo content (README.md, VISION.md, AGENTS.md)
# -----------------------------------------------------------------------------
echo "--- Fetching GitHub READMEs ---"

# Each entry is: "owner/repo:filename"
GH_REPOS=(
  "openclaw/openclaw:README.md"
  "openclaw/openclaw:VISION.md"
  "steipete/poltergeist:README.md"
  "steipete/poltergeist:AGENTS.md"
  "steipete/Peekaboo:README.md"
  "steipete/CodexBar:README.md"
  "steipete/VibeMeter:README.md"
  "steipete/claude-code-mcp:README.md"
  "steipete/mcporter:README.md"
  "steipete/Tachikoma:README.md"
  "steipete/oracle:README.md"
  "steipete/birdclaw:README.md"
  "steipete/agent-rules:README.md"
  "steipete/agent-scripts:README.md"
  "steipete/InterposeKit:README.md"
  "steipete/Aspects:README.md"
)

for entry in "${GH_REPOS[@]}"; do
  repo="${entry%%:*}"
  file="${entry##*:}"
  owner="${repo%%/*}"
  name="${repo##*/}"
  out="$DATA/github/${owner}--${name}.${file%.md}.md"
  if [ -f "$out" ] && [ -s "$out" ]; then
    echo "  [skip] $repo:$file"
    continue
  fi
  echo "  [fetch] $repo:$file"
  # Try main, then master
  for branch in main master; do
    url="https://raw.githubusercontent.com/$repo/$branch/$file"
    if curl -fsSL --max-time 20 "$url" -o "$out" 2>/dev/null; then
      break
    fi
  done
  [ -f "$out" ] && [ -s "$out" ] || echo "    ⚠ failed (both main + master): $repo:$file"
done

echo ""

# -----------------------------------------------------------------------------
# 3. YouTube transcripts (yt-dlp)
# -----------------------------------------------------------------------------
echo "--- Fetching transcripts (yt-dlp) ---"

if ! command -v yt-dlp >/dev/null 2>&1; then
  echo "  ⚠ yt-dlp not installed — skipping. Install: brew install yt-dlp"
else
  # Each entry: "slug|youtube-url"
  TALKS=(
    "lex-fridman-491|https://www.youtube.com/watch?v=fr_HUgkVZmA"
    "lex-fridman-clip-ai-agents|https://www.youtube.com/watch?v=p2XOoSBPFhQ"
    "i-ship-code-i-dont-read|https://www.youtube.com/watch?v=fHWFF8Q-LSI"
    "first-public-appearance-since-launch|https://www.youtube.com/watch?v=q7l2yvuWhP4"
    "agentic-workflow-behind-openclaw|https://www.youtube.com/watch?v=lrhYeZuBDqg"
    "builders-unscripted-ep1|https://www.youtube.com/watch?v=BpIz7LJrKuo"
    "maximize-claude-code-subscription|https://www.youtube.com/watch?v=tFPj2pkuDrU"
    "3-lessons-you-can-use-today|https://www.youtube.com/watch?v=qg1NS_KWBEA"
  )

  for entry in "${TALKS[@]}"; do
    slug="${entry%%|*}"
    url="${entry##*|}"
    txtout="$DATA/transcripts/$slug.txt"
    if [ -f "$txtout" ] && [ -s "$txtout" ]; then
      echo "  [skip] $slug"
      continue
    fi
    echo "  [fetch] $slug"
    # Pull English subs (auto or manual), VTT format, then strip to plain text.
    tmpdir="$(mktemp -d)"
    yt-dlp --skip-download --write-auto-sub --write-sub --sub-lang en \
           --sub-format vtt -o "$tmpdir/$slug.%(ext)s" "$url" >/dev/null 2>&1 || true
    vtt="$(ls "$tmpdir"/*.vtt 2>/dev/null | head -1)"
    if [ -n "$vtt" ] && [ -f "$vtt" ]; then
      python3 - "$vtt" "$txtout" <<'PY' || true
import re, sys
src, dst = sys.argv[1], sys.argv[2]
with open(src, 'r', encoding='utf-8', errors='ignore') as f:
    raw = f.read()
# Strip VTT header, timecodes, tags, styling.
lines = []
for line in raw.splitlines():
    line = line.strip()
    if not line or line.startswith('WEBVTT') or '-->' in line or line.startswith('NOTE') or line.startswith('Kind:') or line.startswith('Language:'):
        continue
    if re.match(r'^\d+$', line):
        continue
    line = re.sub(r'<[^>]+>', '', line)
    if lines and lines[-1] == line:
        continue
    lines.append(line)
with open(dst, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))
PY
    fi
    rm -rf "$tmpdir"
    if [ -f "$txtout" ] && [ -s "$txtout" ]; then
      echo "    ✓ $(wc -l < "$txtout" | tr -d ' ') lines"
    else
      echo "    ⚠ failed: $url"
    fi
  done
fi

echo ""

# -----------------------------------------------------------------------------
# 4. X/Twitter corpus via surf-ai MCP
# -----------------------------------------------------------------------------
echo "--- X corpus (surf-ai MCP) ---"
if [ -n "${SURF_AI_API_KEY:-}" ] && [ -f "$ROOT/scripts/pull-x.mjs" ]; then
  echo "  [run] node scripts/pull-x.mjs"
  HANDLES="steipete,openclaw" SURF_AI_API_KEY="$SURF_AI_API_KEY" \
    node "$ROOT/scripts/pull-x.mjs" || echo "    ⚠ pull-x.mjs failed"
else
  echo "  [skip] set SURF_AI_API_KEY and ensure scripts/pull-x.mjs exists"
fi

echo ""
echo "=== Done ==="
echo "Wrote:"
echo "  $(ls "$DATA/writing"/*.html 2>/dev/null | wc -l | tr -d ' ') blog posts → $DATA/writing/"
echo "  $(ls "$DATA/github"/*.md 2>/dev/null | wc -l | tr -d ' ') GitHub files → $DATA/github/"
echo "  $(ls "$DATA/transcripts"/*.txt 2>/dev/null | wc -l | tr -d ' ') transcripts → $DATA/transcripts/"
echo "  $(ls "$DATA/x"/*.json 2>/dev/null | wc -l | tr -d ' ') X corpus files → $DATA/x/"
