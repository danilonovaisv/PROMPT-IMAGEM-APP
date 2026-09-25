import { PromptRepository } from './promptRepository';
import { FirestorePromptRepository } from './firestorePromptRepository';
import { FilePromptRepository } from './filePromptRepository';

let repositoryInstance: PromptRepository | null = null;

export function _resetRepositoryInstanceForTesting(): void {
  repositoryInstance = null;
}

export function getActivePersistenceProvider(): 'firestore' | 'filesystem' | 'none' {
  if (!repositoryInstance) return 'none';
  return repositoryInstance instanceof FirestorePromptRepository ? 'firestore' : 'filesystem';
}

export async function getPromptRepository(): Promise<PromptRepository> {
  if (repositoryInstance) {
    return repositoryInstance;
  }

  // Development and AI Studio sandbox environment check:
  // - NODE_ENV === 'development' or 'test'
  // - K_SERVICE begins with 'ais-dev-' (AI Studio development preview container)
  // - K_SERVICE begins with 'ais-pre-' (AI Studio shared / deployment rollout preview container)
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

  const rawProvider = process.env.PERSISTENCE_PROVIDER?.toLowerCase().trim();
  
  let provider: 'firestore' | 'filesystem';
  if (rawProvider === 'filesystem') {
    provider = 'filesystem';
  } else if (rawProvider === 'firestore') {
    provider = 'firestore';
  } else {
    // If undefined or unrecognized string, default to firestore in production, filesystem in dev/preview
    provider = isProduction ? 'firestore' : 'filesystem';
  }

  if (provider === 'firestore') {
    try {
      const firestoreRepo = new FirestorePromptRepository();
      await firestoreRepo.init();
      repositoryInstance = firestoreRepo;
      return repositoryInstance;
    } catch (err: any) {
      const msg = `[persistence] Fatal: Failed to initialize Firestore repository: ${err.message || err}. ` +
        `Check GOOGLE_CLOUD_PROJECT, FIRESTORE_DATABASE_ID, and Google credentials. ` +
        `Silent fallback to ephemeral filesystem is strictly prohibited in durable mode.`;
      console.error(msg);
      throw new Error(msg);
    }
  }

  // Cloud Run guardrail: prohibit ephemeral filesystem on production Cloud Run instances
  const isProductionCloudRun = !!process.env.K_SERVICE && !isAIStudioPreview && process.env.NODE_ENV !== 'development';
  if (isProductionCloudRun && process.env.ALLOW_EPHEMERAL_FILESYSTEM !== 'true') {
    const msg = `[persistence] Fatal: Filesystem persistence is prohibited on Cloud Run (${process.env.K_SERVICE}) because container storage is ephemeral and leads to permanent data loss. Set PERSISTENCE_PROVIDER=firestore or explicitly set ALLOW_EPHEMERAL_FILESYSTEM=true for local container testing.`;
    console.error(msg);
    throw new Error(msg);
  }

  // Local filesystem persistence (reliable for local & standalone instances)
  const fileRepo = new FilePromptRepository(process.env.DATA_DIR);
  await fileRepo.init();
  repositoryInstance = fileRepo;
  return repositoryInstance;
}

export * from './promptRepository';
export * from './firestorePromptRepository';
export * from './filePromptRepository';
