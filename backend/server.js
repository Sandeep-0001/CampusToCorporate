require('dotenv').config();
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/student');
const Student = require('./models/Student');
const { fetchLeetCodeStats } = require('./services/leetcode');
const { invalidateLeaderboardCache } = require('./services/leaderboardCache');

const app = express();

// Middleware
app.use(cors({ origin: ['https://campus-to-corporate.vercel.app','http://localhost:5173'], credentials: true }));
app.use(express.json());
app.use(compression());

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

// One-time backfill for stored totalSolved (fast, helps indexed sorting)
(async () => {
  try {
    await Student.updateMany(
      {
        $or: [
          { totalSolved: { $exists: false } },
          { totalSolved: null },
          {
            totalSolved: 0,
            $or: [
              { easySolved: { $gt: 0 } },
              { mediumSolved: { $gt: 0 } },
              { hardSolved: { $gt: 0 } },
            ]
          }
        ]
      },
      [
        {
          $set: {
            totalSolved: {
              $add: [
                { $ifNull: ['$easySolved', 0] },
                { $ifNull: ['$mediumSolved', 0] },
                { $ifNull: ['$hardSolved', 0] }
              ]
            }
          }
        }
      ]
    );
  } catch (err) {
    console.error('totalSolved backfill failed:', err?.message || err);
  }
})();

// One-time backfill for normalized yearLevel (enables fast indexed year filtering)
(async () => {
  try {
    await Student.updateMany(
      { $or: [{ yearLevel: { $exists: false } }, { yearLevel: null }, { yearLevel: '' }] },
      [
        {
          $set: {
            yearLevel: {
              $switch: {
                branches: [
                  {
                    case: {
                      $regexMatch: {
                        input: { $toLower: { $ifNull: ['$batch', ''] } },
                        regex: /(\b2\b|2nd|second)/
                      }
                    },
                    then: '2'
                  },
                  {
                    case: {
                      $regexMatch: {
                        input: { $toLower: { $ifNull: ['$batch', ''] } },
                        regex: /(\b3\b|3rd|third)/
                      }
                    },
                    then: '3'
                  },
                  {
                    case: {
                      $regexMatch: {
                        input: { $toLower: { $ifNull: ['$batch', ''] } },
                        regex: /(\b4\b|4th|fourth)/
                      }
                    },
                    then: '4'
                  }
                ],
                default: ''
              }
            }
          }
        }
      ]
    );
  } catch (err) {
    console.error('yearLevel backfill failed:', err?.message || err);
  }
})();

// Ensure Mongo indexes exist (helps leaderboard stay fast in prod)
(async () => {
  try {
    await Student.syncIndexes();
  } catch (err) {
    console.error('Index sync failed:', err?.message || err);
  }
})();

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
            s.totalSolved = (stats.easySolved || 0) + (stats.mediumSolved || 0) + (stats.hardSolved || 0);
            s.contestRating = stats.contestRating;
            s.lastUpdated = new Date();
            await s.save();
          })
        );
      }
      invalidateLeaderboardCache();
      console.log('Auto refresh completed');
    } catch (err) {
      console.error('Auto refresh failed:', err.message || err);
    }
  };

  setInterval(runAutoRefresh, intervalMs);
}
