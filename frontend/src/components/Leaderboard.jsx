import React from 'react';

export default function Leaderboard({ data, onRefreshStudent }) {
  const formatLastSubmit = (dt) => {
    if (!dt) return '-';
    const d = new Date(dt);
    const now = new Date();
    const startOfDay = (x) => new Date(x.getFullYear(), x.getMonth(), x.getDate());
    const diffDays = Math.floor((startOfDay(now) - startOfDay(d)) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return d.toLocaleDateString();
  };

  if (!data || data.length === 0) {
    return (
      <div className="rounded-lg border border-slate-700 bg-slate-800 p-8 text-center text-slate-300">
        No records found for the selected year.
      </div>
    );
  }

  const rankBadge = (rank) => {
    const base = 'inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold tabular-nums';
    if (rank === 1) return <span className={`${base} bg-gradient-to-br from-yellow-300 to-yellow-500 text-black`}>1</span>;
    if (rank === 2) return <span className={`${base} bg-gradient-to-br from-gray-200 to-gray-400 text-black`}>2</span>;
    if (rank === 3) return <span className={`${base} bg-gradient-to-br from-amber-300 to-amber-500 text-black`}>3</span>;
    return <span className={`${base} bg-slate-900/70 border border-slate-700 text-slate-100/90`}>{rank}</span>;
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-700 bg-slate-800">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-900/80 sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
          <tr className="border-b border-slate-700/80">
            <th className="px-4 py-3 text-left font-semibold">Rank</th>
            <th className="px-4 py-3 text-left font-semibold">Roll No.</th>
            <th className="px-4 py-3 text-left font-semibold">Name</th>
            <th className="px-4 py-3 text-right font-semibold tabular-nums text">Easy</th>
            <th className="px-4 py-3 text-right font-semibold tabular-nums">Medium</th>
            <th className="px-4 py-3 text-right font-semibold tabular-nums">Hard</th>
            <th className="px-4 py-3 text-right font-semibold tabular-nums">Total</th>
            <th className="px-4 py-3 text-right font-semibold tabular-nums">Rating</th>
          </tr>
        </thead>
        <tbody>
          {data.map((s, i) => (
            <tr key={s._id || s.rollNumber || i} className="odd:bg-white/5 hover:bg-cyan-600/10 transition-colors">
              <td className="px-4 py-3 text-left">{rankBadge(i + 1)}</td>
              <td className="px-4 py-3 text-left tabular-nums font-mono">{s.universityId ? String(s.universityId) : (s.rollNumber || s.roll || s.rollNo || '-')}</td>
              <td className="px-4 py-3">
                <a
                  href={`https://leetcode.com/${s.leetcodeUsername}/`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-300 hover:underline"
                  title={`Open ${s.leetcodeUsername} on LeetCode (also refresh stats)`}
                  onClick={() => {
                    if (onRefreshStudent && s._id) {
                      // Fire and forget; do not block navigation
                      onRefreshStudent(s._id);
                    }
                  }}
                >
                  {s.name}
                </a>
              </td>
              <td className="px-4 py-3 text-right tabular-nums text-green-500">{s.easySolved}</td>
              <td className="px-4 py-3 text-right tabular-nums text-yellow-500">{s.mediumSolved}</td>
              <td className="px-4 py-3 text-right tabular-nums text-red-500">{s.hardSolved}</td>
              <td className="px-4 py-3 text-right tabular-nums text-cyan-500">{s.totalSolved}</td>
              <td className="px-4 py-3 text-right tabular-nums text-cyan-500">{s.contestRating?.toFixed ? s.contestRating.toFixed(2) : s.contestRating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
