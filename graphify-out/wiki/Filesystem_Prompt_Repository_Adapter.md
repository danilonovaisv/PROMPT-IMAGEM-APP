# Filesystem Prompt Repository Adapter

> 48 nodes · cohesion 0.09

## Key Concepts

- **PromptItem** (59 connections) — `src/types/index.ts`
- **Category** (42 connections) — `src/types/index.ts`
- **FilePromptRepository** (28 connections) — `server/repositories/filePromptRepository.ts`
- **PromptRepository** (24 connections) — `server/repositories/promptRepository.ts`
- **runTests()** (15 connections) — `tests/persistence.test.ts`
- **promptRepository.ts** (11 connections) — `server/repositories/promptRepository.ts`
- **.savePrompts()** (9 connections) — `server/repositories/filePromptRepository.ts`
- **CreatePromptInput** (8 connections) — `server/repositories/promptRepository.ts`
- **persistence.test.ts** (8 connections) — `tests/persistence.test.ts`
- **.saveCategories()** (6 connections) — `server/repositories/filePromptRepository.ts`
- **.createPrompt()** (5 connections) — `server/repositories/filePromptRepository.ts`
- **.updatePrompt()** (5 connections) — `server/repositories/filePromptRepository.ts`
- **.createCategory()** (4 connections) — `server/repositories/filePromptRepository.ts`
- **.duplicatePrompt()** (4 connections) — `server/repositories/filePromptRepository.ts`
- **.incrementCopyCount()** (4 connections) — `server/repositories/filePromptRepository.ts`
- **.init()** (4 connections) — `server/repositories/filePromptRepository.ts`
- **.seedIfEmpty()** (4 connections) — `server/repositories/filePromptRepository.ts`
- **.toggleFavorite()** (4 connections) — `server/repositories/filePromptRepository.ts`
- **.deleteCategory()** (3 connections) — `server/repositories/filePromptRepository.ts`
- **.deletePrompt()** (3 connections) — `server/repositories/filePromptRepository.ts`
- **.getCategories()** (3 connections) — `server/repositories/filePromptRepository.ts`
- **.getCategoryById()** (3 connections) — `server/repositories/filePromptRepository.ts`
- **.getPromptById()** (3 connections) — `server/repositories/filePromptRepository.ts`
- **.resetToDefaults()** (3 connections) — `server/repositories/filePromptRepository.ts`
- **.updateCategory()** (3 connections) — `server/repositories/filePromptRepository.ts`
- *... and 23 more nodes in this community*

## Relationships

- [Firebase Admin & Backend Filesystem Operations](Firebase_Admin_&_Backend_Filesystem_Operations.md) (26 shared connections)
- [Frontend UI Libraries & React Primitives](Frontend_UI_Libraries_&_React_Primitives.md) (26 shared connections)
- [Prompt Storage & In-Memory Store](Prompt_Storage_&_In-Memory_Store.md) (13 shared connections)
- [Firestore Prompt Repository Adapter](Firestore_Prompt_Repository_Adapter.md) (13 shared connections)
- [Frontend Core App & API Client Service](Frontend_Core_App_&_API_Client_Service.md) (11 shared connections)
- [Express Server & API Routes](Express_Server_&_API_Routes.md) (7 shared connections)
- [Browser Firebase Auth & Client Config](Browser_Firebase_Auth_&_Client_Config.md) (2 shared connections)
- [Gemini AI Integration & Prompt Analyzer](Gemini_AI_Integration_&_Prompt_Analyzer.md) (2 shared connections)

## Source Files

- `server/repositories/filePromptRepository.ts`
- `server/repositories/promptRepository.ts`
- `src/features/categories/CategoryManagerModal.tsx`
- `src/features/library/PromptCard.tsx`
- `src/features/library/PromptGrid.tsx`
- `src/features/library/PromptTableView.tsx`
- `src/features/prompts/PromptDetailModal.tsx`
- `src/features/prompts/PromptFormModal.tsx`
- `src/types/index.ts`
- `tests/persistence.test.ts`

## Audit Trail

- EXTRACTED: 191 (93%)
- INFERRED: 14 (7%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*