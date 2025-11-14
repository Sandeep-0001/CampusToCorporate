require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/student');

const app = express();

// Middleware
app.use(cors({ origin: ['https://campus-to-corporate.vercel.app'], credentials: true }));
app.use(express.json());

// Disable ETag and caching for API responses
app.set('etag', false);
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
  }
  next();
});

// DB
connectDB();

// Routes
app.get('/', (_, res) => res.json({ status: 'ok', service: 'leetcode-leaderboard-backend' }));
app.use('/api/students', studentRoutes);

// Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
