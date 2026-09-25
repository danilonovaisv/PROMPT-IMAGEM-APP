---
description: Validate the behavior affected by the current change using targeted or full test suites.
---

# /test

Validate the behavior affected by the current change.

1. **Typecheck First:** Always run `pnpm exec tsc --noEmit` before executing runtime tests.
2. **Targeted Selection:** Run the narrowest relevant test suite based on modified domain:
   - Auth & Whitelist: `npx tsx tests/auth.test.ts`
   - File Repository & CRUD: `npx tsx tests/persistence.test.ts`
   - Express REST API Integration: `npx tsx tests/api-persistence.test.ts`
   - Gemini & AI Cataloging: `npx tsx tests/provider-selection.test.ts`
   - Firestore Durability & Cloud Run Guardrail: `npx tsx tests/firestore-durable.test.ts`
3. **Full Suite Execution:** For release verification or multi-domain refactorings:

   ```bash
   pnpm test
   ```

4. **UI Validation:** For frontend changes in `src/`, verify loading, empty, error, success, responsive layouts, keyboard navigation, and reduced-motion states in browser.
5. **Reporting:** Report executed commands, PASS/FAIL results, and residual risks clearly.
