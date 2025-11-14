import React, { useEffect, useState } from 'react';
import { getLeaderboard, uploadStudents, refreshAll as refreshAllApi } from '../services/api';
import FileUpload from '../components/FileUpload.jsx';
import Leaderboard from '../components/Leaderboard.jsx';

export default function LeaderboardPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [yearFilter, setYearFilter] = useState('2'); // 2 | 3 | 4
  const [searchQuery, setSearchQuery] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const res = await getLeaderboard();
      setData(res);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleUpload = async (file) => {
    await uploadStudents(file, yearFilter);
    await load();
  };

  const handleRefreshAll = () => {
    try {
      refreshAllApi().catch(() => {});
    } catch (_) {
      // ignore
    }
    setTimeout(() => { load(); }, 5000);
  };

  const deriveYear = (s) => {
    const raw = (s?.batch || s?.year || '').toString().toLowerCase();
    if (!raw) return null;
    if (/(^|\b)(2|2nd|second)\b/.test(raw)) return '2';
    if (/(^|\b)(3|3rd|third)\b/.test(raw)) return '3';
    if (/(^|\b)(4|4th|fourth)\b/.test(raw)) return '4';
    return null;
  };

  const shownData = data.filter((s) => {
    const y = deriveYear(s);
    return y === yearFilter;
  });

  const filteredData = shownData.filter((s) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    const name = (s?.name || '').toString().toLowerCase();
    return name.includes(q);
  });

  const totals = {
    students: filteredData.length,
    solved: filteredData.reduce((a, b) => a + (Number(b.totalSolved) || 0), 0),
    ratingAvg: (() => {
      const ratings = filteredData.map((s) => Number(s.contestRating)).filter((n) => !Number.isNaN(n));
      if (!ratings.length) return 0;
      const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
      return Math.round(avg);
    })(),
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)]">
      <header className="border-b border-slate-700/70 bg-linear-to-b from-slate-900 to-slate-800/40">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-wide">LeetCode Leaderboard</h1>
              <p className="text-sm md:text-base text-slate-300 mt-1">Track progress, compare rankings, and manage student submissions.</p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wide text-slate-400">Year</span>
                <select
                  id="yearFilter"
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="bg-slate-800 text-slate-100 border border-slate-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
                >
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name..."
                className="w-64 bg-slate-800 text-slate-100 border border-slate-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 placeholder:text-slate-400"
                aria-label="Search by name"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <div className="md:hidden space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wide text-slate-400">Year</span>
            <select
              id="yearFilter"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="bg-slate-800 text-slate-100 border border-slate-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 w-full"
            >
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name..."
            className="w-full bg-slate-800 text-slate-100 border border-slate-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 placeholder:text-slate-400"
            aria-label="Search by name"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
            <div className="text-sm text-slate-400">Students</div>
            <div className="text-2xl font-semibold mt-1 tabular-nums">{totals.students}</div>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
            <div className="text-sm text-slate-400">Total Solved</div>
            <div className="text-2xl font-semibold mt-1 tabular-nums">{totals.solved}</div>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
            <div className="text-sm text-slate-400">Avg Contest Rating</div>
            <div className="text-2xl font-semibold mt-1 tabular-nums">{totals.ratingAvg}</div>
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_360px] gap-6">
          <div className="space-y-4">
            <div className="flex justify-end">
              <button
                onClick={handleRefreshAll}
                className="px-3 py-1.5 rounded-md bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 border border-transparent"
                title="Refresh all students' LeetCode stats in background"
              >
                Refresh All
              </button>
            </div>
            {loading ? (
              <div className="rounded-xl border border-slate-700 bg-slate-800 p-6 text-sm text-slate-300">Loading...</div>
            ) : (
              <Leaderboard data={filteredData} />
            )}
          </div>
          <aside className="space-y-4">
            <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">
              <FileUpload onUpload={handleUpload} />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
