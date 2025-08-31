// models/Job.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    companyName: { type: String, required: true },
    location: { type: String, required: true },
    jobType: { type: String, required: true },
    salaryRange: { type: String },
    applicationDeadline: { type: Date },
    jobDescription: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Job', jobSchema);