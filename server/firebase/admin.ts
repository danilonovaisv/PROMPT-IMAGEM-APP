import { applicationDefault, getApp, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Normalize project ID and database ID so environment variables align with
// the application's configured Firebase project and database.
const resolvedProjectId =
  firebaseConfig.projectId && firebaseConfig.projectId.trim() !== ''
    ? firebaseConfig.projectId
    : process.env.GOOGLE_CLOUD_PROJECT;

const resolvedDatabaseId =
  firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId.trim() !== ''
    ? firebaseConfig.firestoreDatabaseId
    : process.env.FIRESTORE_DATABASE_ID;

if (firebaseConfig.projectId && process.env.GOOGLE_CLOUD_PROJECT && process.env.GOOGLE_CLOUD_PROJECT !== firebaseConfig.projectId) {
  process.env.GOOGLE_CLOUD_PROJECT = firebaseConfig.projectId;
}
if (firebaseConfig.firestoreDatabaseId && process.env.FIRESTORE_DATABASE_ID && process.env.FIRESTORE_DATABASE_ID !== firebaseConfig.firestoreDatabaseId) {
  process.env.FIRESTORE_DATABASE_ID = firebaseConfig.firestoreDatabaseId;
}

export function getAdminApp() {
  try {
    return getApp();
  } catch {
    return initializeApp({
      credential: applicationDefault(),
      projectId: resolvedProjectId,
    });
  }
}

export function getAdminFirestore() {
  const app = getAdminApp();
  const databaseId = resolvedDatabaseId;
  return databaseId ? getFirestore(app, databaseId) : getFirestore(app);
}
