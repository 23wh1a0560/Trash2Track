const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const reportRoutes = require("./routes/reports");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
