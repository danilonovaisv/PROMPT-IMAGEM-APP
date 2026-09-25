import fs from 'fs';
import path from 'path';
import { Firestore } from 'firebase-admin/firestore';
import { UPLOADS_DIR } from '../prompts/storage';
import { getAdminFirestore } from '../firebase/admin';

const MAX_INLINE_BASE64_CHARS = 700000; // ~525 KB, well below Firestore 1MB document limit
const CHUNK_SIZE_CHARS = 600000;

function getMimeTypeFromExt(ext: string): string {
  const cleanExt = ext.toLowerCase().replace(/^\./, '');
  switch (cleanExt) {
    case 'png':
      return 'image/png';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'webp':
      return 'image/webp';
    case 'gif':
      return 'image/gif';
    case 'svg':
      return 'image/svg+xml';
    default:
      return 'image/jpeg';
  }
}

function sanitizeDocId(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 120);
}

class ImageStore {
  private db: Firestore | null = null;
  private initialized = false;
  private isFirestoreDisabled = false;
  private warnedDisabled = false;

  private mustPersistRemotely(): boolean {
    const service = process.env.K_SERVICE || '';
    const isPreview = service.startsWith('ais-dev-') || service.startsWith('ais-pre-');
    return process.env.NODE_ENV === 'production' || (!!service && !isPreview);
  }

  public shouldAttemptFirestore(): boolean {
    if (this.isFirestoreDisabled) return false;

    // Check if persistence provider is explicitly filesystem
    const rawProvider = process.env.PERSISTENCE_PROVIDER?.toLowerCase().trim();
    if (rawProvider === 'filesystem') return false;

    const isAIStudioPreview =
      !!process.env.K_SERVICE &&
      (process.env.K_SERVICE.startsWith('ais-dev-') || process.env.K_SERVICE.startsWith('ais-pre-'));

    const isDevEnvironment =
      process.env.NODE_ENV === 'development' ||
      process.env.NODE_ENV === 'test' ||
      isAIStudioPreview;

    const isProduction =
      !isDevEnvironment &&
      (process.env.NODE_ENV === 'production' || (!!process.env.K_SERVICE && !isAIStudioPreview));

    // Only attempt Firestore remote connection when in durable production mode or explicitly configured
    if (!isProduction && rawProvider !== 'firestore') {
      return false;
    }

    return true;
  }

  private getDb(): Firestore {
    if (this.db) return this.db;

    this.db = getAdminFirestore();
    return this.db;
  }

  /**
   * Saves an image buffer to both the local disk cache and durable Firestore storage
   */
  public async saveImage(
    filename: string,
    buffer: Buffer,
    mimeType?: string
  ): Promise<string> {
    const ext = path.extname(filename);
    const resolvedMime = mimeType || getMimeTypeFromExt(ext);
    const localFilePath = path.join(UPLOADS_DIR, filename);

    // 1. Write to local disk cache
    try {
      if (!fs.existsSync(UPLOADS_DIR)) {
        fs.mkdirSync(UPLOADS_DIR, { recursive: true });
      }
      fs.writeFileSync(localFilePath, buffer);
    } catch (fsErr) {
      console.warn('[imageStore] Failed to write image to disk cache:', fsErr);
    }

    // 2. Persist to Firestore if available and enabled
    if (this.shouldAttemptFirestore()) {
      try {
        const db = this.getDb();
        const docId = sanitizeDocId(filename);
        const base64Data = buffer.toString('base64');
        const now = new Date().toISOString();

        if (base64Data.length <= MAX_INLINE_BASE64_CHARS) {
          // Single document storage
          await db.doc(`app_images/${docId}`).set({
            id: docId,
            filename,
            mimeType: resolvedMime,
            data: base64Data,
            size: buffer.length,
            chunkCount: 0,
            createdAt: now,
            updatedAt: now,
          });
        } else {
          // Chunked storage for larger images
          const chunkCount = Math.ceil(base64Data.length / CHUNK_SIZE_CHARS);
          await db.doc(`app_images/${docId}`).set({
            id: docId,
            filename,
            mimeType: resolvedMime,
            size: buffer.length,
            chunkCount,
            createdAt: now,
            updatedAt: now,
          });

          for (let i = 0; i < chunkCount; i++) {
            const chunkStr = base64Data.substring(i * CHUNK_SIZE_CHARS, (i + 1) * CHUNK_SIZE_CHARS);
            await db.doc(`app_images/${docId}/chunks/chunk_${i}`).set({
              index: i,
              chunkData: chunkStr,
            });
          }
        }
      } catch (dbErr: any) {
        if (this.mustPersistRemotely()) throw dbErr;
        const isPerm = dbErr?.code === 'permission-denied' ||
          String(dbErr?.message || '').includes('Missing or insufficient permissions') ||
          String(dbErr?.message || '').includes('offline');

        if (isPerm) {
          this.isFirestoreDisabled = true;
          if (!this.warnedDisabled) {
            this.warnedDisabled = true;
            console.info('[imageStore] Remote Firestore image sync is disabled (unauthenticated in this environment). Images are saved locally.');
          }
        } else {
          console.warn('[imageStore] Notice saving image to Firestore:', dbErr?.message || dbErr);
        }
      }
    }

    return `/api/uploads/${filename}`;
  }

