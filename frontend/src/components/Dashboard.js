// frontend/src/components/SignInButton.js
import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function SignInButton() {
  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("User signed in:", result.user);
        alert(`Welcome ${result.user.displayName}!`);
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
        alert(`Sign-in failed: ${error.message}`);
      });
  };

  return (
    <button onClick={handleGoogleSignIn}>
      Sign In with Google
    </button>
  );
}
