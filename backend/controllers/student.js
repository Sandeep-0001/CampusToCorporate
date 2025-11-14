const Student = require('../models/Student');
const { fetchLeetCodeStats } = require('../services/leetcode');
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
        batch: displayBatch || (getVal(row, ['batch', 'year']) || '')
      });
    }

    if (docs.length === 0) {
      const detectedHeaders = Object.keys(rows[0] || {});
      return res.status(400).json({
        message: 'No valid rows found. Ensure your first sheet has headers: name, leetcodeUsername',
        detectedHeaders
      });
    }

    // Fetch stats in sequence to avoid rate issues; tolerate failures
    for (const d of docs) {
      try {
        const stats = await fetchLeetCodeStats(d.leetcodeUsername);
        d.easySolved = stats.easySolved;
        d.mediumSolved = stats.mediumSolved;
        d.hardSolved = stats.hardSolved;
        d.contestRating = stats.contestRating;
      } catch (_) {
        d.easySolved = d.easySolved || 0;
        d.mediumSolved = d.mediumSolved || 0;
        d.hardSolved = d.hardSolved || 0;
        d.contestRating = d.contestRating || 0;
      }
      d.lastUpdated = new Date();
    }

    // Upsert each student: ensures existing users get updated batch/year and stats
    let inserted = 0;
    let updated = 0;
    for (const d of docs) {
      const resUpsert = await Student.updateOne(
        { leetcodeUsername: d.leetcodeUsername },
        {
          $set: {
            name: d.name,
            universityId: d.universityId,
            batch: d.batch, // selected year wins
            easySolved: d.easySolved,
            mediumSolved: d.mediumSolved,
            hardSolved: d.hardSolved,
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
    const skipped = docs.length - (inserted + updated);
    return res.status(201).json({ message: `Inserted ${inserted}, updated ${updated}`, inserted, updated, skipped, year: selectedYear || undefined });
  } catch (err) {
    console.error('Upload error:', err.message);
    return res.status(500).json({ message: 'Failed to process file', detail: err.message });
  }
};

// GET /api/students/leaderboard
exports.getLeaderboard = async (_req, res) => {
  try {
    const students = await Student.find({}).lean();
    const enriched = students.map(s => ({
      ...s,
      totalSolved: (s.easySolved || 0) + (s.mediumSolved || 0) + (s.hardSolved || 0)
    }));
    enriched.sort((a, b) => {
      if (b.totalSolved !== a.totalSolved) return b.totalSolved - a.totalSolved;
      return (b.contestRating || 0) - (a.contestRating || 0);
    });
    const ranked = enriched.map((s, i) => ({ rank: i + 1, ...s }));
    return res.json(ranked);
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
    student.easySolved = stats.easySolved;
    student.mediumSolved = stats.mediumSolved;
    student.hardSolved = stats.hardSolved;
    student.contestRating = stats.contestRating;
    student.lastUpdated = new Date();
    await student.save();
    return res.json({ message: 'Updated', student });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// POST /api/students/refresh-all
exports.refreshAll = async (_req, res) => {
  try {
    const students = await Student.find({});
    const concurrency = 5;
    let updated = 0;
    let failed = 0;
    for (let i = 0; i < students.length; i += concurrency) {
      const chunk = students.slice(i, i + concurrency);
      const results = await Promise.allSettled(
        chunk.map(async (s) => {
          const stats = await fetchLeetCodeStats(s.leetcodeUsername);
          s.easySolved = stats.easySolved;
          s.mediumSolved = stats.mediumSolved;
          s.hardSolved = stats.hardSolved;
          s.contestRating = stats.contestRating;
          s.lastUpdated = new Date();
          await s.save();
          return true;
        })
      );
      results.forEach((r) => {
        if (r.status === 'fulfilled') updated += 1;
        else failed += 1;
      });
    }
    return res.json({ message: `Refreshed ${updated} students`, updated, failed, total: students.length });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
