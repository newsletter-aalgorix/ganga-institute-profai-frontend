import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: String(import.meta.env.VITE_FIREBASE_API_KEY || '').trim(),
  authDomain: String(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '').trim(),
  projectId: String(import.meta.env.VITE_FIREBASE_PROJECT_ID || '').trim(),
  storageBucket: String(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '').trim(),
  messagingSenderId: String(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '').trim(),
  appId: String(import.meta.env.VITE_FIREBASE_APP_ID || '').trim(),
  measurementId: String(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || '').trim(),
};

const missingFirebaseEnvKeys = [
  ['VITE_FIREBASE_API_KEY', firebaseConfig.apiKey],
  ['VITE_FIREBASE_AUTH_DOMAIN', firebaseConfig.authDomain],
  ['VITE_FIREBASE_PROJECT_ID', firebaseConfig.projectId],
  ['VITE_FIREBASE_APP_ID', firebaseConfig.appId],
]
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingFirebaseEnvKeys.length > 0) {
  throw new Error(
    `Missing Firebase environment variables: ${missingFirebaseEnvKeys.join(', ')}`,
  );
}

const looksLikePlaceholder = /your[_-]?api[_-]?key|your[-_]?firebase|change[-_]?me|replace[-_]?me/i;
const looksLikeFirebaseApiKey = /^AIza[0-9A-Za-z_-]{30,}$/;

if (looksLikePlaceholder.test(firebaseConfig.apiKey) || !looksLikeFirebaseApiKey.test(firebaseConfig.apiKey)) {
  throw new Error(
    'Invalid Firebase API key. Set VITE_FIREBASE_API_KEY to the Web API key from Firebase Console (Project settings -> Your apps -> Web app config).',
  );
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
