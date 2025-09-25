import React from "react";
import ReactDOM from "react-dom/client";
// import ReactDOM from "react-dom";
import "./index.css";  // Global CSS (optional)
import App from "./App";  // Main App component
import { BrowserRouter as Router } from "react-router-dom"; // Optional: for routing

// ReactDOM.render(
//   <App />,
//   document.getElementById("root")  // Renders the App inside the <div id="root"></div> in index.html
// );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
