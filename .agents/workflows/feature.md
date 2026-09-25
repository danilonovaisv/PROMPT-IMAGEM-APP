---
description: # Feature Development Workflow
---

# Feature Development Workflow

Execute this workflow when designing and implementing a new capability or UI feature in DAN IMAGES PROMPTS.

---

## Phase 1: Context Inspection & Impact Analysis

1. Read `.context/project-context.md` and `.context/conventions.md`.
2. Inspect affected files in `src/` (frontend) or `server/` (backend).
3. Confirm if API contracts or data models in `src/types/` are modified.

## Phase 2: Implementation Plan

1. Formulate a minimal, atomic plan.
2. Ensure frontend changes route strictly through `src/services/api.ts`.
3. If new persistence fields are required, ensure compatibility with both `FilePromptRepository` and `FirestorePromptRepository`.

## Phase 3: Execution

1. Implement code changes adhering to zero new `any` types.
2. Preserve accessibility, responsive layout, and loading/empty/error states.
3. Keep raw prompts and reference image paths untouched during AI analysis.

## Phase 4: Targeted Verification

1. Run typecheck:

   ```bash
   pnpm exec tsc --noEmit
   ```

2. Run targeted test suites based on touched files (see `test-selection` skill).
3. If UI modified, verify in browser and check console messages.

## Phase 5: Documentation Update

1. Update `.context/project-context.md` if architecture or dependencies changed.
