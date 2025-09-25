// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // <-- Import
require('dotenv').config();
const postsRouter = require('./routes/posts');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 4000; // Fallback to 5000 if not in .env

// --- MIDDLEWARE SECTION ---
// 1. CORS MIDDLEWARE (must come first)
app.use(cors({ origin: 'http://localhost:3000' }));

// 2. JSON PARSER MIDDLEWARE (must come after CORS)
app.use(express.json());

// 3. ROUTER MIDDLEWARE (must come last)
app.use('/api/posts', postsRouter);

// --- Connect to MongoDB ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected!"))
    .catch(err => console.log("MongoDB Connection Error: ", err));

// --- Test Route ---
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// --- Start the Server ---
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
