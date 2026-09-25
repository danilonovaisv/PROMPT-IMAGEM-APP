# Firebase Admin & Backend Filesystem Operations

> 36 nodes · cohesion 0.12

## Key Concepts

- **storage.ts** (21 connections) — `server/prompts/storage.ts`
- **firestorePromptRepository.ts** (20 connections) — `server/repositories/firestorePromptRepository.ts`
- **filePromptRepository.ts** (19 connections) — `server/repositories/filePromptRepository.ts`
- **imageStore.ts** (12 connections) — `server/storage/imageStore.ts`
- **ref_path** (10 connections)
- **imageStore** (10 connections) — `server/storage/imageStore.ts`
- **ref_fs** (9 connections)
- **admin.ts** (8 connections) — `server/firebase/admin.ts`
- **.saveImage()** (8 connections) — `server/storage/imageStore.ts`
- **PromptQuery** (7 connections) — `server/repositories/promptRepository.ts`
- **UpdatePromptInput** (7 connections) — `server/repositories/promptRepository.ts`
- **getAdminFirestore()** (6 connections) — `server/firebase/admin.ts`
- **.getImage()** (6 connections) — `server/storage/imageStore.ts`
- **.syncLocalUploads()** (6 connections) — `server/storage/imageStore.ts`
- **.getPrompts()** (5 connections) — `server/repositories/filePromptRepository.ts`
- **.getDb()** (5 connections) — `server/storage/imageStore.ts`
- **defaultCategories.ts** (5 connections) — `src/data/defaultCategories.ts`
- **initialPrompts.ts** (5 connections) — `src/data/initialPrompts.ts`
- **UPLOADS_DIR** (4 connections) — `server/prompts/storage.ts`
- **getMimeTypeFromExt()** (4 connections) — `server/storage/imageStore.ts`
- **.shouldAttemptFirestore()** (4 connections) — `server/storage/imageStore.ts`
- **sanitizeDocId()** (4 connections) — `server/storage/imageStore.ts`
- **ref_firebase_admin_firestore** (3 connections)
- **.mustPersistRemotely()** (3 connections) — `server/storage/imageStore.ts`
- **DEFAULT_CATEGORIES** (3 connections) — `src/data/defaultCategories.ts`
- *... and 11 more nodes in this community*

## Relationships

- [Filesystem Prompt Repository Adapter](Filesystem_Prompt_Repository_Adapter.md) (26 shared connections)
- [Express Server & API Routes](Express_Server_&_API_Routes.md) (17 shared connections)
- [Gemini AI Integration & Prompt Analyzer](Gemini_AI_Integration_&_Prompt_Analyzer.md) (6 shared connections)
- [Frontend UI Libraries & React Primitives](Frontend_UI_Libraries_&_React_Primitives.md) (5 shared connections)
- [Firestore Prompt Repository Adapter](Firestore_Prompt_Repository_Adapter.md) (5 shared connections)
- [Prompt Storage & In-Memory Store](Prompt_Storage_&_In-Memory_Store.md) (3 shared connections)
- [Node.js Package Configuration & Scripts](Node.js_Package_Configuration_&_Scripts.md) (1 shared connections)
- [Browser Firebase Auth & Client Config](Browser_Firebase_Auth_&_Client_Config.md) (1 shared connections)

## Source Files

- `server/firebase/admin.ts`
- `server/prompts/storage.ts`
- `server/repositories/filePromptRepository.ts`
- `server/repositories/firestorePromptRepository.ts`
- `server/repositories/promptRepository.ts`
- `server/storage/imageStore.ts`
- `src/data/defaultCategories.ts`
- `src/data/initialPrompts.ts`

## Audit Trail

- EXTRACTED: 136 (99%)
- INFERRED: 1 (1%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*