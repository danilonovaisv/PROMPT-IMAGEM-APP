# DAN IMAGES PROMPTS Agent Guide

## Mission

Treat every prompt as a reusable creative asset composed of source text, visual reference, classification, target model, and reviewed structured metadata. Preserve user control: AI analysis is a draft and must remain editable before persistence.

## Current Architecture

- **Frontend:** React 19, Vite 8, Tailwind CSS 4, Motion, and Lucide React.
- **Backend:** Node.js 22, TypeScript, Express 5, and Multer.
- **AI:** server-side Gemini integration through `@google/genai` (SDK 2.x).
- **Persistence:** `PromptRepository` adapters for local JSON files (development/testing) or Firestore (mandatory durable default in production/Cloud Run). Silent fallback to ephemeral filesystem in production is strictly prohibited.
- **Google Integration:** Firebase Auth in the browser and Google Docs/Drive import through server-side Workspace services.
- **Deployment:** Cloud Run managed container via Dockerfile multi-stage.
- **Development and Production:** Served from the Express entrypoint in `server.ts` / `dist/server.cjs`.

Read `.context/project-context.md` before architectural work and `.context/conventions.md` before implementation.

---

## Non-Negotiable Rules

1. **Keep Secrets Server-Side:** Never expose `GEMINI_API_KEY` or service credentials through Vite client variables or browser code.
2. **Preserve User Intent:** Preserve `rawPrompt` and image references. Do not replace user input with AI-generated content.
3. **Boundary Validation:** Validate untrusted data at HTTP and persistence boundaries. Do not trust filenames, MIME headers, IDs, model output, or client-owned fields.
4. **Centralized Frontend API:** Keep frontend HTTP access in `src/services/api.ts`; do not scatter direct `fetch` calls through components.
5. **AI Isolation:** Keep provider-specific AI behavior behind `server/ai/`. New providers require an explicit adapter boundary, not conditionals spread across routes or UI.
6. **Token Verification:** Treat Firebase sign-in and Google OAuth access as identity inputs, not proof that every API route is authenticated or authorized. Verify Firebase ID tokens server-side before relying on user identity.
7. **Type Strictness:** Avoid new `any` types. Prefer narrow interfaces, `unknown`, type guards, or schema validation.
8. **UX & Accessibility:** Preserve accessibility (WCAG 2.1 AA), responsive behavior, loading/error/empty/success states, and `prefers-reduced-motion` behavior in UI changes.
9. **Log Privacy:** Do not log complete prompts, images, model responses, tokens, or secrets.
10. **Human Gate for Release:** Never run destructive cleanup or deployment commands without explicit user authorization.

---

## Agent Battalion Configuration

| Specialist | File | Domain Scope |
| :--- | :--- | :--- |
| **Project Orchestrator** | `.agents/agents/project-orchestrator.md` | Request classification, multi-domain routing, dependency resolution, execution gating. |
| **Prompt Library & Frontend Specialist** | `.agents/agents/frontend-specialist.md` | `src/features/`, `src/components/`, `src/index.css`, UI/UX, responsive layout, motion, a11y. |
| **API & Persistence Specialist** | `.agents/agents/api-domain-specialist.md` | `server.ts`, `server/repositories/`, `server/workspace/`, REST contracts, fail-closed durability. |
| **AI Cataloging Specialist** | `.agents/agents/gemini-ai-specialist.md` | `server/ai/`, `@google/genai`, prompt & visual analysis, JSON schema, fallback heuristic. |
| **Security & Quality Specialist** | `.agents/agents/security-auditor.md` | Firebase Auth, `authMiddleware.ts`, `firestore.rules`, Multer upload audits, secret hygiene. |
| **Release Engineer** | `.agents/agents/release-engineer.md` | `Dockerfile`, Cloud Run readiness, preflight checks, production builds, deploy verification. |

---

## Workflows

- `/quality` (`.agents/workflows/quality.md`): Execute typecheck, contract audits, and security checks.
- `/release` (`.agents/workflows/release.md`): Assess deployment readiness with mandatory human gate.
- `/test` (`.agents/workflows/test.md`): Run targeted or full automated regression test suites.
- `/feature` (`.agents/workflows/feature.md`): Standardized feature development lifecycle.
- `/bug` (`.agents/workflows/bug.md`): Disciplined bug reproduction, root cause trace, and fix.
- `/test-and-deploy` (`.agents/workflows/test-and-deploy.md`): Full test execution, build, and Cloud Run deploy.

---

## Package And Quality Policy

- Use `pnpm` as the canonical package manager. Do not update `bun.lock` unless intentionally revisited.
- Before completing code changes, run `pnpm exec tsc --noEmit` and the most relevant available tests in `tests/`.
- The existing `pnpm lint` script is type-checking only; do not claim ESLint coverage.
- Configured test suites:
  - `npx tsx tests/auth.test.ts`
  - `npx tsx tests/persistence.test.ts`
  - `npx tsx tests/api-persistence.test.ts`
  - `npx tsx tests/provider-selection.test.ts`
  - `npx tsx tests/firestore-durable.test.ts`
  - Full suite: `pnpm test`
