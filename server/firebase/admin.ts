import { applicationDefault, getApp, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

export function getAdminApp() {
  try {
    return getApp();
  } catch {
    return initializeApp({
      credential: applicationDefault(),
      projectId: firebaseConfig.projectId,
    });
  }
}

export function getAdminFirestore() {
  const app = getAdminApp();
  const databaseId = process.env.FIRESTORE_DATABASE_ID || firebaseConfig.firestoreDatabaseId;
  return databaseId ? getFirestore(app, databaseId) : getFirestore(app);
}
