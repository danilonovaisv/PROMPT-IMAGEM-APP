---
description: Assess release readiness and prepare production deployment. Never deploys without explicit authorization.
---

# /release

Assess release readiness and prepare deployment. This command NEVER deploys without explicit human authorization.

1. **Preflight Environment Check:** Verify pnpm canonical lockfile and clean git status.
2. **Quality & Test Gate:**
   - Execute `pnpm exec tsc --noEmit`
   - Execute `pnpm test`
3. **Production Build:**
   - Execute `pnpm run build`
   - Confirm `dist/` and `dist/server.cjs` artifacts are created cleanly.
4. **Cloud Run Runtime Audit:**
   - Verify `PERSISTENCE_PROVIDER=firestore` for Cloud Run instances.
   - Verify `GOOGLE_CLOUD_PROJECT` and `FIRESTORE_DATABASE_ID` match `firebase-applet-config.json`.
   - Ensure `ALLOWED_LOGIN_EMAILS` is configured.
   - Confirm upload directories and secrets are properly isolated.
5. **Human Approval Gate:**
   - Present readiness assessment table to user.
   - **STOP** and wait for explicit approval (`Aprovado` / `Proceed`).
6. **Execution (Post-Approval Only):**
   - Execute deployment to Cloud Run using `./agents/workflows/test-and-deploy.md`.
