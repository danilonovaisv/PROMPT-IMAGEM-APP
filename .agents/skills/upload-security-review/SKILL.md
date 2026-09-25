---
name: upload-security-review
description: Audits and enforces upload security for image files handled via Multer in Express 5, covering MIME validation, magic-byte inspection, file size limits, filename sanitization, and storage directory containment.
metadata:
  category: Security
---

# Upload Security Review

## Purpose

Protect the DAN IMAGES PROMPTS backend from unauthenticated file uploads, path traversal, malicious executables, storage exhaustion, and MIME spoofing.

## Use When

- Modifying upload endpoints (`/api/uploads`, `/api/prompts` with multipart data).
- Configuring Multer disk storage, memory storage, or file limits.
- Auditing static file serving of the `/uploads` directory in `server.ts`.
- Validating image formats accepted for visual prompt references.

## Do Not Use When

- Reviewing text prompt inputs (handled in `server/validation/`).
- Managing Google Docs or Google Drive OAuth imports (`server/workspace/`).

## Required Context

- `server.ts`
- `server/validation/authMiddleware.ts`

## Security Checkpoints

1. **Authentication Enforcement:** Upload routes MUST require a verified Firebase ID token or secure signed session cookie. Anonymous uploads are prohibited.
2. **File Size Limits:** Limit individual file uploads to strict size bounds (e.g., maximum 10MB per reference image).
3. **MIME & Extension Whitelist:** Only accept valid image MIME types (`image/jpeg`, `image/png`, `image/webp`, `image/gif`).
4. **Filename Sanitization:** Never retain client-supplied filenames directly on disk. Generate cryptographically random UUIDs or hashes with fixed safe extensions.
5. **Path Traversal Defense:** Ensure files are written strictly inside the configured `uploads/` directory with path resolution checks (`path.resolve`).
6. **No Execution:** Ensure the upload directory cannot execute scripts (`.php`, `.js`, `.sh`, `.html`).

## Validation

Verify that unauthorized requests receive HTTP 401/403:
```bash
npx tsx tests/auth.test.ts
```
