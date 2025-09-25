const express = require("express");
const { db } = require("../firebase/firebase");
const router = express.Router();

// Add a new report
router.post("/add", async (req, res) => {
  const { uid, title, description } = req.body;
  const reportData = { title, description, uid, createdAt: new Date() };

  try {
    const reportRef = db.collection("reports").doc();
    await reportRef.set(reportData);
    res.status(201).json({ message: "Report added", reportId: reportRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all reports for a user
router.get("/user/:uid", async (req, res) => {
  const { uid } = req.params;

  try {
    const snapshot = await db.collection("reports").where("uid", "==", uid).get();
    const reports = snapshot.docs.map(doc => doc.data());
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
