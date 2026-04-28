# Vibe Meter

A beautiful, native macOS menu bar application that helps you track your monthly AI spending with real-time monitoring and smart notifications.

## ✨ Features

- **📊 Real-time Spending Tracking** - Monitor your AI service costs directly from your menu bar
- **🔄 Multi-Provider Support** - Supports Cursor AI and Claude with extensible architecture for future services
- **🎭 Claude Integration** - Track Claude usage via local log file analysis with 5-hour window quota monitoring
- **💰 Multi-Currency Support** - View spending in USD, EUR, GBP, JPY, and 20+ other currencies
- **🔔 Smart Notifications** - Customizable spending limit alerts to keep you on budget
- **🎨 Animated Gauge Display** - Beautiful visual indicator showing spending progress
- **🔐 Secure Authentication** - Safe login via provider's official web authentication
- **⚡ Lightweight & Native** - Built with Swift 6, optimized for performance and battery life
- **🔄 Auto-Updates** - Secure automatic updates with EdDSA signature verification
- **🌓 Dark Mode Support** - Seamlessly adapts to your system appearance
- **🖱️ Right-Click Menu** - Quick access to settings and actions via context menu
- **📊 Enhanced UI** - Professional cost table with centered icons and full-width progress bars

## 🚀 Quick Start

