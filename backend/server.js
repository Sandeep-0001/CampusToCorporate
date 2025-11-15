require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/student');
const Student = require('./models/Student');
const { fetchLeetCodeStats } = require('./services/leetcode');

const app = express();

// Middleware
app.use(cors({ origin: ['https://campus-to-corporate.vercel.app','http://localhost:5173'], credentials: true }));
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

// Simple backend job to periodically refresh all students' LeetCode stats
const AUTO_REFRESH_MINUTES = Number(process.env.AUTO_REFRESH_MINUTES || 60); // default 60 minutes
if (AUTO_REFRESH_MINUTES > 0) {
  const intervalMs = AUTO_REFRESH_MINUTES * 60 * 1000;

  const runAutoRefresh = async () => {
    try {
      const students = await Student.find({});
      const concurrency = 10;
      for (let i = 0; i < students.length; i += concurrency) {
        const chunk = students.slice(i, i + concurrency);
        await Promise.allSettled(
          chunk.map(async (s) => {
            const stats = await fetchLeetCodeStats(s.leetcodeUsername);
            if (!stats) return;
            s.easySolved = stats.easySolved;
            s.mediumSolved = stats.mediumSolved;
            s.hardSolved = stats.hardSolved;
            s.contestRating = stats.contestRating;
            s.lastUpdated = new Date();
            await s.save();
          })
        );
      }
      console.log('Auto refresh completed');
    } catch (err) {
      console.error('Auto refresh failed:', err.message || err);
    }
  };

  setInterval(runAutoRefresh, intervalMs);
}