  /**
   * Retrieves an image buffer.
   * Checks local disk first; if absent (e.g. after container restart), fetches from Firestore and restores to disk.
   */
  public async getImage(filename: string): Promise<{ buffer: Buffer; mimeType: string } | null> {
    const localFilePath = path.join(UPLOADS_DIR, filename);
    const ext = path.extname(filename);
    const fallbackMime = getMimeTypeFromExt(ext);

    // 1. Check local disk
    if (fs.existsSync(localFilePath)) {
      try {
        const buffer = fs.readFileSync(localFilePath);
        return { buffer, mimeType: fallbackMime };
      } catch (err) {
        console.warn(`[imageStore] Error reading local disk image for ${filename}:`, err);
      }
    }

    // If Firestore is disabled or unavailable, return null without remote network calls
    if (!this.shouldAttemptFirestore()) {
      return null;
    }

    // 2. Fetch from Firestore
    try {
      const db = this.getDb();
      const docId = sanitizeDocId(filename);
      let imgDoc = await db.doc(`app_images/${docId}`).get();

      // If not found by direct docId, query by exact filename
      if (!imgDoc.exists) {
        const qSnap = await db.collection('app_images').where('filename', '==', filename).get();
        if (!qSnap.empty) {
          imgDoc = qSnap.docs[0];
        }
      }

      if (!imgDoc.exists) {
        return null;
      }

      const data = imgDoc.data();
      if (!data) return null;
      const resolvedMime = data.mimeType || fallbackMime;
      let base64Result = '';

      if (data.chunkCount && data.chunkCount > 0) {
        // Reassemble chunks
        const chunksSnap = await imgDoc.ref.collection('chunks').get();
        const chunkDocs = chunksSnap.docs
          .map(d => d.data())
          .sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
        base64Result = chunkDocs.map(c => c.chunkData || '').join('');
      } else if (data.data) {
        base64Result = data.data;
      }

      if (!base64Result) {
        return null;
      }

      const buffer = Buffer.from(base64Result, 'base64');

      // Cache locally to disk for instant subsequent requests
      try {
        if (!fs.existsSync(UPLOADS_DIR)) {
          fs.mkdirSync(UPLOADS_DIR, { recursive: true });
        }
        fs.writeFileSync(localFilePath, buffer);
      } catch (cacheErr) {
        console.warn('[imageStore] Failed to write restored image to local cache:', cacheErr);
      }

      return { buffer, mimeType: resolvedMime };
    } catch (err: any) {
      if (this.mustPersistRemotely()) throw err;
      const isPerm = err?.code === 'permission-denied' ||
        String(err?.message || '').includes('Missing or insufficient permissions') ||
        String(err?.message || '').includes('offline');

      if (isPerm) {
        this.isFirestoreDisabled = true;
        if (!this.warnedDisabled) {
          this.warnedDisabled = true;
          console.info('[imageStore] Remote Firestore image storage unavailable; using local storage.');
        }
      } else {
        console.warn(`[imageStore] Notice: Could not retrieve '${filename}' from remote storage:`, err?.message || err);
      }
      return null;
    }
  }

  /**
   * Saves Base64 image data (e.g. data URI) durably
   */
  public async saveBase64Image(
    dataUriOrBase64: string,
    mimeType = 'image/jpeg',
    prefix = 'img'
  ): Promise<{ url: string; filename: string }> {
    const matches = dataUriOrBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    const resolvedMime = matches ? matches[1] : mimeType;
    const base64Data = matches ? matches[2] : dataUriOrBase64;

    const ext = resolvedMime.includes('png')
      ? '.png'
      : resolvedMime.includes('webp')
      ? '.webp'
      : '.jpg';

    const filename = `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
    const buffer = Buffer.from(base64Data, 'base64');

    const url = await this.saveImage(filename, buffer, resolvedMime);
    return { url, filename };
  }

  /**
   * Syncs existing files in uploads directory to Firestore if they do not already exist there
   */
  public async syncLocalUploads(): Promise<number> {
    if (!this.shouldAttemptFirestore() || !fs.existsSync(UPLOADS_DIR)) return 0;

    let synced = 0;
    try {
      const files = fs.readdirSync(UPLOADS_DIR);
      for (const file of files) {
        if (this.isFirestoreDisabled) break;
        const filePath = path.join(UPLOADS_DIR, file);
        const stat = fs.statSync(filePath);
        if (!stat.isFile()) continue;

        const docId = sanitizeDocId(file);
        const db = this.getDb();
        const existingDoc = await db.doc(`app_images/${docId}`).get();
        if (!existingDoc.exists) {
          const buffer = fs.readFileSync(filePath);
          const ext = path.extname(file);
          await this.saveImage(file, buffer, getMimeTypeFromExt(ext));
          synced++;
        }
      }
      if (synced > 0) {
        console.log(`[imageStore] Synced ${synced} existing local upload(s) to Firestore durable storage.`);
      }
    } catch (err: any) {
      const isPerm = err?.code === 'permission-denied' ||
        String(err?.message || '').includes('Missing or insufficient permissions') ||
        String(err?.message || '').includes('offline');

      if (isPerm) {
        this.isFirestoreDisabled = true;
        if (!this.warnedDisabled) {
          this.warnedDisabled = true;
          console.info('[imageStore] Firestore remote sync is inactive (local uploads active).');
        }
      } else {
        console.warn('[imageStore] Notice in syncLocalUploads:', err?.message || err);
      }
    }
    return synced;
  }
}

export const imageStore = new ImageStore();
