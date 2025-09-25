import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase config from the Firebase Console (frontend setup)
const firebaseConfig = {
  apiKey: "AIzaSyBbbzrH6IueeGM9btiCYngcPDgG7_eTk6U",
  authDomain: "trash2track.firebaseapp.com",
  projectId: "trash2track",
  storageBucket: "trash2track.firebasestorage.app",
  messagingSenderId: "107012570147",
  appId: "1:107012570147:web:cb830dcc6f7f73957e8596"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
