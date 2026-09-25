# Bug Diagnosis and Fix Workflow

Execute this workflow when reproducing, diagnosing, and resolving defects or unexpected behavior.

---

## Phase 1: Reproduction & Telemetry
1. Formulate a minimal reproduction scenario or targeted test case in `tests/`.
2. Check terminal logs and server output for error codes and stack traces.
3. Distinguish between environment issues (e.g. missing `GEMINI_API_KEY`, unconfigured `ALLOWED_LOGIN_EMAILS`) and software defects.

## Phase 2: Root Cause Analysis
1. Trace the defect along the execution boundary:
   - Client UI -> `ApiService` -> Express Route -> Middleware -> AI / Repository
2. Verify if the issue stems from silent failover, schema divergence, or token expiration.

## Phase 3: Surgical Fix
1. Apply the minimum necessary change to fix the root cause.
2. Avoid touching unrelated files or introducing speculative refactorings.
3. Ensure no secrets or tokens are exposed in error messages.

## Phase 4: Regression Test & Verification
1. Run the targeted test suite to confirm the fix:
   ```bash
   npx tsx tests/<relevant>.test.ts
   ```
2. Verify type safety:
   ```bash
   pnpm exec tsc --noEmit
   ```
