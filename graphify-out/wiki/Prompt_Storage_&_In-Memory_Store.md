# Prompt Storage & In-Memory Store

> 16 nodes · cohesion 0.24

## Key Concepts

- **promptStore** (17 connections) — `server/prompts/storage.ts`
- **.getRepo()** (17 connections) — `server/prompts/storage.ts`
- **.createPrompt()** (6 connections) — `server/prompts/storage.ts`
- **.getPrompts()** (6 connections) — `server/prompts/storage.ts`
- **.updatePrompt()** (6 connections) — `server/prompts/storage.ts`
- **.createCategory()** (5 connections) — `server/prompts/storage.ts`
- **.duplicatePrompt()** (5 connections) — `server/prompts/storage.ts`
- **.getCategories()** (5 connections) — `server/prompts/storage.ts`
- **.getCategoryById()** (5 connections) — `server/prompts/storage.ts`
- **.getPromptById()** (5 connections) — `server/prompts/storage.ts`
- **.incrementCopyCount()** (5 connections) — `server/prompts/storage.ts`
- **.toggleFavorite()** (5 connections) — `server/prompts/storage.ts`
- **.updateCategory()** (5 connections) — `server/prompts/storage.ts`
- **.deleteCategory()** (4 connections) — `server/prompts/storage.ts`
- **.deletePrompt()** (4 connections) — `server/prompts/storage.ts`
- **.resetToDefaults()** (4 connections) — `server/prompts/storage.ts`

## Relationships

- [Filesystem Prompt Repository Adapter](Filesystem_Prompt_Repository_Adapter.md) (13 shared connections)
- [Firebase Admin & Backend Filesystem Operations](Firebase_Admin_&_Backend_Filesystem_Operations.md) (3 shared connections)
- [Gemini AI Integration & Prompt Analyzer](Gemini_AI_Integration_&_Prompt_Analyzer.md) (1 shared connections)
- [Express Server & API Routes](Express_Server_&_API_Routes.md) (1 shared connections)

## Source Files

- `server/prompts/storage.ts`

## Audit Trail

- EXTRACTED: 61 (100%)
- INFERRED: 0 (0%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*