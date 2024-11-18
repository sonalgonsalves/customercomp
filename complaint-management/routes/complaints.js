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

// POST: Update the status of a complaint
// Update complaint status
router.post("/updateStatus", async (req, res) => {
  const { id, status } = req.body; // Extract the id and new status from the request body

  try {
    // Find the complaint by ID and update its status
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      { status }, // Update the status field
      { new: true } // Return the updated document
    );

    if (!updatedComplaint) {
      return res.status(404).send("Complaint not found");
    }

    // Return the updated complaint as a response
    res.json(updatedComplaint);
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
