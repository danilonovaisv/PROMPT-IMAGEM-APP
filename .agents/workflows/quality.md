---
description: Run repository quality gate, typecheck, contract consistency, and security audits.
---

# /quality

Run repository quality gate without silently changing files.

1. **Working Tree Inspection:** Inspect git status and preserve unrelated changes.
2. **Typecheck Gate:** Run `pnpm exec tsc --noEmit` (0 errors required).
3. **Automated Behavior Verification:** Run targeted test suites or full `pnpm test`.
4. **Contract & Storage Integrity:**
   - Verify parity between `FilePromptRepository` and `FirestorePromptRepository`.
   - Ensure fail-closed checks prevent ephemeral storage fallbacks in Cloud Run.
   - Verify frontend API calls strictly use `src/services/api.ts`.
5. **Security & Secrets Audit:**
   - Confirm zero exposure of `GEMINI_API_KEY` or service credentials in client bundles.
   - Review Multer upload endpoints for size limits and path containment.
   - Verify `firestore.rules` enforces admin-only backend access.
6. **Reporting:** Summarize actionable findings ranked by severity.
