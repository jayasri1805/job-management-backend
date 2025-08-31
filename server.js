// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const job = require('./models/job');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected successfully!');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// API Routes
app.get('/api/jobs', async (req, res) => {
    try {
        const jobs = await job.find({});
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching jobs', error });
    }
});

// server.js

// ... other code

app.post('/api/jobs', async (req, res) => {
    try {
        // Log the incoming data to the console
        console.log("Received data from frontend:", req.body); 

        // Check if the received data is empty
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Request body is empty." });
        }

        const newJob = new Job(req.body);
        await newJob.save();
        res.status(201).json(newJob);
    } catch (error) {
        console.error('Error creating job:', error); // Log the specific error
        res.status(400).json({ message: 'Error creating job', error });
    }
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});