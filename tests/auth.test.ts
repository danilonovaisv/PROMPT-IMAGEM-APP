import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import express from 'express';
import type { DecodedIdToken } from 'firebase-admin/auth';
import { createAuthenticateFirebaseToken, requireAuth } from '../server/validation/authMiddleware';

const previousAllowed = process.env.ALLOWED_LOGIN_EMAILS;
process.env.ALLOWED_LOGIN_EMAILS = 'allowed@example.com';

const verifyToken = async (token: string): Promise<DecodedIdToken> => {
  if (!['valid-token', 'unverified-token', 'password-token'].includes(token)) throw new Error('Invalid test token');
  return {
    uid: 'test-user',
    email: 'Allowed@Example.com',
    email_verified: token !== 'unverified-token',
    firebase: { sign_in_provider: token === 'password-token' ? 'password' : 'google.com' },
  } as DecodedIdToken;
};

const app = express();
app.use('/api', createAuthenticateFirebaseToken(verifyToken), requireAuth);
app.get('/api/prompts', (req, res) => res.json({ email: req.user?.email }));
app.get('/api/uploads/image.jpg', (_req, res) => res.sendStatus(200));
app.post('/api/uploads/image.jpg', (_req, res) => res.sendStatus(200));

const server = createServer(app);
await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));

try {
  const address = server.address();
  assert(address && typeof address !== 'string');
  const base = `http://127.0.0.1:${address.port}/api`;

  assert.equal((await fetch(`${base}/prompts`)).status, 401);
  assert.equal((await fetch(`${base}/prompts`, { headers: { Authorization: 'Bearer invalid' } })).status, 401);
  assert.equal((await fetch(`${base}/prompts`, { headers: { Authorization: 'Bearer unverified-token' } })).status, 403);
  assert.equal((await fetch(`${base}/prompts`, { headers: { Authorization: 'Bearer password-token' } })).status, 403);

  const allowed = await fetch(`${base}/prompts`, { headers: { Authorization: 'Bearer valid-token' } });
  assert.equal(allowed.status, 200);
  assert.deepEqual(await allowed.json(), { email: 'allowed@example.com' });

  process.env.ALLOWED_LOGIN_EMAILS = 'another@example.com';
  assert.equal((await fetch(`${base}/prompts`, { headers: { Authorization: 'Bearer valid-token' } })).status, 403);
  process.env.ALLOWED_LOGIN_EMAILS = '';
  assert.equal((await fetch(`${base}/prompts`, { headers: { Authorization: 'Bearer valid-token' } })).status, 503);
  process.env.ALLOWED_LOGIN_EMAILS = 'allowed@example.com';

  assert.equal((await fetch(`${base}/uploads/image.jpg`)).status, 401);
  assert.equal((await fetch(`${base}/uploads/image.jpg`, { headers: { Cookie: 'app_image_token=valid-token' } })).status, 200);
  assert.equal((await fetch(`${base}/uploads/image.jpg`, { method: 'POST', headers: { Cookie: 'app_image_token=valid-token' } })).status, 401);

  console.log('Authentication boundary tests passed');
} finally {
  if (previousAllowed === undefined) delete process.env.ALLOWED_LOGIN_EMAILS;
  else process.env.ALLOWED_LOGIN_EMAILS = previousAllowed;
  await new Promise<void>((resolve) => server.close(() => resolve()));
}
