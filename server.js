// server.js

const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./db');
const Userdb = require('./models');
const port = 3001;

// Connect to the database
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// Home route
app.get("/", (req, res) => {
    res.send("<h1>Home page of a Job portal </h1>")
});

// Create a new job
app.post("/api/jobs", async (req, res) => {
    const { title,
        company,
        location,
        description, salary } = req.body;
    try {
        const newJob = new Userdb({
            title,
            company,
            location,
            description,
            salary
        });
        await newJob.save();
        res.status(201).json(newJob);
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json(
            { message: 'Server Error' }
        );
    }
});

// Get all jobs
app.get("/api/jobs", async (req, res) => {
    try {
        const jobs = await Userdb.find();
        res.json(jobs);
    } catch (error) {
        console.error('Error getting jobs:', error);
        res.status(500).json(
            { message: 'Server Error' }
        );
    }
});

// Start the server
app.listen(port, () => {
    console.log(
        `Server is started at port no ${port}`);
});
