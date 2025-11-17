import React, { useState } from 'react';

export default function FileUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);

  const downloadTemplate = () => {
    const headers = ['name', 'rollNumber', 'leetcodeUsername', 'year'];
    const sample = [
      ['John Doe', '22CS1001', 'johndoe', '2'],
      ['Jane Smith', '22CS1002', 'janesmith', '2'],
    ];
    const csv = [headers.join(','), ...sample.map((r) => r.map((c) => `"${String(c).replaceAll('"', '""')}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setBusy(true);
    try {
      await onUpload(file);
      setFile(null);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={submit}>
      <div className="grid gap-2">
        <label htmlFor="studentFile" className="text-sm opacity-90">Upload student list (CSV/XLSX)</label>
        <input
          id="studentFile"
          name="file"
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          aria-describedby="studentFileHelp"
          className="block w-full text-sm file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-slate-900/70 file:text-slate-100 file:hover:bg-slate-900/90 file:cursor-pointer bg-slate-900/50 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
        />
      </div>
      <div className="text-xs text-text/80" id="studentFileHelp">
        Include columns: <span className="font-semibold">name</span>, <span className="font-semibold">rollNumber</span>, <span className="font-semibold">leetcodeUsername</span>, <span className="font-semibold">year</span> (2/3/4).
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={downloadTemplate} className="px-3 py-2 rounded-md border border-slate-700 bg-slate-900/60 hover:bg-slate-900/80">
          Download CSV Template
        </button>
        <button type="submit" disabled={!file || busy} className="px-3 py-2 rounded-md border border-transparent text-cyan-300 bg-cyan-600/20 hover:bg-cyan-600/30 disabled:opacity-60 disabled:cursor-not-allowed">
          {busy ? 'Uploading...' : 'Upload Students'}
        </button>
      </div>
      <div className="mt-3 space-y-1 text-xs text-slate-300">
        <p>If your ID is not present in the leaderboard, you can submit your details using the form below:</p>
        <a
          href="https://forms.visme.co/formsPlayer/op6r4gn1-application-form"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center px-3 py-1.5 rounded-md bg-cyan-600 text-white hover:bg-cyan-500 transition-colors text-[0.7rem] font-medium"
        >
          Add your ID via form
        </a>
      </div>
    </form>
  );
}
