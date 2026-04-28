<div align="center">
  <img src="assets/poltergeist-logo.png" alt="Poltergeist Logo" width="200">
  
  # Poltergeist 👻 - The ghost that keeps your builds fresh—universal hot reload & file watcher

<a href="https://nodejs.org"><img src="https://img.shields.io/badge/Node.js-24%2B-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js 24+"></a>
<a href="https://github.com/steipete/poltergeist"><img src="https://img.shields.io/badge/platforms-macOS%20%7C%20Linux%20%7C%20Windows-blue?style=for-the-badge" alt="Platforms"></a>
<a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" alt="MIT License"></a>
<a href="https://github.com/steipete/poltergeist/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/steipete/poltergeist/ci.yml?style=for-the-badge&logo=github&label=CI" alt="CI Status"></a>

**The ghost that keeps your builds fresh** 👻  
 A universal file watcher with auto-rebuild for any language or build system

</div>

Poltergeist is an AI-friendly universal file-watcher that auto-detects any project and rebuilds them as soon as a file has been changed. Think `pnpm run dev` for native apps, with automatic configuration, notifications and a smart build queue. It stands on the shoulders of [giants](https://facebook.github.io/watchman/) and fills the glue layer that's been missing.

Works on macOS, Linux, and Windows. Available as a standalone binary (no Node.js required) or npm package.

> **📖 Read the story behind Poltergeist**: [The Ghost That Keeps Your Builds Fresh](https://steipete.me/posts/2025/poltergeist-ghost-keeps-builds-fresh) - Learn how this tool was built using Claude Code and why it's designed to accelerate both human and AI development workflows.

## Installation

### Homebrew (macOS, ARM64)

```bash
brew tap steipete/tap
brew install steipete/tap/poltergeist
```

### npm (all platforms)

```bash
npm install -g @steipete/poltergeist
```

### Requirements

Poltergeist requires [Watchman](https://facebook.github.io/watchman/) to be installed:

- **macOS**: `brew install watchman`
- **Linux**: [Installation guide](https://facebook.github.io/watchman/docs/install#linux)
- **Windows**: [Chocolatey package](https://facebook.github.io/watchman/docs/install#windows) or manual install

Poltergeist offers both a **CLI tool** for universal development and a **native macOS app** for enhanced monitoring (coming soon).

## Features

- **Universal Target System**: Support for anything you can build - executables, app bundles, libraries, frameworks, tests, Docker containers, ...
- **Smart Execution Wrapper**: `polter` command that waits for a build to complete, then starts it
- **Real-time Build Output**: See build progress as it happens, no more waiting in the dark
- **Inline Error Diagnostics**: Build errors shown immediately with context and actionable suggestions
- **Manual Build Command**: Trigger builds explicitly with `poltergeist build [target]`
- **Automatic Recovery**: Recent build failures trigger automatic rebuild attempts
- **Efficient File Watching**: Powered by Facebook's Watchman with smart exclusions and performance optimization
- **Intelligent Build Prioritization**: Having multiple projects that share code? Poltergeist will compile the right one first, based on which files you edited in the past
- **Automatic Project Configuration**: Just type `poltergeist init` and it'll parse your folder and set up the config.
- **Native Notifications**: System notifications with customizable sounds and icon for build status
- **Concurrent Build Protection**: Intelligent locking prevents overlapping builds
- **Advanced State Management**: Process tracking, build history, and heartbeat monitoring
- **Automatic Configuration Reloading**: Changes to `poltergeist.config.json` are detected and applied without manual restart

## Quick Start

### Installation

Install globally via npm:

```bash
npm install -g @steipete/poltergeist
```

### Basic Usage

1. **Automatic Configuration** - Let Poltergeist analyze your project:

```bash
poltergeist init
```

For CMake projects you can opt out of auto-configuring a build directory:

```bash
poltergeist init --cmake --cmake-no-configure
```

This preserves existing build trees and avoids running `cmake -B` automatically; targets are still detected from `CMakeLists.txt` and any existing build directory.

If a build directory already exists (e.g. `build/CMakeCache.txt`), Poltergeist will read it to infer the generator and targets without reconfiguring.

This automatically detects your project type (Swift, Node.js, Rust, Python, CMake, etc.) and creates an optimized configuration.

2. **Start Watching** - Begin auto-building on file changes:

```bash
poltergeist haunt             # Runs as background daemon (default)
poltergeist status            # Check what's running
poltergeist status --verbose  # Show detailed status with build stats
```

3. **Execute Fresh Builds** - Use `polter` to ensure you never run stale code:

```bash
polter my-app            # Waits for build, then runs fresh binary
polter my-app --help     # All arguments passed through
```

That's it! Poltergeist now watches your files and rebuilds automatically.

Each project gets its own background process, but `poltergeist status` shows everything through a shared state system in `/tmp/poltergeist/`. One project crashing never affects others.

### Live Status Panel

Need a full-screen dashboard? Run `poltergeist status panel` (or `poltergeist panel`) to launch the Ink-based status panel. It keeps targets, git metrics, and log tails visible, plus:

- **Adaptive git summaries**: Poltergeist polls `git status`/`git diff` every 5 s and either lists dirty files or—when `--git-mode ai` or `POLTERGEIST_GIT_MODE=ai` is set—shows a Claude-generated summary of the most important diffs.
- **Status scripts**: Each project can list lightweight health checks under `statusScripts`. Peekaboo, for example, prints `SwiftLint: 0 errors / 0 warnings [31s]` under the `peekaboo` target so you can spot lint regressions instantly.
- **Post-build tests**: Targets can declare `postBuild` commands that run automatically after a successful build; the panel renders their summaries (for example `Swift tests: success [2m]`) as second lines under the target.
- **Log-aware layout**: Selecting a target scrolls its log tail into view and the controls bar stays pinned to the last row, keeping the terminal clean.

See [docs/panel.md](docs/panel.md) for configuration details and troubleshooting tips (this is the status panel tracker the team keeps up-to-date).

## Hot Reload for Apps

Poltergeist can power hot-reload loops for native apps, backends, and hybrid workspaces. The daemon handles rebuilds while `polter` relaunches binaries only after they are fresh.

1. **Auto-detect your build targets**

   ```bash
   poltergeist init --auto
   ```

   Review the generated `poltergeist.config.json`. For app bundles or servers, ensure the target’s `buildCommand` compiles your artifact and the `outputPath` points at the produced binary or bundle root.

2. **Keep the daemon running**

   ```bash
   poltergeist haunt
   ```

   The watcher streams filesystem changes to Watchman, debounces noisy saves, and queues builds smartly across multiple targets.

3. **Launch through `polter`**

   ```bash
   polter my-app --some-flag
   ```

   `polter` waits for the daemon to finish rebuilding, then execs the binary. Rerun the command whenever you want to relaunch; builds that finish while the app is running are immediately available.

4. **Wire into app-specific reload hooks (optional)**
   - Swift/Xcode: enable a target that builds your `.app` bundle, then use scripts or plugins that monitor the bundle for relaunch.
   - Electron/Web backends: chain commands (e.g., `buildCommand: "pnpm build && touch tmp/restart.txt"`) so your framework’s watcher restarts automatically.
   - Mobile simulators or embedded devices: point `outputPath` at the packaged artifact and use post-build scripts to deploy.

Configuration tips:

- Tune `settlingDelay` and `debounceInterval` per target to avoid double rebuilds for large asset drops.
- Inject environment variables under the target’s `environment` block (e.g., `SWIFT_HOT_RELOAD=1`) so your app enables its live-update code paths.
- Add multiple enabled targets (UI, backend, integration tests). Poltergeist applies per-target priorities and rebuilds whichever a change touches first.

## Designed for Humans and Agents

Poltergeist rebuilds in the background from the moment files change, so humans and coding agents can rely on `polter <target>` to run fresh binaries without bespoke scripting. Aliases (`start`/`haunt`), fuzzy target matching, and inline error reporting keep command usage predictable. For detailed agent playbooks, timeout strategies, and log streaming tips, see [docs/agent-workflows.md](docs/agent-workflows.md).

## Learn More

- [CLI reference](docs/cli-reference.md)
- [Configuration guide](docs/configuration.md)
- [Agent workflows](docs/agent-workflows.md)
- [Architecture overview](docs/architecture.md)
- [Examples & E2E notes](docs/test-e2e.md)

## Development

### Prerequisites

- **Node.js 24+** for CLI development
- **Xcode 26+** for macOS app development
- **Watchman** for file watching

### CLI Development

```bash
# Build from source
git clone https://github.com/steipete/poltergeist.git
cd poltergeist && pnpm install && pnpm run build

# Development commands
pnpm test                   # Run tests
pnpm run dev                # Auto-rebuild mode
pnpm run lint               # Code quality checks
pnpm run typecheck          # Type validation
```

### macOS App Development

```bash
# Navigate to macOS app
cd apps/mac

# Build and run
xcodebuild -project Poltergeist.xcodeproj -scheme Poltergeist build
open Poltergeist.xcodeproj

# Code quality
./scripts/lint.sh           # SwiftLint checks
./scripts/format.sh         # swift-format fixes
```

### CI/CD Pipeline

Our comprehensive CI/CD pipeline ensures code quality across both platforms:

- **Multi-platform testing**: Node.js 24 on Ubuntu, macOS, and Windows
- **Swift 6 validation**: Strict concurrency checking and modern Swift practices
- **Code quality**: SwiftLint, swift-format, Biome, and TypeScript checks
- **Automated releases**: Dual-platform releases with both CLI (.tgz) and macOS app (.dmg/.zip)
- **Test coverage**: Comprehensive coverage reporting with Codecov

<details>
<summary>Project structure and contributing guidelines</summary>

### Project Structure

```
poltergeist/
├── src/
│   ├── builders/           # Target-specific builders
│   ├── cli.ts             # Command line interface
│   ├── poltergeist.ts     # Core application logic
│   ├── priority-engine.ts # Intelligent priority scoring
│   ├── build-queue.ts     # Smart build queue management
│   ├── state.ts           # State management system
│   └── watchman.ts        # Watchman file watching
├── test/                  # Vitest test files
└── dist/                  # Compiled JavaScript output
```

### Contributing

Contributions welcome! Requirements:

1. Tests pass: `pnpm test`
2. Code formatted: `pnpm run format`
3. Linting passes: `pnpm run lint`
4. Types check: `pnpm run typecheck`

### Development Philosophy

- **No backwards compatibility**: Clean breaks over legacy support
- **Type safety first**: Compile-time safety over runtime flexibility
- **Performance over features**: Optimize for large projects
- **Simple over complex**: Clean APIs over extensive configuration

</details>

## Changelog

For detailed information about releases, bug fixes, and improvements, see [CHANGELOG.md](CHANGELOG.md).

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Author

Created and maintained by [Peter Steinberger](https://github.com/steipete)

## Acknowledgments

Built with these excellent open source projects:

### Core Dependencies

- **[Watchman](https://facebook.github.io/watchman/)** - Facebook's efficient file watching service
- **[Commander.js](https://github.com/tj/commander.js)** - Complete CLI framework
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation with static type inference
- **[Winston](https://github.com/winstonjs/winston)** - Universal logging library with support for multiple transports

### Build & Development

- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript with syntax for types
- **[Vitest](https://vitest.dev/)** - Blazing fast unit test framework
- **[Biome](https://biomejs.dev/)** - Fast formatter and linter for JavaScript, TypeScript, and more
- **[TSX](https://github.com/privatenumber/tsx)** - TypeScript execute and REPL for Node.js
- **[TypeDoc](https://typedoc.org/)** - Documentation generator for TypeScript projects

### User Experience

- **[Chalk](https://github.com/chalk/chalk)** - Terminal string styling done right
- **[Ora](https://github.com/sindresorhus/ora)** - Elegant terminal spinners
- **[Node Notifier](https://github.com/mikaelbr/node-notifier)** - Cross-platform native notifications

### Utilities

- **[Picomatch](https://github.com/micromatch/picomatch)** - Blazing fast and accurate glob matcher
- **[Write File Atomic](https://github.com/npm/write-file-atomic)** - Write files atomically and reliably
- **[fb-watchman](https://github.com/facebook/watchman)** - JavaScript client for Facebook's Watchman service

### Special Thanks

- All contributors and users who have helped shape Poltergeist
- The open source community for creating these amazing tools

---

<div align="center">
  <strong>Keep your builds fresh with Poltergeist</strong>
</div>

