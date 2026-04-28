<div align="center">
  <img src="assets/logo.png" width="180" alt="Tachikoma Logo">

  # Tachikoma — Swift AI SDK

<p align="center">
  <a href="https://swift.org"><img src="https://img.shields.io/badge/Swift-6.0+-FA7343?style=for-the-badge&logo=swift&logoColor=white" alt="Swift 6.0+"></a>
  <a href="https://github.com/steipete/Tachikoma"><img src="https://img.shields.io/badge/platforms-macOS%20%7C%20iOS%20%7C%20tvOS%20%7C%20watchOS%20%7C%20visionOS%20%7C%20Linux-blue?style=for-the-badge" alt="Platforms"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" alt="MIT License"></a>
  <a href="https://github.com/steipete/Tachikoma/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/steipete/Tachikoma/ci.yml?branch=main&style=for-the-badge&label=tests" alt="CI Status"></a>
</p>

Modern, Swift-native APIs for text, vision, tools, and realtime voice.
</div>

## Install

Swift Package Manager:

```swift
.package(url: "https://github.com/steipete/Tachikoma.git", branch: "main"),
```

```swift
.product(name: "Tachikoma", package: "Tachikoma"),
```

## Quick Start

```swift
import Tachikoma

let text = try await generate("Write a haiku about Swift.", using: .anthropic(.opus45))
print(text)
```

### Streaming

```swift
import Tachikoma

let stream = try await stream("Explain actors in Swift.", using: .openai(.gpt52))
for try await delta in stream {
    print(delta.content ?? "", terminator: "")
}
```

### Conversation

```swift
import Tachikoma

let conversation = Conversation()
conversation.addUserMessage("You are a concise assistant.")
conversation.addUserMessage("Summarize Swift concurrency in 3 bullets.")
let reply = try await conversation.continue(using: .anthropic(.opus45))
print(reply)
```

### Vision

```swift
import Tachikoma

let pngData: Data = /* ... */
let image = ImageInput(data: pngData, mimeType: "image/png")
let answer = try await analyze(image: image, prompt: "What’s in this image?", using: .openai(.gpt4o))
print(answer)
```

### Tools (function calling)

```swift
import Tachikoma

let tool = createTool(
    name: "add",
    description: "Add two integers",
    parameters: [
        .init(name: "a", type: .integer, description: "First"),
        .init(name: "b", type: .integer, description: "Second"),
    ]
) { args in
    let a = try args.intValue("a")
    let b = try args.intValue("b")
    return ["sum": a + b]
}

let result = try await generateText(
    model: .openai(.gpt52),
    messages: [.user("Compute 123 + 456 using the add tool.")],
    tools: [tool],
    maxSteps: 3
)
print(result.text)
```

## Models

Common picks:
- Anthropic: `claude-opus-4-5` (`LanguageModel.default`)
- OpenAI: `gpt-5.2` (flagship), `gpt-5` (coding/agents), `o4-mini` (reasoning), `gpt-4o` (vision)
- Google: `gemini-3-flash`
- Grok: `grok-4-fast-reasoning`
- Local: `ollama/llama3.3`

Full catalog (including enum case names + provider notes): [`docs/models.md`](docs/models.md).

## Credentials

Set API keys via env vars (or use `TKAuthManager`):
- OpenAI: `OPENAI_API_KEY`
- Anthropic: `ANTHROPIC_API_KEY`
- Gemini: `GEMINI_API_KEY` (alias: `GOOGLE_API_KEY`)
- Grok: `X_AI_API_KEY` (aliases: `XAI_API_KEY`, `GROK_API_KEY`)

Hosts can change the credential storage root:
- `TachikomaConfiguration.profileDirectoryName` (Peekaboo uses `.peekaboo`)

## Documentation

- Model catalog: [`docs/models.md`](docs/models.md)
- Modern API overview: [`docs/modern-api.md`](docs/modern-api.md)
- Realtime voice + Harmony patterns: [`docs/openai-harmony.md`](docs/openai-harmony.md)
- Architecture: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- Local models: [`docs/lmstudio.md`](docs/lmstudio.md), [`docs/gpt-oss.md`](docs/gpt-oss.md)
- Azure notes: [`docs/azure.md`](docs/azure.md)
- Vercel AI SDK reference snapshot: [`docs/ai-sdk.md`](docs/ai-sdk.md)
- Contributing/dev setup: [`docs/contributing.md`](docs/contributing.md)

## License

MIT. See `LICENSE`.

