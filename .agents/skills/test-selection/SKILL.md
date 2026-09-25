---
name: test-selection
description: Selects and runs the exact automated test suites in tests/ based on affected architectural domains, ensuring fast, deterministic verification without unnecessary full runs.
metadata:
  category: Quality
---

# Test Selection Guide

## Purpose

Map changes in application code directly to the 5 automated test suites executed via `tsx`.

## Available Test Suites

| Suite File | Scope & Tested Components | Run Command |
| :--- | :--- | :--- |
| `tests/auth.test.ts` | Firebase token auth, `ALLOWED_LOGIN_EMAILS`, cookie uploads, 401/403/503 | `npx tsx tests/auth.test.ts` |
| `tests/persistence.test.ts` | FilePromptRepository, CRUD operations, restarts, sorting, filters | `npx tsx tests/persistence.test.ts` |
| `tests/api-persistence.test.ts`| REST API persistence integration over Express routes | `npx tsx tests/api-persistence.test.ts` |
| `tests/provider-selection.test.ts` | Prompt analyzer provider selection, Gemini fallback, AI analysis | `npx tsx tests/provider-selection.test.ts` |
| `tests/firestore-durable.test.ts` | Firestore durability check, fail-closed Cloud Run guardrails | `npx tsx tests/firestore-durable.test.ts` |

## Mapping Rules

1. **If modifying `server/validation/authMiddleware.ts` or auth cookies:**
   -> Run `npx tsx tests/auth.test.ts`
2. **If modifying `server/repositories/filePromptRepository.ts`:**
   -> Run `npx tsx tests/persistence.test.ts`
3. **If modifying `server.ts` prompt endpoints:**
   -> Run `npx tsx tests/api-persistence.test.ts`
4. **If modifying `server/ai/` or Gemini cataloging:**
   -> Run `npx tsx tests/provider-selection.test.ts`
5. **If modifying `server/repositories/index.ts` or Cloud Run guardrails:**
   -> Run `npx tsx tests/firestore-durable.test.ts`
6. **Before Release or Multi-Domain Refactoring:**
   -> Run full test suite: `pnpm test`