1. **Download Vibe Meter** from the [latest release](https://github.com/steipete/VibeMeter/releases)
2. **Install** by dragging Vibe Meter.app to your Applications folder
3. **Launch** and click the menu bar icon to get started
4. **Login** to your Cursor AI account when prompted
5. **Configure** spending limits and currency preferences in Settings

## 📋 Requirements

- **macOS 15.0** or later (Sequoia)
- **Cursor AI account** (free or paid) and/or **Claude** (desktop or VS Code extension)
- **Internet connection** for real-time data sync

## 🎯 How It Works

Vibe Meter monitors your AI service usage through different methods:

### Cursor AI
- **Secure Login** - Connects via official web authentication
- **API Integration** - Fetches usage data directly from Cursor's servers
- **Automatic Sync** - Updates spending data every 5 minutes

### Claude
- **Local Log Analysis** - Reads usage data from `~/.claude/projects/` with your permission
- **No Login Required** - Select your account type (Free/Pro) in settings
- **5-Hour Window Tracking** - Monitors Claude Pro's rolling quota in real-time
- **Token Counting** - Uses OpenAI's o200k_base encoding for accurate calculations

### All Providers
- **Visual Indicators** - Gauge fills up as you approach your spending limits
- **Progress Notifications** - Alerts at 80% and 100% of your warning threshold
- **Currency Conversion** - Real-time exchange rates for accurate international tracking

### 📊 Gauge Behavior

The gauge icon in the menu bar has two display modes:

#### Total Spending Mode (Default)
- **No Money Spent** - When you haven't spent any money yet (but have used requests), the gauge shows the percentage of API requests used. For example, if you've used 3 out of 500 requests, the gauge shows 0.6% filled.
- **Money Spent** - Once you start spending money, the gauge switches to show spending as a percentage of your upper limit. For example, if you've spent $15 out of a $30 limit, the gauge shows 50% filled.

#### Claude Quota Mode (Optional)
- **5-Hour Window** - For Claude Pro users, the gauge can show your remaining quota in the 5-hour rolling window
- **Real-time Updates** - The gauge updates as you use Claude, showing how much of your quota remains
- **Toggle in Settings** - Switch between spending and quota display modes in General Settings

This intelligent behavior ensures the gauge always provides meaningful feedback about your usage, whether you're tracking overall spending or Claude's specific quota limits.

## 🧪 Testing & Code Coverage

VibeMeter maintains comprehensive test coverage to ensure reliability:

### Running Tests
```bash
# Run all tests
xcodebuild test -workspace VibeMeter.xcworkspace -scheme VibeMeter

# Run tests with code coverage
./scripts/generate-coverage-report.sh

# Generate HTML coverage report and open it
./scripts/generate-coverage-report.sh --html --open

# Enforce minimum coverage threshold
./scripts/generate-coverage-report.sh --min-coverage 70
```

### Test Coverage
- **Current Coverage**: ~80-85%
- **Test Files**: 40+ test suites
- **Test Categories**:
  - Unit tests for business logic
  - Integration tests for provider workflows
  - UI component tests (with ViewInspector)
  - Performance benchmarks

### Continuous Integration
Code coverage is automatically generated and reported on all pull requests via GitHub Actions.

## ⚙️ Configuration

### Spending Limits
- **Warning Limit** - Get notified when you reach 80% (default: $20)
- **Upper Limit** - Maximum threshold for visual indicators (default: $30)

### Display Options
- **Show Cost in Menu Bar** - Toggle cost display next to the icon
- **Currency Selection** - Choose from 20+ supported currencies
- **Notification Preferences** - Customize alert frequency and triggers
- **Gauge Representation** - Choose between total spending or Claude quota display
- **Claude Account Type** - Select Free or Pro for accurate cost calculations

## 🛠️ Development

Want to contribute? Vibe Meter is built with modern Swift technologies:

### Tech Stack
- **Swift 6** with strict concurrency
- **SwiftUI** for settings and UI components
- **AppKit** for menu bar integration
- **@Observable** for reactive data flow
- **Tuist** for project generation

### Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/steipete/VibeMeter.git
   cd VibeMeter
   ```

2. **Install Tuist:**
   ```bash
   curl -Ls https://install.tuist.io | bash
   ```

3. **Generate and open project:**
   ```bash
   ./scripts/generate-xcproj.sh
   ```

4. **Build and run:**
   - Open `VibeMeter.xcworkspace` in Xcode
   - Select the VibeMeter scheme and press ⌘R

### Key Commands

```bash
# Code formatting
./scripts/format.sh

# Linting
./scripts/lint.sh

# Run tests
xcodebuild -workspace VibeMeter.xcworkspace -scheme VibeMeter -configuration Debug test

# Build release
./scripts/build.sh
```

## 🚀 Release Management

VibeMeter uses a sophisticated release system supporting both stable and pre-release versions with automatic updates.

### Release Types

- **🟢 Stable Releases** - Production-ready versions for all users
- **🟡 Pre-releases** - Beta, alpha, and release candidate versions for early testing
- **⚙️ Update Channels** - Users can choose between stable-only or include pre-releases

### Creating Releases

#### Version Management

Use the version management script to bump versions:

```bash
# Show current version
./scripts/version.sh --current

# Bump version types
./scripts/version.sh --patch        # 0.9.1 -> 0.9.2
./scripts/version.sh --minor        # 0.9.1 -> 0.10.0  
./scripts/version.sh --major        # 0.9.1 -> 1.0.0

# Create pre-release versions
./scripts/version.sh --prerelease beta    # 0.9.2 -> 0.9.2-beta.1
./scripts/version.sh --prerelease alpha   # 0.9.2 -> 0.9.2-alpha.1
./scripts/version.sh --prerelease rc      # 0.9.2 -> 0.9.2-rc.1

# Set specific version
./scripts/version.sh --set 1.0.0

# Bump build number only
./scripts/version.sh --build
```

#### Creating Releases

First check if everything is ready:

```bash
./scripts/preflight-check.sh
```

Then use the automated release script:

```bash
# Create stable release
./scripts/release.sh stable

# Create pre-releases  
./scripts/release.sh beta 1     # Creates beta.1
./scripts/release.sh alpha 2    # Creates alpha.2
./scripts/release.sh rc 1       # Creates rc.1
```

#### Complete Release Workflow

1. **Check Release Readiness:**
   ```bash
   ./scripts/preflight-check.sh
   ```

2. **Update Version:**
   ```bash
   # Bump version (choose appropriate type)
   ./scripts/version.sh --patch
   
   # Also increment build number in Project.swift
   # Edit: "CURRENT_PROJECT_VERSION": "201" -> "202"
   
   # Commit version bump
   git add Project.swift
   git commit -m "Bump version to 0.9.2"
   ```

3. **Create Release:**
   ```bash
   # For stable release
   ./scripts/release.sh stable
   
   # For pre-release
   ./scripts/release.sh beta 1
   ```

The automated script handles building, signing, notarization, DMG creation, GitHub release, appcast updates, and git commits.

### Update Channels

VibeMeter supports two update channels via Sparkle:

- **Stable Only**: Users receive only production-ready releases
- **Include Pre-releases**: Users receive both stable and pre-release versions

Users can switch channels in **Settings → General → Update Channel**.

#### Automatic Channel Detection

VibeMeter automatically detects the appropriate update channel based on the build type:

- **Beta Downloads**: When users download a beta version (e.g., v1.0.0-beta.5), the app automatically defaults to the "Include Pre-releases" channel
- **Stable Downloads**: When users download a stable version (e.g., v1.0.0), the app defaults to the "Stable Only" channel

This is implemented via the `IS_PRERELEASE_BUILD` flag system:

1. **Build-time Flag**: The release script sets `IS_PRERELEASE_BUILD=YES` for beta builds during compilation
2. **Runtime Detection**: The app checks this flag in its Info.plist to determine the default update channel
3. **Fallback Logic**: If the flag is missing, it falls back to parsing the version string for keywords like "beta", "alpha", "rc"

**Technical Implementation:**
- Flag is set in `Project.swift`: `"IS_PRERELEASE_BUILD": "$(IS_PRERELEASE_BUILD)"`
- Checked in `UpdateChannel.defaultChannel()` method
- Release script automatically sets the environment variable during build

### Pre-release Testing

Pre-releases are perfect for:

- **🧪 Beta Testing** - Get early access to new features
- **🐛 Bug Reporting** - Help identify issues before stable release  
- **📝 Feedback** - Provide input on new functionality
- **⚡ Early Adoption** - Stay on the cutting edge

To participate:
1. Download VibeMeter
2. Go to Settings → General → Update Channel
3. Select "Include Pre-releases"
4. Check for updates to get the latest pre-release

### Release Scripts

| Script | Purpose | Usage |
|--------|---------|-------|
| `preflight-check.sh` | Validate release readiness | `./scripts/preflight-check.sh` |
| `release.sh` | Automated release process | `./scripts/release.sh stable` |
| `version.sh` | Version management | `./scripts/version.sh --patch` |
| `update-appcast.sh` | Update appcast files | `./scripts/update-appcast.sh 0.9.2 3 dmg-path` |
| `verify-app.sh` | Verify app signing/notarization | `./scripts/verify-app.sh VibeMeter.app` |
| `verify-appcast.sh` | Validate appcast files | `./scripts/verify-appcast.sh` |

## 🏗️ Architecture

Vibe Meter follows clean architecture principles:

- **Multi-Provider System** - Extensible design for supporting multiple AI services
- **Reactive State Management** - Modern `@Observable` data flow with SwiftUI integration
- **Service Layer** - Modular services for API clients, authentication, and notifications
- **Protocol-Oriented Design** - Extensive use of protocols for testability and flexibility

## 🙏 Acknowledgments

- **Cost Calculation** - Thanks to [ryoppippi/ccusage](https://github.com/ryoppippi/ccusage) for helping with Claude cost calculation logic
- **UI Inspiration** - Special thanks to [Iamshankhadeep/ccseva](https://github.com/Iamshankhadeep/ccseva) for the enhanced dashboard design inspiration

## 🔐 Privacy & Security

- **Local Authentication** - Login credentials never stored, uses secure web authentication
- **Encrypted Storage** - Sensitive data protected using macOS Keychain
- **No Tracking** - Vibe Meter doesn't collect any analytics or usage data
- **Secure Updates** - All updates cryptographically signed and verified

## 🤝 Contributing

We welcome contributions! When contributing to Vibe Meter:

- Follow Swift 6 best practices with strict concurrency
- Use the provided formatting script: `./scripts/format.sh`
- Ensure all tests pass before submitting
- Update documentation for significant changes

## 📖 Documentation

- [Architecture Overview](docs/MODERN-ARCHITECTURE.md)
- [Release Process](docs/RELEASE.md)
- [Code Signing Setup](docs/SIGNING-AND-NOTARIZATION.md)
- [CI/CD Pipeline](docs/CI-SETUP.md)

## 🐛 Support

Found a bug or have a feature request?

1. Check [existing issues](https://github.com/steipete/VibeMeter/issues)
2. Create a [new issue](https://github.com/steipete/VibeMeter/issues/new) with details
3. For urgent issues, mention [@steipete](https://twitter.com/steipete) on Twitter

## 🎉 Roadmap

**Current Status (v0.9.x):** Feature-complete beta with Cursor AI support, preparing for v1.0 release

**Version 1.0:**
- Production-ready release with full Cursor AI integration
- Comprehensive testing and stability improvements
- Enhanced error handling and user feedback

**Version 1.x:**
- Additional AI service providers (OpenAI, Anthropic, etc.)
- Enhanced analytics and spending insights
- Team usage tracking for organizations
- Export functionality for financial records

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 👨‍💻 About

Created by [Peter Steinberger](https://steipete.com) ([@steipete](https://twitter.com/steipete))

Read about the development process: [Building a native macOS app with AI](https://steipete.com/posts/vibemeter/)

**Made with ❤️ in Vienna, Austria**
