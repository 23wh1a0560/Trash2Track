import React, { useState } from "react";
import { auth } from "../firebase/firebase";  // Firebase authentication
import { useNavigate } from "react-router-dom"; // For redirecting after login

const Login = () => {
  const [email, setEmail] = useState(""); // Store email input
  const [password, setPassword] = useState(""); // Store password input
  const [error, setError] = useState(""); // For error messages
  const history = useNavigate(); // To redirect to dashboard after successful login

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      // Redirect to the Dashboard once logged in
      history("/dashboard");
    } catch (error) {
      setError(error.message); // Handle login error
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        {error && <p>{error}</p>} {/* Display error message */}
      </form>
    </div>
  );
};

export default Login;
