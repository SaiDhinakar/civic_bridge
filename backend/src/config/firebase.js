const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

console.log('🔥 [FIREBASE] Initializing Firebase Admin SDK...');

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

// Validate credentials exist
if (!serviceAccount.projectId || !serviceAccount.privateKey || !serviceAccount.clientEmail) {
  console.warn('⚠️  [FIREBASE] Missing Firebase credentials in .env file');
  console.warn('   Required: FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL');
}

try {
  // Initialize Firebase Admin
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
  console.log('✅ [FIREBASE] Firebase Admin SDK initialized successfully');
} catch (error) {
  console.error('❌ [FIREBASE] Error initializing Firebase:', error.message);
  throw error;
}

const db = admin.firestore();
const auth = admin.auth();

console.log('✅ [FIREBASE] Firestore and Auth connected');

module.exports = {
  admin,
  db,
  auth,
};
