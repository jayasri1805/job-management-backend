require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Job = require("./models/job");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/jobportal", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// GET all jobs
app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: 1 }).lean(); // sort ascending so defaults remain in order
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching jobs" });
  }
});

// POST create job
app.post("/api/jobs", async (req, res) => {
  try {
    const body = req.body || {};
    // basic validation: required fields
    if (!body.jobTitle || !body.companyName) {
      return res.status(400).json({ message: "jobTitle and companyName are required" });
    }

    const newJob = new Job(body);
    const saved = await newJob.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating job:", err);
    res.status(400).json({ message: "Error creating job", error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
