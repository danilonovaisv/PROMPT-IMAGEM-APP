import { Request, Response, NextFunction } from 'express';
import { parseCookie } from 'cookie';
import { getAuth, DecodedIdToken } from 'firebase-admin/auth';
import { readFileSync } from 'node:fs';
import { parse as parseEnv } from 'dotenv';
import { getAdminApp } from '../firebase/admin';

export interface AuthenticatedUser {
  uid: string;
  email: string;
  name?: string;
  picture?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export const IMAGE_SESSION_COOKIE = 'app_image_token';

function getLocalAllowedEmails(): string | undefined {
  const isCloudRunProd = process.env.NODE_ENV === 'production' && !process.env.K_SERVICE?.startsWith('ais-');
  if (isCloudRunProd) return undefined;
  try {
    const parsed = parseEnv(readFileSync('.env'));
    return parsed.ALLOWED_LOGIN_EMAILS;
  } catch {
    return undefined;
  }
}

export type VerifyIdToken = (token: string) => Promise<DecodedIdToken>;

export const verifyFirebaseIdToken: VerifyIdToken = async (token) => {
  return getAuth(getAdminApp()).verifyIdToken(token);
};

export function createAuthenticateFirebaseToken(verifyIdToken: VerifyIdToken = verifyFirebaseIdToken) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const bearer = req.headers.authorization;
    const imageRequest = req.method === 'GET' && req.path.startsWith('/uploads/');
    const cookieToken = imageRequest ? parseCookie(req.headers.cookie || '')[IMAGE_SESSION_COOKIE] : undefined;
    const queryToken = imageRequest && typeof req.query?.token === 'string' ? req.query.token : undefined;
    const token = bearer?.startsWith('Bearer ') ? bearer.slice(7).trim() : (cookieToken || queryToken);

    if (!token) {
      res.status(401).json({ error: 'Entre com sua conta Google para acessar a biblioteca.' });
      return;
    }

    try {
      const decoded = await verifyIdToken(token);
      const isGoogleProvider =
        decoded.firebase?.sign_in_provider === 'google.com' ||
        Boolean(decoded.firebase?.identities && 'google.com' in decoded.firebase.identities);

      if (!decoded.email || !decoded.email_verified || !isGoogleProvider) {
        res.status(403).json({ error: 'Entre com uma conta Google com e-mail verificado.' });
        return;
      }
      req.user = {
        uid: decoded.uid,
        email: decoded.email.toLowerCase(),
        name: decoded.name,
        picture: decoded.picture,
      };
      next();
    } catch (err: any) {
      console.warn('[auth] Erro na verificação do token Firebase:', err?.message || err);
      res.status(401).json({ error: 'Sua sessão expirou. Entre novamente.' });
    }
  };
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const isPreview = !!process.env.K_SERVICE?.startsWith('ais-dev-') || !!process.env.K_SERVICE?.startsWith('ais-pre-');
  const configured = process.env.ALLOWED_LOGIN_EMAILS ?? getLocalAllowedEmails();
  const emailsString = configured === undefined && isPreview ? 'dannovaisv@gmail.com' : (configured || '');
  const allowedEmails = new Set(
    emailsString
      .split(',')
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean)
  );

  if (allowedEmails.size === 0) {
    res.status(503).json({ error: 'A lista de contas autorizadas ainda não foi configurada.' });
    return;
  }
  if (!req.user || !allowedEmails.has(req.user.email)) {
    res.status(403).json({ error: `A conta ${req.user?.email || 'desconhecida'} não tem acesso à biblioteca.` });
    return;
  }
  next();
}
