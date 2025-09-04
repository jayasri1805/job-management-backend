const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true, trim: true },
  companyName: { type: String, required: true, trim: true },
  location: { type: String, trim: true },
  jobType: { type: String, trim: true },
  salaryMin: { type: Number, default: 0 },
  salaryMax: { type: Number, default: 0 },
  description: { type: String, default: "" },
  requirements: { type: String, default: "" },
  responsibilities: { type: String, default: "" },
  applicationDeadline: { type: String, default: null },
  logoUrl: { type: String, default: "/logos/default.png" },
  postedAgo: { type: String, default: "24h Ago" },
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
