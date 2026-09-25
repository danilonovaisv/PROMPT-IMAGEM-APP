# Firestore Prompt Repository Adapter

> 20 nodes · cohesion 0.23

## Key Concepts

- **FirestorePromptRepository** (25 connections) — `server/repositories/firestorePromptRepository.ts`
- **.documentRef()** (14 connections) — `server/repositories/firestorePromptRepository.ts`
- **runFirestoreDurableTests()** (10 connections) — `tests/firestore-durable.test.ts`
- **.createPrompt()** (5 connections) — `server/repositories/firestorePromptRepository.ts`
- **.getPromptById()** (5 connections) — `server/repositories/firestorePromptRepository.ts`
- **.updatePrompt()** (5 connections) — `server/repositories/firestorePromptRepository.ts`
- **.duplicatePrompt()** (4 connections) — `server/repositories/firestorePromptRepository.ts`
- **.getPrompts()** (4 connections) — `server/repositories/firestorePromptRepository.ts`
- **.incrementCopyCount()** (4 connections) — `server/repositories/firestorePromptRepository.ts`
- **.init()** (4 connections) — `server/repositories/firestorePromptRepository.ts`
- **.toggleFavorite()** (4 connections) — `server/repositories/firestorePromptRepository.ts`
- **firestore-durable.test.ts** (4 connections) — `tests/firestore-durable.test.ts`
- **.createCategory()** (3 connections) — `server/repositories/firestorePromptRepository.ts`
- **.deletePrompt()** (3 connections) — `server/repositories/firestorePromptRepository.ts`
- **.getCategoryById()** (3 connections) — `server/repositories/firestorePromptRepository.ts`
- **.seedIfEmpty()** (3 connections) — `server/repositories/firestorePromptRepository.ts`
- **.updateCategory()** (3 connections) — `server/repositories/firestorePromptRepository.ts`
- **.deleteCategory()** (2 connections) — `server/repositories/firestorePromptRepository.ts`
- **.getCategories()** (2 connections) — `server/repositories/firestorePromptRepository.ts`
- **.resetToDefaults()** (2 connections) — `server/repositories/firestorePromptRepository.ts`

## Relationships

- [Filesystem Prompt Repository Adapter](Filesystem_Prompt_Repository_Adapter.md) (13 shared connections)
- [Express Server & API Routes](Express_Server_&_API_Routes.md) (5 shared connections)
- [Firebase Admin & Backend Filesystem Operations](Firebase_Admin_&_Backend_Filesystem_Operations.md) (5 shared connections)

## Source Files

- `server/repositories/firestorePromptRepository.ts`
- `tests/firestore-durable.test.ts`

## Audit Trail

- EXTRACTED: 57 (86%)
- INFERRED: 9 (14%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*