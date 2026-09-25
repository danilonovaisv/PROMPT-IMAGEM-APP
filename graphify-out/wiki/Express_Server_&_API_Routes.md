# Express Server & API Routes

> 46 nodes · cohesion 0.07

## Key Concepts

- **server.ts** (30 connections) — `server.ts`
- **authMiddleware.ts** (18 connections) — `server/validation/authMiddleware.ts`
- **provider-selection.test.ts** (13 connections) — `tests/provider-selection.test.ts`
- **repositories/index.ts** (12 connections) — `server/repositories/index.ts`
- **getPromptRepository()** (11 connections) — `server/repositories/index.ts`
- **api-persistence.test.ts** (11 connections) — `tests/api-persistence.test.ts`
- **startServer()** (10 connections) — `server.ts`
- **auth.test.ts** (10 connections) — `tests/auth.test.ts`
- **getActivePersistenceProvider()** (5 connections) — `server/repositories/index.ts`
- **runApiTests()** (5 connections) — `tests/api-persistence.test.ts`
- **ref_assert** (4 connections)
- **express** (4 connections) — `package.json`
- **getAdminApp()** (4 connections) — `server/firebase/admin.ts`
- **createAuthenticateFirebaseToken()** (4 connections) — `server/validation/authMiddleware.ts`
- **requireAuth()** (4 connections) — `server/validation/authMiddleware.ts`
- **runProviderSelectionTests()** (4 connections) — `tests/provider-selection.test.ts`
- **ref_firebase_admin_auth** (3 connections)
- **_resetRepositoryInstanceForTesting()** (3 connections) — `server/repositories/index.ts`
- **validatePromptInput()** (3 connections) — `server/validation/promptSchema.ts`
- **authFetch()** (3 connections) — `tests/api-persistence.test.ts`
- **waitForRepository()** (3 connections) — `tests/api-persistence.test.ts`
- **multer** (2 connections) — `package.json`
- **IMAGE_SESSION_COOKIE** (2 connections) — `server/validation/authMiddleware.ts`
- **verifyFirebaseIdToken()** (2 connections) — `server/validation/authMiddleware.ts`
- **VerifyIdToken** (2 connections) — `server/validation/authMiddleware.ts`
- *... and 21 more nodes in this community*

## Relationships

- [Firebase Admin & Backend Filesystem Operations](Firebase_Admin_&_Backend_Filesystem_Operations.md) (17 shared connections)
- [Gemini AI Integration & Prompt Analyzer](Gemini_AI_Integration_&_Prompt_Analyzer.md) (8 shared connections)
- [Filesystem Prompt Repository Adapter](Filesystem_Prompt_Repository_Adapter.md) (7 shared connections)
- [Firestore Prompt Repository Adapter](Firestore_Prompt_Repository_Adapter.md) (5 shared connections)
- [Node.js Package Configuration & Scripts](Node.js_Package_Configuration_&_Scripts.md) (5 shared connections)
- [Prompt Storage & In-Memory Store](Prompt_Storage_&_In-Memory_Store.md) (1 shared connections)

## Source Files

- `http`
- `package.json`
- `server.ts`
- `server/firebase/admin.ts`
- `server/repositories/index.ts`
- `server/validation/authMiddleware.ts`
- `server/validation/promptSchema.ts`
- `tests/api-persistence.test.ts`
- `tests/auth.test.ts`
- `tests/provider-selection.test.ts`

## Audit Trail

- EXTRACTED: 114 (96%)
- INFERRED: 5 (4%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*