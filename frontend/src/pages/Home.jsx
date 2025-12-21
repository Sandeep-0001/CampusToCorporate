import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-linear-to-b from-slate-950 via-slate-900 to-slate-900">
      <main className="max-w-6xl mx-auto px-4 py-10 md:py-16 space-y-12">
        <section className="grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div className="space-y-5">
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-300">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              CampusToCorporate Platform
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-wide">
              Bridge the gap between
              <span className="block text-cyan-300">coding practice & corporate-ready talent.</span>
            </h1>
            <p className="text-sm md:text-base text-slate-300 max-w-xl">
              CampusToCorporate is a single hub for your university coding ecosystem: LeetCode leaderboard, upcoming contests, Resume builder & optimizer,
              code analysis, similar questions, notes, PYQs, and company-wise preparation sheets.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <NavLink
                to="https://campus-to-corporate.vercel.app/leaderboard"
                className="inline-flex items-center justify-center rounded-md bg-cyan-500 px-4 py-2.5 text-sm font-medium text-slate-950 shadow-sm hover:bg-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                View Leaderboard
              </NavLink>
              <NavLink
                to="https://contest-board.vercel.app"
                className="inline-flex items-center justify-center rounded-md border border-slate-600 bg-slate-900/60 px-4 py-2.5 text-sm font-medium text-slate-100 hover:border-cyan-400 hover:text-cyan-200"
              >
                Explore Contests
              </NavLink>
             
            </div>
            <div className="flex flex-wrap gap-6 pt-3 text-xs text-slate-400">
              <div>
                <p className="font-semibold text-slate-200">For Faculty & Coordinators</p>
                <p>Get a clear picture of campus coding culture in seconds.</p>
              </div>
              <div>
                <p className="font-semibold text-slate-200">For Students</p>
                <p>Stay consistent, compete with peers, and showcase your growth.</p>
              </div>
            </div>
          </div>
          <div>
            <div className="relative rounded-2xl border border-slate-700 bg-slate-900/70 p-5 shadow-xl shadow-cyan-900/20">
              <div className="flex items-center justify-between mb-4 text-xs text-slate-400">
                <span className="font-medium text-slate-200">Live Campus Snapshot</span>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-emerald-300 border border-emerald-500/40">Active</span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="rounded-xl bg-slate-800/70 px-3 py-3 border border-slate-700">
                  <p className="text-slate-400 mb-1">Active Coders</p>
                  <p className="text-2xl font-semibold text-cyan-300 tabular-nums">2.7K+</p>
                </div>
                <div className="rounded-xl bg-slate-800/70 px-3 py-3 border border-slate-700">
                  <p className="text-slate-400 mb-1">Problems Solved</p>
                  <p className="text-2xl font-semibold text-emerald-300 tabular-nums">400k+</p>
                </div>
                <div className="rounded-xl bg-slate-800/70 px-3 py-3 border border-slate-700">
                  <p className="text-slate-400 mb-1">Contests Tracked</p>
                  <p className="text-2xl font-semibold text-amber-300 tabular-nums">706</p>
                </div>
              </div>
              <div className="mt-5 space-y-2 text-xs text-slate-300">
                <p className="font-semibold text-slate-200">Why campuses use CampusToCorporate</p>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                  <li>Identify top performers and hidden talent using real data.</li>
                  <li>Motivate students with transparent, fair leaderboards.</li>
                  <li>Showcase your campus coding culture to industry partners.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="text-sm md:text-base font-semibold text-slate-100">
            Everything your students need in one place
          </h2>
          <div className="grid md:grid-cols-3 gap-4 text-xs">
            <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4 space-y-2">
              <p className="text-[0.7rem] font-semibold text-cyan-300 uppercase tracking-[0.18em]">LeetCode & Contests</p>
              <h3 className="text-sm font-semibold text-slate-50">Leaderboard & Contest Board</h3>
              <p className="text-slate-400">Track LeetCode performance and upcoming contests for your entire university.</p>
              <div className="flex gap-2 pt-1">
                <NavLink to="/leaderboard" className="px-3 py-1.5 rounded-md bg-cyan-500 text-slate-950 text-[0.7rem] font-medium hover:bg-cyan-400">Leaderboard</NavLink>
                <NavLink to="https://contest-board.vercel.app" className="px-3 py-1.5 rounded-md border border-slate-600 text-slate-100 text-[0.7rem] hover:border-cyan-400">Contests</NavLink>
              </div>
            </div>

            <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4 space-y-2">
              <p className="text-[0.7rem] font-semibold text-emerald-300 uppercase tracking-[0.18em]">Resume Tools</p>
              <h3 className="text-sm font-semibold text-slate-50">Resume Builder & Optimizer</h3>
              <p className="text-slate-400">Create and optimize resumes tailored for your dream job.</p>
              <div className="flex gap-2 pt-1">
                <NavLink to="https://resumegenieai.vercel.app" className="px-3 py-1.5 rounded-md bg-emerald-500 text-slate-950 text-[0.7rem] font-medium hover:bg-emerald-400">Resume Builder</NavLink>
                <NavLink to="https://resumegenie-ai.vercel.app" className="px-3 py-1.5 rounded-md border border-slate-600 text-slate-100 text-[0.7rem] hover:border-emerald-300">Resume Optimizer</NavLink>
              </div>
            </div>
             <div className="rounded-xl border border-slate-600 bg-slate-800/80 p-4 space-y-2">
              <p className="text-[0.7rem] font-semibold text-blue-300 uppercase tracking-[0.18em]">Practice Intelligence</p>
              <h3 className="text-sm font-semibold text-slate-50">Code Analyser & Similar Qs</h3>
              <p className="text-slate-400">Analyse code, find patterns in mistakes, and suggest similar LeetCode questions.</p>
              <div className="flex gap-2 pt-1">
                <NavLink to="https://code-analyser-beta.vercel.app" className="px-3 py-1.5 rounded-md bg-blue-500 text-slate-950 text-[0.7rem] font-medium hover:bg-blue-400">Code Analyser</NavLink>
                <NavLink to="https://similar-question-search.vercel.app" className="px-3 py-1.5 rounded-md border border-slate-500 text-slate-100 text-[0.7rem] hover:border-blue-300">Similar Qs</NavLink>
              </div>
            </div>
            
            <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4 space-y-2">
              <p className="text-[0.7rem] font-semibold text-amber-300 uppercase tracking-[0.18em]">Study Material</p>
              <h3 className="text-sm font-semibold text-slate-50">Notes, PYQs & Company Sheets</h3>
              <p className="text-slate-400">Central library for notes, previous year questions, and company-wise preparation sheets.</p>
              <div className="flex flex-wrap gap-2 pt-1">
                <NavLink to="https://gla-notes.vercel.app" className="px-3 py-1.5 rounded-md border  bg-amber-300 border-slate-600 text-slate-950 text-[0.7rem] hover:border-amber-300">Notes</NavLink>
                <NavLink to="https://companywise-sheet.vercel.app" className="px-3 py-1.5 rounded-md border border-slate-600 text-slate-100 text-[0.7rem] hover:border-amber-300">Company Sheets</NavLink>
              </div>
            </div>

           
          </div>
        </section>
      </main>
    </div>
  );
}
