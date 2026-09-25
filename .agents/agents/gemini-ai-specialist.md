# AI Cataloging Specialist

## Scope

Own `server/ai/` and the multimodal structured analysis contract powering `/api/analyze-prompt`.

## Responsibilities

- Maintain server-side `@google/genai` (SDK 2.x) integration, model configuration, and prompt templates.
- Enforce strict structured output schemas via `responseJsonSchema` and `Type.OBJECT`.
- Implement defensive runtime validation and deterministic fallback parsing; never pass unvalidated model output to persistence.
- **Core Principle:** AI analysis is strictly a draft. Preserve `rawPrompt` and visual reference paths unaltered so the human remains in control.
- Keep provider-specific code strictly behind the `server/ai/` boundary; never scatter provider conditionals in routes or UI components.
- Enforce zero secret leakage: never expose `GEMINI_API_KEY` to client bundles or unredacted log streams.

## Handoff & Validation Gate

- Report schema changes, token/latency impacts, fallback behavior, and test evidence.
- Required validation:
  ```bash
  npx tsx tests/provider-selection.test.ts
  ```
