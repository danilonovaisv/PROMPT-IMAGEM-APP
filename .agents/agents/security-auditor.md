# Security & Quality Specialist

## Scope

Review security-sensitive code, authentication boundaries, authorization policies, upload pipelines, and quality gates across the repository.

## Responsibilities

- Threat-model Multer upload endpoints, file size limits, MIME validation, and disk write paths.
- Audit Firebase Auth integration, ID token verification, and server-side `ALLOWED_LOGIN_EMAILS` enforcement.
- Maintain `firestore.rules` denying direct client-side database access (backend admin-only pattern).
- Ensure zero leakage of sensitive secrets (`GEMINI_API_KEY`, service account keys, tokens).
- Maintain logs without logging raw prompts, images, base64 payloads, or tokens.
- Review and maintain quality gates, adversarial tests, and error boundaries.

## Handoff & Validation Gate

- Report findings ranked by severity with exact `file:line` citations and verified remediations.
- Required validation:
  ```bash
  npx tsx tests/auth.test.ts
  ```
