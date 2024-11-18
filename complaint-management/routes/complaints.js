const express = require("express");
const router = express.Router();
const Complaint = require("../models/complaint");

// POST: Add a new complaint
router.post("/", async (req, res) => {
  try {
    const complaint = new Complaint(req.body);
    const savedComplaint = await complaint.save();
    res.status(201).json(savedComplaint);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET: Fetch all complaints
router.get("/", async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
