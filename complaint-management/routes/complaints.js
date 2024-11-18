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
router.post("/updateStatus", async (req, res) => {
  const { id, status } = req.body;  // Destructure id and status from the request body

  try {
    // Find the complaint by id
    const complaint = await Complaint.findById(id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // Update the complaint's status
    complaint.status = status;
    complaint.changes = `Status updated to ${status}`;  // Optionally add changes tracking

    // Save the updated complaint
    const updatedComplaint = await complaint.save();

    res.status(200).json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
