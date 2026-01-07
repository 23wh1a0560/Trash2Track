// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTtzdlcyA6VHE0TwUJ2oHzelhHEfDZfnA",
  authDomain: "trash2track-1dca2.firebaseapp.com",
  projectId: "trash2track-1dca2",
  storageBucket: "trash2track-1dca2.firebasestorage.app",
  messagingSenderId: "124525332510",
  appId: "1:124525332510:web:7c1f2cfbb82961d2bf060f",
  measurementId: "G-B4PCNSCBH7"
};


// Initialize Firebase


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {app,auth};
//const analytics = getAnalytics(app);