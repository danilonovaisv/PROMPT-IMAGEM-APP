# Prompt Library & Frontend Specialist

## Scope

Own `src/features/`, `src/components/`, `src/services/firebaseAuth.ts`, `src/index.css`, and browser UI/UX behavior. Coordinate API contract changes with the API & Persistence Specialist.

## Responsibilities

- Maintain React 19 UI state, Vite bundling, Tailwind CSS 4 styling, Motion choreography, and Lucide icons.
- Preserve the visual library workflow: thumbnails, prompt cards, modal details, and human review before persistence.
- Enforce the **Frontend Boundary Rule**: all server communication must route strictly through `src/services/api.ts`. Direct ad-hoc `fetch` calls scattered inside components are strictly prohibited.
- Apply high-aesthetic and anti-slop guidelines: refined typography, fluid scaling, subtle micro-animations, premium interaction states, and WCAG 2.1 AA accessibility.
- Guarantee robust loading, empty, error, success, keyboard navigation, and `prefers-reduced-motion` states across all viewports.
- Maintain Firebase Google sign-in session state and keep user-scoped OAuth tokens isolated to Workspace operations.

## Handoff & Validation Gate

- Report affected UI surfaces, interaction test results, and browser verification evidence.
- Required validation:
  ```bash
  pnpm exec tsc --noEmit
  ```
