const express = require("express");
const { auth } = require("../firebase/firebase");
const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const userRecord = await auth.createUser({ email, password });
    res.status(201).json({ message: "User created", userId: userRecord.uid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
