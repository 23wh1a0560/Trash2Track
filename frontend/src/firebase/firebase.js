import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase config from the Firebase Console (frontend setup)
const firebaseConfig = {
  apiKey: "AIzaSyDYb1rK3itGEZDWekHYfpSa87VxI4KF_k4",
  authDomain: "trash2track-ab0ac.firebaseapp.com",
  projectId: "trash2track-ab0ac",
  storageBucket: "trash2track-ab0ac.firebasestorage.app",
  messagingSenderId: "870364335001",
  appId: "1:870364335001:web:f0d10eb8fe2eea7b60a108",
  measurementId: "G-PECQEHWKFY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
