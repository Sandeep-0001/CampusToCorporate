const Student = require('../models/Student');
const { fetchLeetCodeStats } = require('../services/leetcode');
const { makeKey, getCached, setCached, invalidateLeaderboardCache } = require('../services/leaderboardCache');
const xlsx = require('xlsx');

// Normalize a LeetCode identifier (username or profile URL) to a plain username
function normalizeUsername(value) {
  if (!value) return '';
  const raw = String(value).trim();
  // If it's a URL, extract path segments
  try {
    const url = new URL(raw);
    const parts = url.pathname.split('/').filter(Boolean); // non-empty segments
    // Possible patterns: /<username>/ or /u/<username>/
    let user = '';
    if (parts.length >= 2 && parts[0].toLowerCase() === 'u') {
      user = parts[1];
    } else if (parts.length >= 1) {
      user = parts[0];
    }
    return user.trim();
  } catch (_) {
    // Not a URL; could be plain username or something like leetcode.com/xyz
    const stripped = raw
      .replace(/^https?:\/\/([^/]*\.)?leetcode\.com\//i, '')
      .replace(/^u\//i, '')
      .replace(/\//g, '')
      .trim();
    return stripped;
  }
}

function normalizeYearLevel(raw) {
  const s = (raw || '').toString().toLowerCase();
  if (!s) return '';
  if (/(^|\b)(2|2nd|second)\b/.test(s)) return '2';
  if (/(^|\b)(3|3rd|third)\b/.test(s)) return '3';
  if (/(^|\b)(4|4th|fourth)\b/.test(s)) return '4';
  return '';
}

// Normalize object keys: lowercased, remove non-alphanumeric
function normalizeKey(k) {
  return String(k || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

function getVal(obj, variants) {
  for (const v of variants) {
    if (obj[v] != null && obj[v] !== '') return obj[v];
  }
  return '';
}

// POST /api/students/upload
exports.uploadStudents = async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const file = req.files.file;
    const selectedYear = (req.body?.year || '').toString(); // '2' | '3' | '4' or ''
    const displayBatch = selectedYear === '2' ? '2nd Year' : selectedYear === '3' ? '3rd Year' : selectedYear === '4' ? '4th Year' : '';
    const workbook = xlsx.read(file.data, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (!Array.isArray(rows) || rows.length === 0) {
      return res.status(400).json({ message: 'File is empty or invalid' });
    }

    const docs = [];
    // Build normalized rows with normalized keys
    const normalizedRows = rows.map((r) => {
      const n = {};
      Object.keys(r).forEach((k) => {
        n[normalizeKey(k)] = r[k];
      });
      return n;
    });

    for (const row of normalizedRows) {
      const name = getVal(row, ['name', 'fullname', 'studentname']);
      const rawUser = getVal(row, [
        'leetcodeusername',
        'leetcode',
        'leetcodeid',
        'leetcodeurl',
        'leetcodeprofile',
        'username',
        'profile',
        'profileurl'
      ]);
      if (!name || !rawUser) continue;
      docs.push({
        name: String(name).trim(),
        leetcodeUsername: normalizeUsername(rawUser),
        universityId: getVal(row, ['universityid', 'roll', 'rollno', 'rollnumber']) || '',
        batch: displayBatch || (getVal(row, ['batch', 'year']) || ''),
        yearLevel: selectedYear || normalizeYearLevel(getVal(row, ['batch', 'year']))
      });
    }

    if (docs.length === 0) {
      const detectedHeaders = Object.keys(rows[0] || {});
      return res.status(400).json({
        message: 'No valid rows found. Ensure your first sheet has headers: name, leetcodeUsername',
        detectedHeaders
      });
    }

    // Fetch stats in sequence to avoid rate issues; tolerate failures.
    // If LeetCode fetch fails for a user, we keep their stats as-is (or 0 on first insert).
    for (const d of docs) {
      try {
        const stats = await fetchLeetCodeStats(d.leetcodeUsername);
        if (stats) {
          d.easySolved = stats.easySolved;
          d.mediumSolved = stats.mediumSolved;
          d.hardSolved = stats.hardSolved;
          d.contestRating = stats.contestRating;
        } else {
          // stats == null -> fetch failed; do not forcibly set 0 here
          d.easySolved = d.easySolved ?? 0;
          d.mediumSolved = d.mediumSolved ?? 0;
          d.hardSolved = d.hardSolved ?? 0;
          d.contestRating = d.contestRating ?? 0;
        }
      } catch (e) {
        console.error('UploadStudents: failed to fetch stats for', d.leetcodeUsername, e?.message || e);
        d.easySolved = d.easySolved ?? 0;
        d.mediumSolved = d.mediumSolved ?? 0;
        d.hardSolved = d.hardSolved ?? 0;
        d.contestRating = d.contestRating ?? 0;
      }
      d.lastUpdated = new Date();
    }

    // Upsert each student: ensures existing users get updated batch/year and stats
    let inserted = 0;
    let updated = 0;
    for (const d of docs) {
      const totalSolved = (Number(d.easySolved) || 0) + (Number(d.mediumSolved) || 0) + (Number(d.hardSolved) || 0);
      const resUpsert = await Student.updateOne(
        { leetcodeUsername: d.leetcodeUsername },
        {
          $set: {
            name: d.name,
            universityId: d.universityId,
            batch: d.batch, // selected year wins
            yearLevel: d.yearLevel || undefined,
            easySolved: d.easySolved,
            mediumSolved: d.mediumSolved,
            hardSolved: d.hardSolved,
            totalSolved,
            contestRating: d.contestRating,
            lastUpdated: d.lastUpdated
          }
        },
        { upsert: true }
      );
      if (resUpsert.upsertedCount && resUpsert.upsertedCount > 0) inserted += 1;
      else if (resUpsert.modifiedCount && resUpsert.modifiedCount > 0) updated += 1;
      else updated += 0; // no change
    }
    invalidateLeaderboardCache();
    const skipped = docs.length - (inserted + updated);
    return res.status(201).json({ message: `Inserted ${inserted}, updated ${updated}`, inserted, updated, skipped, year: selectedYear || undefined });
  } catch (err) {
    console.error('Upload error:', err.message);
    return res.status(500).json({ message: 'Failed to process file', detail: err.message });
  }
};

// GET /api/students/leaderboard
exports.getLeaderboard = async (req, res) => {
  try {
    const year = (req.query?.year || '').toString().trim(); // '2' | '3' | '4'
    const q = (req.query?.q || '').toString().trim();
    const hasPagination = req.query?.page != null || req.query?.limit != null;
    const page = Math.max(1, Number(req.query?.page || 1));
    const limit = Math.min(10_000, Math.max(1, Number(req.query?.limit || 50)));
    const skip = (page - 1) * limit;

    const filter = {};
    if (year) {
      // Prefer normalized field for performance.
      filter.yearLevel = year;
    }
    if (q) {
      const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.name = { $regex: escaped, $options: 'i' };
    }

    // Backwards compatibility:
    // - If client does NOT pass page/limit, return the legacy array response.
    // - If page/limit are present, return the new paginated contract.
    if (!hasPagination) {
      const students = await Student.find(filter)
        .sort({ totalSolved: -1, hardSolved: -1, contestRating: -1 })
        .select({
          name: 1,
          leetcodeUsername: 1,
          universityId: 1,
          batch: 1,
          yearLevel: 1,
          easySolved: 1,
          mediumSolved: 1,
          hardSolved: 1,
          totalSolved: 1,
          contestRating: 1,
        })
        .lean();
      const ranked = students.map((s, i) => ({ rank: i + 1, ...s }));
      // Override global no-store for this endpoint only; safe because data is not user-specific.
      res.setHeader('Cache-Control', 'public, max-age=30, stale-while-revalidate=30');
      return res.json(ranked);
    }

    const cacheKey = makeKey({ year, page, limit, q });
    const cached = getCached(cacheKey);
    if (cached) return res.json(cached);

    const projection = {
      name: 1,
      leetcodeUsername: 1,
      universityId: 1,
      batch: 1,
      yearLevel: 1,
      easySolved: 1,
      mediumSolved: 1,
      hardSolved: 1,
      totalSolved: 1,
      contestRating: 1,
    };

    const [total, items] = await Promise.all([
      Student.countDocuments(filter),
      Student.find(filter)
        .sort({ totalSolved: -1, hardSolved: -1, contestRating: -1 })
        .skip(skip)
        .limit(limit)
        .select(projection)
        .lean(),
    ]);

    const rankedItems = items.map((s, i) => ({ rank: skip + i + 1, ...s }));
    const payload = { data: rankedItems, total, page, limit };

    // TTL keeps results snappy while staying reasonably fresh.
    setCached(cacheKey, payload, 120_000);
    res.setHeader('Cache-Control', 'public, max-age=30, stale-while-revalidate=30');
    return res.json(payload);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// POST /api/students/:id/refresh
exports.refreshStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const stats = await fetchLeetCodeStats(student.leetcodeUsername);
    if (!stats) {
      return res.status(502).json({
        message: 'Failed to refresh from LeetCode. Existing stats kept.',
        student
      });
    }

    student.easySolved = stats.easySolved;
    student.mediumSolved = stats.mediumSolved;
    student.hardSolved = stats.hardSolved;
    student.totalSolved = (stats.easySolved || 0) + (stats.mediumSolved || 0) + (stats.hardSolved || 0);
    student.contestRating = stats.contestRating;
    student.lastUpdated = new Date();
    await student.save();
    invalidateLeaderboardCache();
    return res.json({ message: 'Updated', student });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// POST /api/students/refresh-all
exports.refreshAll = async (_req, res) => {
  try {
    const students = await Student.find({});
    const concurrency = 10;
    let updated = 0;
    let failed = 0;
    for (let i = 0; i < students.length; i += concurrency) {
      const chunk = students.slice(i, i + concurrency);
      const results = await Promise.allSettled(
        chunk.map(async (s) => {
          const stats = await fetchLeetCodeStats(s.leetcodeUsername);
          if (!stats) {
            console.warn('refreshAll: failed to fetch stats for', s.leetcodeUsername);
            return false;
          }
          s.easySolved = stats.easySolved;
          s.mediumSolved = stats.mediumSolved;
          s.hardSolved = stats.hardSolved;
          s.totalSolved = (stats.easySolved || 0) + (stats.mediumSolved || 0) + (stats.hardSolved || 0);
          s.contestRating = stats.contestRating;
          s.lastUpdated = new Date();
          await s.save();
          return true;
        })
      );
      results.forEach((r) => {
        if (r.status === 'fulfilled' && r.value === true) updated += 1;
        else failed += 1;
      });
    }
    invalidateLeaderboardCache();
    return res.json({ message: `Refreshed ${updated} students`, updated, failed, total: students.length });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
