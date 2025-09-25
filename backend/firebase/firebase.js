const admin = require("firebase-admin");
const serviceAccount = require("./trash2track-ab0ac-firebase-adminsdk-fbsvc-65ac9eb7ab.json"); // Path to your Firebase service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<your-database-url>.firebaseio.com"  // Optional for Realtime Database
});

// Export Firebase services (auth, firestore, storage)
const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();

module.exports = { db, auth, storage };
